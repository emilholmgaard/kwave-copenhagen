'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Link } from '@/components/link'
import { Mark } from '@/components/logo'
import { Checkbox, Field, Input, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import { signInWithPassword } from '@/utils/auth-helpers/server'
import { signUp } from '@/utils/auth-helpers/server'
import { handleRequest } from '@/utils/auth-helpers/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSignUp, setIsSignUp] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Check for error/success messages from URL params
  useEffect(() => {
    const errorParam = searchParams.get('error')
    const errorDesc = searchParams.get('error_description')
    const statusParam = searchParams.get('status')
    const statusDesc = searchParams.get('status_description')

    if (errorParam) {
      setError(errorDesc || errorParam)
      setIsSubmitting(false)
    }
    if (statusParam) {
      setSuccess(statusDesc || statusParam)
      setIsSubmitting(false)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      if (isSignUp) {
        await handleRequest(e, signUp, router)
      } else {
        await handleRequest(e, signInWithPassword, router)
      }
      // Don't set isSubmitting to false here - let the redirect happen
      // If there's an error, it will be in URL params and useEffect will handle it
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-16">
          <div className="w-full max-w-md rounded-xl bg-white/5 backdrop-blur-sm shadow-md ring-1 ring-white/10">
            <form onSubmit={handleSubmit} className="p-7 sm:p-11">
              <div className="flex items-start">
                <Link href="/" title="Home">
                  <Mark className="h-9 fill-white" />
                </Link>
              </div>
              <h1 className="mt-8 text-base/6 font-medium text-white">
                {isSignUp ? 'Create an account' : 'Welcome back!'}
              </h1>
              <p className="mt-1 text-sm/5 text-gray-300">
                {isSignUp
                  ? 'Sign up to get started.'
                  : 'Sign in to your account to continue.'}
              </p>

              {error && (
                <div className="mt-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 text-sm text-red-200">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-6 rounded-lg bg-green-500/20 border border-green-500/50 p-4 text-sm text-green-200">
                  {success}
                </div>
              )}

              <Field className="mt-8 space-y-3">
                <Label className="text-sm/5 font-medium text-white">Email</Label>
                <Input
                  required
                  autoFocus
                  type="email"
                  name="email"
                  autoComplete="email"
                  className={clsx(
                    'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-white/20 bg-white/5',
                    'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6 text-white',
                    'placeholder:text-gray-400',
                    'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-white data-focus:ring-white/40',
                  )}
                />
              </Field>
              <Field className="mt-8 space-y-3">
                <Label className="text-sm/5 font-medium text-white">Password</Label>
                <Input
                  required
                  type="password"
                  name="password"
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  minLength={6}
                  className={clsx(
                    'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-white/20 bg-white/5',
                    'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6 text-white',
                    'placeholder:text-gray-400',
                    'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-white data-focus:ring-white/40',
                  )}
                />
                {isSignUp && (
                  <p className="mt-1 text-xs text-gray-400">
                    Password must be at least 6 characters
                  </p>
                )}
              </Field>
              {!isSignUp && (
                <div className="mt-8 flex items-center justify-between text-sm/5">
                  <Field className="flex items-center gap-3">
                    <Checkbox
                      name="remember-me"
                      className={clsx(
                        'group block size-4 rounded-sm border border-transparent shadow-sm ring-1 ring-white/20',
                        'data-checked:bg-white data-checked:ring-white',
                        'data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white',
                      )}
                    >
                      <CheckIcon className="fill-black opacity-0 group-data-checked:opacity-100" />
                    </Checkbox>
                    <Label className="text-white">Remember me</Label>
                  </Field>
                  <Link href="#" className="font-medium text-gray-300 hover:text-white">
                    Forgot password?
                  </Link>
                </div>
              )}
              <div className="mt-8">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Loading...'
                    : isSignUp
                      ? 'Sign up'
                      : 'Sign in'}
                </Button>
              </div>
            </form>
            <div className="m-1.5 rounded-lg bg-white/5 py-4 text-center text-sm/5 ring-1 ring-white/10">
              {isSignUp ? (
                <>
                  <span className="text-gray-300">Already have an account?{' '}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false)
                      setError(null)
                      setSuccess(null)
                    }}
                    className="font-medium text-white hover:text-gray-300"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-300">Not a member?{' '}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true)
                      setError(null)
                      setSuccess(null)
                    }}
                    className="font-medium text-white hover:text-gray-300"
                  >
                    Create an account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  )
}
