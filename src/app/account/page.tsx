import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  getUserDetails,
  getSubscription,
  getUser,
  getOrders
} from '@/utils/supabase/queries';
import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { GradientBackground } from '@/components/gradient';
import { Navbar } from '@/components/navbar';
import { Heading, Lead } from '@/components/text';
import { Link } from '@/components/link';
import type { Tables } from '@/types_db';

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatPrice(amount: number, currency: string = 'DKK') {
  return new Intl.NumberFormat('da-DK', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export default async function Account() {
  const supabase = await createClient();
  const [user, userDetails, subscription, orders] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase),
    getOrders(supabase)
  ]);

  if (!user) {
    return redirect('/login');
  }

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <div className="mt-16 pb-24">
          <Heading as="h1" className="mt-2">
            Account
          </Heading>
          <Lead className="mt-6 max-w-3xl">
            Manage your account settings and view your order history.
          </Lead>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Account Info */}
            <div className="rounded-xl bg-white/5 p-8 ring-1 ring-white/10">
              <h2 className="text-lg font-semibold text-white mb-6">Account Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Email</h3>
                  <p className="mt-2 text-lg text-white">{user.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Full Name</h3>
                  <p className="mt-2 text-lg text-white">
                    {userDetails?.full_name || 'Not set'}
                  </p>
                </div>
                
                {subscription && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Subscription</h3>
                    <p className="mt-2 text-lg text-white">
                      {(() => {
                        type SubscriptionWithRelations = Tables<'subscriptions'> & {
                          prices?: Array<{
                            products?: { name: string | null } | null;
                          } | null> | null;
                        };
                        const sub = subscription as SubscriptionWithRelations;
                        const price = Array.isArray(sub.prices) && sub.prices.length > 0 
                          ? sub.prices[0] 
                          : null;
                        return price?.products?.name || 'Active';
                      })()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order History */}
            <div className="rounded-xl bg-white/5 p-8 ring-1 ring-white/10">
              <h2 className="text-lg font-semibold text-white mb-6">Order History</h2>
              {orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order: Tables<'orders'>) => (
                    <div
                      key={order.id}
                      className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-white">
                              Order #{order.order_number}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' 
                                ? 'bg-green-500/20 text-green-300'
                                : order.status === 'shipped'
                                ? 'bg-blue-500/20 text-blue-300'
                                : order.status === 'processing'
                                ? 'bg-yellow-500/20 text-yellow-300'
                                : 'bg-gray-500/20 text-gray-300'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            {formatDate(order.created_at)}
                          </p>
                          {order.items && Array.isArray(order.items) && (
                            <p className="text-sm text-gray-400 mt-1">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">
                            {formatPrice(order.total_amount, order.currency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No orders yet</p>
                  <Link
                    href="/shop"
                    className="mt-4 inline-block text-white hover:text-gray-300 underline"
                  >
                    Start shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
