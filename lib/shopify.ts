/**
 * Shopify Storefront API client
 *
 * Environment variables required (add to Vercel):
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN  — e.g. tilwen.myshopify.com
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN — public storefront access token
 *
 * To get the storefront token:
 *   Shopify Admin → Apps → Develop apps → Create app →
 *   Configure Storefront API scopes (unauthenticated_read_product_listings,
 *   unauthenticated_write_checkouts, unauthenticated_read_checkouts) →
 *   Install app → copy Storefront API access token
 */

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ''
const TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || ''
const API_VERSION = '2024-04'
const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`

// ── Core fetch ───────────────────────────────────────────────────────────────

async function shopifyFetch<T = unknown>({
  query,
  variables,
  revalidate,
}: {
  query: string
  variables?: Record<string, unknown>
  revalidate?: number
}): Promise<{ data: T; errors?: { message: string }[] }> {
  if (!DOMAIN || !TOKEN) {
    throw new Error('Shopify env vars not set: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN required')
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Server-side product reads use ISR; cart mutations (client-side) pass nothing
    ...(typeof revalidate === 'number' ? { next: { revalidate } } : {}),
  })

  if (!res.ok) throw new Error(`Shopify API error: ${res.status} ${res.statusText}`)
  return res.json()
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: { amount: string; currencyCode: string }
    totalAmount: { amount: string; currencyCode: string }
  }
  lines: {
    edges: {
      node: CartLine
    }[]
  }
}

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      id: string
      title: string
      handle: string
      images: { edges: { node: { url: string; altText: string | null } }[] }
    }
  }
  cost: {
    totalAmount: { amount: string; currencyCode: string }
  }
}

// ── Fragments ────────────────────────────────────────────────────────────────

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                title
                handle
                images(first: 1) {
                  edges { node { url altText } }
                }
              }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
    }
  }
`

// ── Cart operations ──────────────────────────────────────────────────────────

export async function createCart(): Promise<ShopifyCart> {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `
  const { data } = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart }
  }>({ query })
  return data.cartCreate.cart
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `
  const { data } = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart }
  }>({ query, variables: { cartId, lines } })
  return data.cartLinesAdd.cart
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
    ${CART_FRAGMENT}
  `
  const { data } = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart }
  }>({ query, variables: { cartId, lineIds } })
  return data.cartLinesRemove.cart
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
    ${CART_FRAGMENT}
  `
  const { data } = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query,
    variables: { cartId },
  })
  return data.cart
}

// ── Product availability check ───────────────────────────────────────────────
// Used to verify availability before showing "Inquire" vs "Add to Cart"

export async function getProductAvailability(productId: string): Promise<{
  available: boolean
  variantId: string | null
}> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        availableForSale
        variants(first: 1) {
          edges {
            node { id availableForSale }
          }
        }
      }
    }
  `
  const { data } = await shopifyFetch<{
    product: {
      availableForSale: boolean
      variants: { edges: { node: { id: string; availableForSale: boolean } }[] }
    } | null
  }>({ query, variables: { id: productId } })

  if (!data.product) return { available: false, variantId: null }
  const variant = data.product.variants.edges[0]?.node
  return {
    available: variant?.availableForSale ?? false,
    variantId: variant?.id ?? null,
  }
}

// ── Format price ─────────────────────────────────────────────────────────────

export function formatPrice(amount: string, currencyCode: string): string {
  const num = parseFloat(amount)
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

// ── Product fetching (gallery) ───────────────────────────────────────────────
// Pulls the full published catalogue from the Headless channel.
// Revalidated every 10 minutes via ISR — sold pieces update without a redeploy.

export const PRODUCT_REVALIDATE_SECONDS = 600

export interface ShopifyProductImage {
  url: string
  altText: string | null
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  tags: string[]
  availableForSale: boolean
  images: ShopifyProductImage[]
  variantId: string | null
  variantAvailable: boolean
  sku: string | null
  price: number
  currencyCode: string
  /** how.* metafields, keyed without the namespace, e.g. given_name */
  metafields: Record<string, string>
}

const HOW_METAFIELD_KEYS = [
  'given_name',
  'cultural_name',
  'region',
  'technique',
  'pile_height',
  'condition',
  'condition_notes',
  'dye_type',
  'age_period',
  'symbolic_reading',
  'spatial_atmosphere',
  'selection_voice',
  'provenance_note',
] as const

const METAFIELD_IDENTIFIERS = HOW_METAFIELD_KEYS
  .map(k => `{namespace: "how", key: "${k}"}`)
  .join(', ')

interface RawProductNode {
  id: string
  handle: string
  title: string
  descriptionHtml: string
  tags: string[]
  availableForSale: boolean
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: {
    edges: {
      node: {
        id: string
        sku: string | null
        availableForSale: boolean
        price: { amount: string; currencyCode: string }
      }
    }[]
  }
  metafields: ({ key: string; value: string } | null)[]
}

function normaliseProduct(node: RawProductNode): ShopifyProduct {
  const variant = node.variants.edges[0]?.node
  const metafields: Record<string, string> = {}
  for (const mf of node.metafields) {
    if (mf && mf.value && mf.value.trim()) metafields[mf.key] = mf.value.trim()
  }
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    descriptionHtml: node.descriptionHtml || '',
    tags: node.tags || [],
    availableForSale: node.availableForSale,
    images: node.images.edges.map(e => e.node),
    variantId: variant?.id ?? null,
    variantAvailable: variant?.availableForSale ?? false,
    sku: variant?.sku ?? null,
    price: variant ? Math.round(parseFloat(variant.price.amount)) : 0,
    currencyCode: variant?.price.currencyCode ?? 'EUR',
    metafields,
  }
}

export async function fetchAllShopifyProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query products($cursor: String) {
      products(first: 100, after: $cursor, sortKey: CREATED_AT, reverse: true) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id
            handle
            title
            descriptionHtml
            tags
            availableForSale
            images(first: 10) { edges { node { url altText } } }
            variants(first: 1) {
              edges { node { id sku availableForSale price { amount currencyCode } } }
            }
            metafields(identifiers: [${METAFIELD_IDENTIFIERS}]) { key value }
          }
        }
      }
    }
  `

  const products: ShopifyProduct[] = []
  let cursor: string | null = null

  interface ProductsPage {
    products: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
      edges: { node: RawProductNode }[]
    }
  }

  // Catalogue is small; cap pagination defensively at 10 pages (1,000 products)
  for (let page = 0; page < 10; page++) {
    const result: { data: ProductsPage; errors?: { message: string }[] } =
      await shopifyFetch<ProductsPage>({
        query,
        variables: { cursor },
        revalidate: PRODUCT_REVALIDATE_SECONDS,
      })
    const { data, errors } = result

    if (errors?.length) throw new Error(`Shopify products query: ${errors[0].message}`)

    for (const edge of data.products.edges) products.push(normaliseProduct(edge.node))
    if (!data.products.pageInfo.hasNextPage) break
    cursor = data.products.pageInfo.endCursor
  }

  return products
}
