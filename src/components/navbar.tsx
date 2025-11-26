'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars2Icon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useCart } from '@/contexts/cart-context'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'
import { NavbarAuth } from './navbar-auth'

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/company', label: 'About' },
]

function CartIcon() {
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <PlusGridItem className="relative flex">
      <Link
        href="/cart"
        className="relative flex items-center gap-2 px-4 py-3 text-base font-medium text-white bg-blend-multiply data-hover:bg-white/10"
        aria-label="Shopping cart"
      >
        Cart
        {itemCount > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Link>
    </PlusGridItem>
  )
}

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-white bg-blend-multiply data-hover:bg-white/10"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
      <NavbarAuth />
      <CartIcon />
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-white/10 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6 text-white" />
    </DisclosureButton>
  )
}

function MobileNav() {
  const { getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium text-white">
              {label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.15,
            ease: 'easeInOut',
            rotateX: { duration: 0.3, delay: links.length * 0.1 },
          }}
        >
          <div className="flex flex-col gap-4">
            <NavbarAuth />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotateX: -90 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.15,
            ease: 'easeInOut',
            rotateX: { duration: 0.3, delay: (links.length + 1) * 0.1 },
          }}
        >
          <Link
            href="/cart"
            className="flex items-center gap-2 text-base font-medium text-white"
          >
            Cart
            {itemCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>
        </motion.div>
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-white/20" />
        <div className="absolute inset-x-0 top-2 border-t border-white/20" />
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <Logo className="h-9" />
              </Link>
            </PlusGridItem>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  )
}
