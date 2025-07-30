'use client';

import { useState } from 'react';
import { toast } from 'sonner';

interface PromoCodeSectionProps {
  subtotal: number;
}

const validPromoCodes = {
  'SAVE10': { discount: 0.10, description: '10% off' },
  'WELCOME20': { discount: 0.20, description: '20% off for new customers' },
  'FREESHIP': { discount: 0, description: 'Free shipping', freeShipping: true },
  'SUMMER25': { discount: 0.25, description: '25% off summer sale' },
};

export function PromoCodeSection({ subtotal }: PromoCodeSectionProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const code = promoCode.trim().toUpperCase();
    
    if (validPromoCodes[code as keyof typeof validPromoCodes]) {
      setAppliedCode(code);
      setPromoCode('');
      toast.success(`Promo code applied: ${validPromoCodes[code as keyof typeof validPromoCodes].description}`);
    } else {
      toast.error('Invalid promo code');
    }
    
    setIsLoading(false);
  };

  const handleRemovePromoCode = () => {
    setAppliedCode(null);
    toast.success('Promo code removed');
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Promo Code</h3>
      
      {appliedCode ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                {appliedCode}: {validPromoCodes[appliedCode as keyof typeof validPromoCodes].description}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemovePromoCode}
            className="text-sm text-green-600 hover:text-green-500 font-medium"
          >
            Remove
          </button>
        </div>
      ) : (
        <form onSubmit={handleApplyPromoCode} className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Applying...' : 'Apply'}
          </button>
        </form>
      )}
      
      {/* Promo suggestions */}
      {!appliedCode && (
        <div className="mt-3">
          <p className="text-xs text-gray-500">
            Try: SAVE10, WELCOME20, FREESHIP, SUMMER25
          </p>
        </div>
      )}
    </div>
  );
} 