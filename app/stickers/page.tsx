import { Main } from '@/components/main';
import { StickerProductCard } from '@/components/stickers/sticker-product-card';

const stickerProducts = [
  {
    id: 'sticker-circle',
    name: 'Circle Sticker Pack',
    price: 12.99,
    image: '/images/stickers/circle-sticker.png',
    description: 'A pack of colorful circular stickers perfect for decoration',
    colors: ['Red', 'Blue', 'Green', 'Yellow']
  },
  {
    id: 'sticker-star',
    name: 'Star Sticker Collection',
    price: 15.99,
    image: '/images/stickers/star-sticker.png',
    description: 'Shiny star stickers that glow in the dark',
    colors: ['Gold', 'Silver', 'Blue', 'Purple']
  },
  {
    id: 'sticker-emoji',
    name: 'Emoji Sticker Set',
    price: 10.99,
    image: '/images/stickers/emoji-sticker.png',
    description: 'Express yourself with these fun emoji stickers',
    colors: ['Multi-color']
  },
  {
    id: 'sticker-nature',
    name: 'Nature Sticker Pack',
    price: 14.99,
    image: '/images/stickers/nature-sticker.png',
    description: 'Beautiful nature-themed stickers with plants and animals',
    colors: ['Green', 'Brown', 'Multi-color']
  },
  {
    id: 'sticker-geometric',
    name: 'Geometric Sticker Set',
    price: 13.99,
    image: '/images/stickers/geometric-sticker.png',
    description: 'Modern geometric patterns for a contemporary look',
    colors: ['Black', 'White', 'Gold', 'Silver']
  },
  {
    id: 'sticker-holographic',
    name: 'Holographic Sticker Pack',
    price: 18.99,
    image: '/images/stickers/holographic-sticker.png',
    description: 'Shimmering holographic stickers that change colors',
    colors: ['Rainbow', 'Silver', 'Gold']
  }
];

export default function StickersPage() {
  return (
    <Main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Stickers Collection
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Discover our amazing collection of high-quality stickers
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stickerProducts.map((product) => (
              <StickerProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
} 