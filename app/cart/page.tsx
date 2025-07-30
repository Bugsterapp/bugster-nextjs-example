import { OrderSummary } from '@/app/cart/order-summary';
import { Main } from '@/components/main';
import { ShoppingCart } from '@/components/shopping-cart/shopping-cart';
import { getCart } from '@/lib/actions';
import { Suspense } from 'react';

async function CartPageContent() {
  const { items } = await getCart();
  
  // Calculate total to determine free delivery eligibility
  const subtotal = items.reduce((total, item) => {
    // Handle different product types with their respective prices
    const productPrices: Record<string, number> = {
      'shirt': 20.00,
      'sticker-circle': 12.99,
      'sticker-star': 15.99,
      'sticker-emoji': 10.99,
      'sticker-nature': 14.99,
      'sticker-geometric': 13.99,
      'sticker-holographic': 18.99,
    };
    
    const price = productPrices[item.id] || 20.00; // Default to shirt price
    return total + (price * item.quantity);
  }, 0);
  
  // Dynamic logic for banners and free delivery
  const showSummerBanner = new Date().getMonth() >= 5 && new Date().getMonth() <= 7; // June-August
  const freeDelivery = subtotal >= 50; // Free delivery for orders over $50
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <Main>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* Cart Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            {itemCount > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            )}
          </div>

          {/* Free Delivery Banner */}
          {!freeDelivery && subtotal > 0 && (
            <div className="mb-8 rounded-lg bg-blue-50 p-4 border border-blue-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">
                    Add ${(50 - subtotal).toFixed(2)} more to qualify for free delivery!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Cart Grid */}
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <ShoppingCart />
            <OrderSummary
              showSummerBanner={showSummerBanner}
              freeDelivery={freeDelivery}
              subtotal={subtotal}
              itemCount={itemCount}
            />
          </div>
        </div>
      </div>
    </Main>
  );
}

function CartPageFallback() {
  return (
    <Main>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-8"></div>
            <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <div className="lg:col-span-7">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="lg:col-span-5">
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartPageFallback />}>
      <CartPageContent />
    </Suspense>
  );
} 