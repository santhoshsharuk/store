import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner@2.0.3';
import { Product } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { formatCurrencySimple } from '../utils/currency';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.license.personal,
      license: 'personal',
      thumbnail: product.thumbnail,
    });
    toast.success('Added to cart!');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-[#5B46F7]/20"
    >
      <div className="aspect-video overflow-hidden">
        <ImageWithFallback
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-[#5B46F7]/10 px-3 py-1 text-xs text-[#5B46F7]">
            {product.category}
          </span>
          {product.isBestseller && (
            <span className="rounded-full bg-[#00C2FF]/10 px-3 py-1 text-xs text-[#00C2FF]">
              Bestseller
            </span>
          )}
        </div>
        <h3 className="mb-2 line-clamp-1">{product.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-white/60">{product.shortDesc}</p>

        <div className="mb-4 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
          </div>
          <span className="text-sm text-white/40">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl">{formatCurrencySimple(product.license.personal)}</span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-[#5B46F7] hover:bg-[#5B46F7]/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
