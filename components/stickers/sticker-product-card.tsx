'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { track } from '@vercel/analytics';
import { addToCart } from '@/lib/actions';
import { toast } from 'sonner';
import Image from 'next/image';

interface StickerProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
}

interface StickerProductCardProps {
  product: StickerProduct;
}

export function StickerProductCard({ product }: StickerProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsLoading(true);
    track('add_to_cart:clicked', { product_id: product.id });
    
    try {
      await addToCart({ 
        id: product.id, 
        color: selectedColor, 
        size: 'One Size', 
        quantity: 1 
      });
      
      toast.success('Added to cart!', {
        description: `${product.name} has been added to your cart.`,
      });
      
      // Optionally redirect to cart
      // router.push('/cart');
    } catch (error) {
      toast.error('Failed to add to cart', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        {/* Placeholder colored rectangle since we don't have actual sticker images */}
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-2xl font-bold mb-2">🎨</div>
            <div className="text-sm font-medium">{product.name}</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-lg font-bold text-gray-900">${product.price}</p>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        
        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedColor === color
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
            isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
} 