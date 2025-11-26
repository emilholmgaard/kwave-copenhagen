'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Link } from './link'
import { PlusGridItem } from './plus-grid'
import { SignOut } from '@/utils/auth-helpers/server'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export function NavbarAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const formData = new FormData()
    formData.append('pathName', window.location.pathname)
    await SignOut(formData)
    router.push('/login')
    router.refresh()
  }

  if (loading) {
    return (
      <PlusGridItem className="relative flex">
        <Link
          href="/login"
          className="flex items-center px-4 py-3 text-base font-medium text-white bg-blend-multiply data-hover:bg-white/10"
        >
          Login
        </Link>
      </PlusGridItem>
    )
  }

  if (user) {
    return (
      <>
        <PlusGridItem className="relative flex">
          <Link
            href="/account"
            className="flex items-center px-4 py-3 text-base font-medium text-white bg-blend-multiply data-hover:bg-white/10"
          >
            Account
          </Link>
        </PlusGridItem>
        <PlusGridItem className="relative flex">
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-3 text-base font-medium text-white bg-blend-multiply hover:bg-white/10"
          >
            Logout
          </button>
        </PlusGridItem>
      </>
    )
  }

  return (
    <PlusGridItem className="relative flex">
      <Link
        href="/login"
        className="flex items-center px-4 py-3 text-base font-medium text-white bg-blend-multiply data-hover:bg-white/10"
      >
        Login
      </Link>
    </PlusGridItem>
  )
}

