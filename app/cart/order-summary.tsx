import { OrderSummarySection } from '@/components/shopping-cart/order-summary-section';
import { ProceedToCheckout } from './proceed-to-checkout';
import { PromoCodeSection } from '@/components/shopping-cart/promo-code-section';
import { ShippingOptionsSection } from '@/components/shopping-cart/shipping-options-section';

export function OrderSummary({
  showSummerBanner,
  freeDelivery,
  subtotal,
  itemCount,
}: {
  showSummerBanner: boolean;
  freeDelivery: boolean;
  subtotal: number;
  itemCount: number;
}) {
  // Dynamic color based on cart value
  const proceedToCheckoutColor = subtotal >= 100 ? 'green' : 'blue';
  
  // Calculate estimated delivery date
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (freeDelivery ? 3 : 5));
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="mt-16 rounded-lg bg-gray-50 px-6 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
        {itemCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {/* Estimated Delivery */}
      {itemCount > 0 && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 border border-green-200">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Estimated delivery: {formattedDeliveryDate}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Promo Code Section */}
      <div className="mt-6">
        <PromoCodeSection subtotal={subtotal} />
      </div>

      {/* Shipping Options */}
      <div className="mt-6">
        <ShippingOptionsSection freeDelivery={freeDelivery} />
      </div>

      {/* Proceed to Checkout Button */}
      <div className="mt-6">
        <ProceedToCheckout color={proceedToCheckoutColor} />
      </div>

      {/* Order Summary Details */}
      <OrderSummarySection
        showSummerBanner={showSummerBanner}
        freeDelivery={freeDelivery}
        subtotal={subtotal}
        itemCount={itemCount}
      />
    </section>
  );
} 