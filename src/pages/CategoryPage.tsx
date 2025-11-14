import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { products } from '../data/products';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (categoryName && categoryName !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryName);
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Filter by price range
    if (priceRange.length > 0) {
      filtered = filtered.filter((p) => {
        const price = p.license.personal;
        return priceRange.some((range) => {
          if (range === 'under30') return price < 30;
          if (range === '30-50') return price >= 30 && price <= 50;
          if (range === '50-100') return price > 50 && price <= 100;
          if (range === 'over100') return price > 100;
          return false;
        });
      });
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    // Sort
    if (sortBy === 'newest') {
      // Already in order
    } else if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.license.personal - b.license.personal);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.license.personal - a.license.personal);
    }

    return filtered;
  }, [categoryName, selectedCategories, priceRange, minRating, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const togglePriceRange = (range: string) => {
    setPriceRange((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([]);
    setMinRating(0);
  };

  const FilterSection = () => (
    <div className="space-y-8">
      {/* Categories */}
      {(!categoryName || categoryName === 'all') && (
        <div>
          <h3 className="mb-4">Category</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={`cat-${category}`} className="cursor-pointer text-sm text-white/70">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="mb-4">Price</h3>
        <div className="space-y-3">
          {[
            { label: 'Under $30', value: 'under30' },
            { label: '$30 - $50', value: '30-50' },
            { label: '$50 - $100', value: '50-100' },
            { label: 'Over $100', value: 'over100' },
          ].map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${range.value}`}
                checked={priceRange.includes(range.value)}
                onCheckedChange={() => togglePriceRange(range.value)}
              />
              <Label htmlFor={`price-${range.value}`} className="cursor-pointer text-sm text-white/70">
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-4">Minimum Rating</h3>
        <div className="space-y-3">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="cursor-pointer text-sm text-white/70">
                {rating}+ stars
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategories.length > 0 || priceRange.length > 0 || minRating > 0) && (
        <Button onClick={clearFilters} variant="ghost" className="w-full">
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mb-2">
              {categoryName && categoryName !== 'all' ? categoryName : 'All Products'}
            </h1>
            <p className="text-white/60">{filteredProducts.length} products found</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Desktop Filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#121212] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg">Filters</h2>
                </div>
                <FilterSection />
              </div>
            </aside>

            {/* Mobile Filters */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full border-white/20">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="border-white/10 bg-[#0D0D0D] w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Products Grid */}
            <div>
              {/* Sort Controls */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-white/60">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-white/20 bg-[#121212]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#121212]">
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-[#121212] p-12 text-center">
                  <p className="text-lg text-white/60">No products found matching your filters.</p>
                  <Button onClick={clearFilters} variant="ghost" className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
