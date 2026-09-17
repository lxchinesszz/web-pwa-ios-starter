import type { ReactNode, SVGProps } from 'react'

/**
 * Konsta does not expose a React icon set (`konsta/react/icons` is not an
 * exported subpath), so the template ships its own minimal SF-style glyphs.
 */
type IconProps = SVGProps<SVGSVGElement>

function Glyph({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3.5 11.2 12 4.2l8.5 7" />
      <path d="M5.8 9.9v9.9h12.4V9.9" />
    </Glyph>
  )
}

export function FormIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 8h16M4 16h16" />
      <circle cx="9" cy="8" r="2.1" />
      <circle cx="15" cy="16" r="2.1" />
    </Glyph>
  )
}

export function ListIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      <path d="M4.2 6.5h.01M4.2 12h.01M4.2 17.5h.01" />
    </Glyph>
  )
}

export function CompassIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.4 8.6l-1.9 4.9-4.9 1.9 1.9-4.9z" />
    </Glyph>
  )
}

export function GridIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="3.8" y="3.8" width="7" height="7" rx="1.8" />
      <rect x="13.2" y="3.8" width="7" height="7" rx="1.8" />
      <rect x="3.8" y="13.2" width="7" height="7" rx="1.8" />
      <rect x="13.2" y="13.2" width="7" height="7" rx="1.8" />
    </Glyph>
  )
}

export function ChartIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 20V11M10 20V5M16 20v-6M22 20H2" />
    </Glyph>
  )
}

export function ChatIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M20.5 11.8a8 8 0 0 1-8 8H8l-4.5 3v-4.4a8 8 0 0 1-2-5.3 8 8 0 0 1 8-8h3a8 8 0 0 1 8 8Z" />
    </Glyph>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 3.5 3.8 8 12 12.5 20.2 8z" />
      <path d="M3.8 12.6 12 17.1l8.2-4.5" />
      <path d="M3.8 16.9 12 21.4l8.2-4.5" />
    </Glyph>
  )
}

export function SparkleIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M12 3.2c.5 4.4 3.9 7.8 8.3 8.3-4.4.5-7.8 3.9-8.3 8.3-.5-4.4-3.9-7.8-8.3-8.3 4.4-.5 7.8-3.9 8.3-8.3Z" />
    </Glyph>
  )
}
