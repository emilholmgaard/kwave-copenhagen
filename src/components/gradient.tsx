import { clsx } from 'clsx'
import type { ImageColors } from '@/hooks/use-image-colors'

export function Gradient({
  className,
  colors,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & { colors?: ImageColors | null }) {
  const defaultColors = {
    primary: '#fff1be',
    secondary: '#ee87cb',
    tertiary: '#b060ff',
  }
  
  const finalColors = colors || defaultColors
  
  return (
    <div
      {...props}
      className={clsx(className)}
      style={{
        background: `linear-gradient(115deg, ${finalColors.primary} 28%, ${finalColors.secondary} 70%, ${finalColors.tertiary})`,
      }}
    />
  )
}

export function GradientBackground({ colors }: { colors?: ImageColors | null }) {
  const defaultColors = {
    primary: '#fff1be',
    secondary: '#ee87cb',
    tertiary: '#b060ff',
  }
  
  const finalColors = colors || defaultColors
  
  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        className={clsx(
          'absolute -top-44 -right-60 h-60 w-xl transform-gpu md:right-0',
          'rotate-[-10deg] rounded-full blur-3xl transition-all duration-1000',
          'z-0',
        )}
        style={{
          background: `linear-gradient(115deg, ${finalColors.primary} 28%, ${finalColors.secondary} 70%, ${finalColors.tertiary})`,
        }}
      />
    </div>
  )
}
