interface KuberaIconProps {
  size?: number
}

// Simple stylised "Kubera pot" icon used as the kuberanpay mark across the app.
export function KuberaIcon({ size = 32 }: KuberaIconProps) {
  const dim = `${size}`
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="drop-shadow-[0_0_18px_rgba(129,140,248,0.7)]"
    >
      <defs>
        <linearGradient id="kubera-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="45%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#kubera-gradient)" strokeWidth="1.4" strokeLinecap="round">
        {/* Pot */}
        <path
          d="M8 13c0-3 3-5 8-5s8 2 8 5c0 4-2.5 9-8 9s-8-5-8-9Z"
          fill="url(#kubera-gradient)"
          fillOpacity="0.18"
        />
        {/* Collar */}
        <path d="M10 13h12" />
        {/* Simple wealth glyph (₹‑like) */}
        <path d="M16 10.5v7" />
        <path d="M13.5 12h4.5" />
        <path d="M13.5 13.8h4" />
        <path d="M14 17.5c.6.4 1.2.6 2 .6 1 0 1.8-.3 2.4-.7" />
      </g>
    </svg>
  )
}


