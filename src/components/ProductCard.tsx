import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
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
      price: product.price,
      license: 'full',
      thumbnail: product.thumbnail,
    });
    toast.success('Added to cart!');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#121212] to-[#0D0D0D] transition-all hover:-translate-y-2 hover:border-[#5B46F7]/40 hover:shadow-2xl hover:shadow-[#5B46F7]/20"
    >
      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-r from-[#5B46F7] to-[#00C2FF] px-3 py-1.5 text-xs font-semibold shadow-lg">
          <Sparkles className="h-3 w-3" />
          Featured
        </div>
      )}

      {/* Thumbnail with Overlay Gradient */}
      <div className="relative aspect-video overflow-hidden">
        <ImageWithFallback
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
        
        {/* Rating Badge - Top Right */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{product.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {/* Category & Bestseller Tags */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="rounded-full border-0 bg-[#5B46F7]/15 px-2.5 py-0.5 text-xs font-medium text-[#5B46F7] hover:bg-[#5B46F7]/20">
            {product.category}
          </Badge>
          {product.isBestseller && (
            <Badge variant="secondary" className="rounded-full border-0 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20">
              <TrendingUp className="mr-1 h-3 w-3" />
              Bestseller
            </Badge>
          )}
        </div>

        {/* Product Name */}
        <h3 className="mb-2 line-clamp-1 text-base font-semibold transition-colors group-hover:text-[#5B46F7] sm:text-lg">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mb-4 line-clamp-2 text-xs text-white/60 sm:text-sm">
          {product.shortDesc}
        </p>

        {/* Reviews Count */}
        <div className="mb-4 flex items-center gap-2 text-xs text-white/50">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-white/10 text-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="font-medium">({product.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Price & CTA Section */}
        <div className="flex items-center justify-between gap-3 border-t border-white/5 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-white/40">Price</span>
            <span className="bg-gradient-to-r from-[#5B46F7] to-[#00C2FF] bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              {formatCurrencySimple(product.price)}
            </span>
          </div>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="group/btn relative overflow-hidden bg-gradient-to-r from-[#5B46F7] to-[#4a38d9] px-3 py-2 text-xs font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#5B46F7]/50 sm:px-4 sm:text-sm"
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:scale-110 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </Link>
  );
}
