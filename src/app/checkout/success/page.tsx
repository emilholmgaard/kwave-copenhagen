import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { CheckCircleIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been successfully placed.',
}

export default function CheckoutSuccessPage() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <div className="mt-16 pb-24 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircleIcon className="size-12 text-green-600" />
          </div>
          <Subheading className="mt-8">Order Confirmed!</Subheading>
          <Heading as="h1" className="mt-2">
            Thank you for your purchase
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600">
            Your order has been successfully placed. We&apos;ve sent a confirmation
            email with your order details. You&apos;ll receive a shipping
            notification once your items are on their way.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/shop">Continue Shopping</Button>
            <Button variant="outline" href="/">
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  )
}

