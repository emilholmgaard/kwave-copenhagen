import { clsx } from 'clsx'

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={clsx(className, 'px-4 sm:px-6')}>
      {children}
    </div>
  )
}
