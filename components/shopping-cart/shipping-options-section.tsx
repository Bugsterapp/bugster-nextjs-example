'use client';

import { useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedDays: number;
  icon: React.ReactNode;
}

interface ShippingOptionsSectionProps {
  freeDelivery: boolean;
}

const shippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 5.99,
    description: 'Delivered in 5-7 business days',
    estimatedDays: 7,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 12.99,
    description: 'Delivered in 2-3 business days',
    estimatedDays: 3,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    price: 24.99,
    description: 'Delivered next business day',
    estimatedDays: 1,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

export function ShippingOptionsSection({ freeDelivery }: ShippingOptionsSectionProps) {
  const [selectedOption, setSelectedOption] = useState(shippingOptions[0]);

  const getShippingPrice = (option: ShippingOption) => {
    if (freeDelivery && option.id === 'standard') {
      return 0;
    }
    return option.price;
  };

  const getEstimatedDelivery = (option: ShippingOption) => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + option.estimatedDays);
    return deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Shipping Options</h3>
      
      <RadioGroup value={selectedOption} onChange={setSelectedOption}>
        <div className="space-y-2">
          {shippingOptions.map((option) => (
            <Radio
              key={option.id}
              value={option}
              className={clsx(
                'relative flex cursor-pointer rounded-lg p-3 focus:outline-none',
                'border border-gray-200 hover:bg-gray-50',
                'data-checked:border-blue-500 data-checked:bg-blue-50'
              )}
            >
              {({ checked }) => (
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex h-5 items-center">
                      <div
                        className={clsx(
                          'h-4 w-4 rounded-full border-2 flex items-center justify-center',
                          checked 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        )}
                      >
                        {checked && (
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                    <div className="ml-3 flex items-center">
                      <div className={clsx(
                        'text-gray-400',
                        checked ? 'text-blue-600' : 'text-gray-400'
                      )}>
                        {option.icon}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">
                          {option.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {getShippingPrice(option) === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${getShippingPrice(option).toFixed(2)}`
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      by {getEstimatedDelivery(option)}
                    </p>
                  </div>
                </div>
              )}
            </Radio>
          ))}
        </div>
      </RadioGroup>
      
      {freeDelivery && (
        <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800">
            🎉 You qualify for free standard shipping!
          </p>
        </div>
      )}
    </div>
  );
} 