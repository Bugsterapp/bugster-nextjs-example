import { getCart } from '@/lib/actions';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderSummaryFallback({
  showSummerBanner,
}: {
  showSummerBanner: boolean;
}) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
      </div>
      {showSummerBanner ? (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      ) : null}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

function OrderSummaryContent({
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
  // Calculate discounts and costs
  const summerDiscount = showSummerBanner ? subtotal * (20 / 100) * -1 : 0; // 20% discount
  const shippingCost = 5.99;
  const shipping = freeDelivery ? 0 : shippingCost;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + summerDiscount + tax;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-sm font-medium text-gray-900">
          {subtotal.toFixed(2)} USD
        </p>
      </div>
      {showSummerBanner ? (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600">Summer discount</p>
          <p className="text-sm font-medium text-gray-900">
            {summerDiscount.toFixed(2)} USD
          </p>
        </div>
      ) : null}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">Shipping estimate</p>
        {freeDelivery ? (
          <p className="text-sm font-medium text-gray-900">
            <span className="line-through font-normal">
              {shippingCost.toFixed(2)} USD
            </span>{' '}
            FREE
          </p>
        ) : (
          <p className="text-sm font-medium text-gray-900">
            {shipping.toFixed(2)} USD
          </p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">Tax</p>
        <p className="text-sm font-medium text-gray-900">
          {tax.toFixed(2)} USD
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-base font-medium text-gray-900">Order total</p>
        <p className="text-base font-medium text-gray-900">
          {total.toFixed(2)} USD
        </p>
      </div>
    </div>
  );
}

export function OrderSummarySection({
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
  return (
    <div className="mt-6 space-y-4">
      <OrderSummaryContent
        showSummerBanner={showSummerBanner}
        freeDelivery={freeDelivery}
        subtotal={subtotal}
        itemCount={itemCount}
      />
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          or{' '}
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  );
}
