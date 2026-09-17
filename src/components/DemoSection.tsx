import { Card } from 'konsta/react'
import type { ReactNode } from 'react'

interface DemoSectionProps {
  /** Component names this section demonstrates, e.g. `Toggle`. */
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}

/**
 * One demo block per Konsta component family. Pages stack these so the source
 * doubles as the documentation for how each component is wired.
 */
function DemoSection({ title, description, children, footer }: DemoSectionProps) {
  return (
    <Card
      className="mb-4"
      contentWrap
      header={
        <div className="py-1">
          <p className="text-sm font-semibold">{title}</p>
          {description ? (
            <p className="mt-1 text-xs leading-5 opacity-60">{description}</p>
          ) : null}
        </div>
      }
      footer={footer}
    >
      {children}
    </Card>
  )
}

export default DemoSection
