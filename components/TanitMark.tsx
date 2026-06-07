interface Props {
  size?: number
  color?: string
  className?: string
}

export default function TanitMark({ size = 32, color = 'currentColor', className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tilwen — Tanit mark"
      role="img"
    >
      {/* Head — diamond (square rotated 45°) */}
      <polygon
        points="50,4 64,18 50,32 36,18"
        stroke={color}
        strokeWidth="3.5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Neck */}
      <line x1="50" y1="32" x2="50" y2="46" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>

      {/* Arms — horizontal bar */}
      <line x1="8" y1="46" x2="92" y2="46" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>

      {/* Arm ends — stepped up (kilim register, not curved) */}
      <line x1="8"  y1="46" x2="8"  y2="32" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="8"  y1="32" x2="20" y2="32" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="92" y1="46" x2="92" y2="32" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="80" y1="32" x2="92" y2="32" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>

      {/* Body — triangle with stepped/staircase sides */}
      {/* Left side descent */}
      <polyline
        points="50,46 36,46 36,60 22,60 22,74 14,74 14,88 8,96"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right side descent */}
      <polyline
        points="50,46 64,46 64,60 78,60 78,74 86,74 86,88 92,96"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Base */}
      <line x1="8" y1="96" x2="92" y2="96" stroke={color} strokeWidth="3.5" strokeLinecap="round"/>
    </svg>
  )
}
