'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { Heading, Subheading } from '@/components/text'
import { useCart } from '@/contexts/cart-context'
import { ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const router = useRouter()
  const { getCartAlbums, getTotalPrice, clearCart } = useCart()
  const cartAlbums = getCartAlbums()
  const total = getTotalPrice()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Denmark',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  if (cartAlbums.length === 0) {
    router.push('/cart')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push('/checkout/success')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">Checkout</Subheading>
        <Heading as="h1" className="mt-2">
          Complete your order
        </Heading>
      </Container>
      <Container className="mt-16 pb-24">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {/* Shipping Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-950">
                  Shipping Information
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    >
                      <option value="Denmark">Denmark</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Norway">Norway</option>
                      <option value="Germany">Germany</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Payment Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-950">
                  Payment Information
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '')
                        const formatted = value
                          .replace(/(.{4})/g, '$1 ')
                          .trim()
                        setFormData({ ...formData, cardNumber: formatted })
                      }}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleChange}
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '')
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4)
                          }
                          setFormData({ ...formData, expiryDate: value })
                        }}
                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        required
                        placeholder="123"
                        maxLength={4}
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setFormData({ ...formData, cvv: value })
                        }}
                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm ring-1 ring-black/10 focus:border-gray-950 focus:ring-gray-950"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-gray-950">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4">
                {cartAlbums.map(({ album, quantity }) => (
                  <div
                    key={album.id}
                    className="flex items-center gap-4 border-b border-gray-200 pb-4"
                  >
                    <img
                      alt={album.title}
                      src={album.image}
                      className="size-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-950">
                        {album.title}
                      </p>
                      <p className="text-xs text-gray-600">{album.artist}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-950">
                      {album.price * quantity} {album.currency}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{total} DKK</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-950">
                  <span>Total</span>
                  <span>{total} DKK</span>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  data-disabled={isProcessing ? true : undefined}
                  className="w-full gap-2"
                >
                  <CreditCardIcon className="size-4" />
                  {isProcessing ? 'Processing...' : 'Complete Order'}
                </Button>
              </div>
              <div className="mt-4">
                <Link
                  href="/cart"
                  className="flex items-center justify-center gap-2 text-sm text-gray-600 data-hover:text-gray-950"
                >
                  <ChevronLeftIcon className="size-4" />
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Container>
      <Footer />
    </main>
  )
}

