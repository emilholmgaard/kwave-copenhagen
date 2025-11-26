import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-gray-950 shadow-md',
    'text-base font-medium whitespace-nowrap text-white',
    'data-disabled:bg-gray-950 data-disabled:opacity-40',
    'transition-all duration-200 data-hover:bg-gray-800 data-hover:scale-105',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-white shadow-md ring-1 ring-[#D15052]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'text-base font-medium whitespace-nowrap text-gray-950',
    'data-disabled:bg-white/50 data-disabled:opacity-40',
    'transition-all duration-200 data-hover:bg-white/90 data-hover:scale-105',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)]',
    'rounded-full border border-transparent shadow-sm ring-1 ring-white/20',
    'text-sm font-medium whitespace-nowrap text-white',
    'data-disabled:bg-transparent data-disabled:opacity-40',
    'transition-all duration-200 data-hover:bg-white/10',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
