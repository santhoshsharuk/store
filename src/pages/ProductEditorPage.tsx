import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Save, X, Upload, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { products as initialProducts, categories as initialCategories } from '../data/products';

interface ProductFormState {
  id: string;
  name: string;
  category: string;
  price: number;
  sellerPhone: string;
  description: string;
  shortDesc: string;
  thumbnail: string;
  demoVideo: string;
  screenshots: string;
  features: string;
  tags: string;
  rating: number;
  reviews: number;
  isFeatured: boolean;
  isBestseller: boolean;
}

const defaultProductForm = (category: string): ProductFormState => ({
  id: '',
  name: '',
  category,
  price: 0,
  sellerPhone: '919812345678',
  description: '',
  shortDesc: '',
  thumbnail: '',
  demoVideo: '',
  screenshots: '',
  features: '',
  tags: '',
  rating: 4.8,
  reviews: 0,
  isFeatured: false,
  isBestseller: false,
});

export default function ProductEditorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const mode = productId ? 'edit' : 'create';

  const [productForm, setProductForm] = useState<ProductFormState>(
    defaultProductForm(initialCategories[0]?.name ?? 'Templates')
  );
  const [isLoading, setIsLoading] = useState(false);

  // Load product data if editing
  useEffect(() => {
    if (productId) {
      const product = initialProducts.find(p => p.id === productId);
      if (product) {
        setProductForm({
          ...product,
          screenshots: product.screenshots.join(', '),
          features: product.features.join('\n'),
          tags: product.tags.join(', '),
        });
      } else {
        toast.error('Product not found');
        navigate('/admin');
      }
    }
  }, [productId, navigate]);

  const handleFormChange = (field: keyof ProductFormState, value: string | number | boolean) => {
    setProductForm((prev) => ({ ...prev, [field]: value }));
  };

  const parseList = (value: string, delimiter: RegExp | string) =>
    value
      .split(delimiter)
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (!productForm.name || !productForm.category) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Simulate save process
      await new Promise(resolve => setTimeout(resolve, 1000));

      const productData = {
        ...productForm,
        id: productId ?? (initialProducts.length ? (Math.max(...initialProducts.map((p) => Number(p.id) || 0)) + 1).toString() : '1'),
        screenshots: parseList(productForm.screenshots, ','),
        features: parseList(productForm.features, /\n+/),
        tags: parseList(productForm.tags, ','),
        changelog: [
          {
            version: '1.0.0',
            date: new Date().toISOString().split('T')[0],
            changes: ['Initial release'],
          },
        ],
        license: {
          personal: productForm.price,
          commercial: productForm.price,
          extended: productForm.price,
        },
      };

      console.log('Product data:', productData);
      toast.success(`Product ${mode === 'edit' ? 'updated' : 'created'} successfully!`);
      
      // Navigate back to admin page
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#121212] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Sticky Header */}
          <div className="sticky top-20 z-40 mb-8 rounded-xl border border-white/10 bg-[#121212]/80 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleCancel} 
                  className="rounded-full border border-white/20 hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    {mode === 'edit' ? 'Edit Product' : 'Create New Product'}
                  </h1>
                  <p className="text-sm text-white/60">
                    {mode === 'edit' ? 'Update product information and save changes' : 'Add a new product to your store catalog'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleCancel} 
                  className="border-white/20 hover:bg-white/5"
                  disabled={isLoading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isLoading || !productForm.name || !productForm.category}
                  className="bg-gradient-to-r from-[#5B46F7] to-[#4a38d9] hover:from-[#5B46F7]/90 hover:to-[#4a38d9]/90 disabled:opacity-50"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Saving...' : (mode === 'edit' ? 'Update Product' : 'Create Product')}
                </Button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card className="border-white/10 bg-gradient-to-br from-[#121212] to-[#0D0D0D] shadow-xl">
              <CardHeader className="border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="rounded-lg bg-blue-500/10 p-2">
                    <Upload className="h-5 w-5 text-blue-400" />
                  </div>
                  Basic Information
                </CardTitle>
                <CardDescription>Essential product details and identification</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-white">
                      Product Name <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. React Dashboard Pro"
                      value={productForm.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-white">
                      Category <span className="text-red-400">*</span>
                    </Label>
                    <Select value={productForm.category} onValueChange={(value) => handleFormChange('category', value)}>
                      <SelectTrigger className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7]">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-[#121212]">
                        {initialCategories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium text-white">
                      Price (₹) <span className="text-red-400">*</span>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">₹</span>
                      <Input
                        id="price"
                        type="number"
                        min={0}
                        placeholder="3999"
                        value={productForm.price || ''}
                        onChange={(e) => handleFormChange('price', Number(e.target.value))}
                        className="border-white/20 bg-[#0D0D0D] pl-8 focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sellerPhone" className="text-sm font-medium text-white">
                      Seller Phone
                    </Label>
                    <Input
                      id="sellerPhone"
                      placeholder="919812345678"
                      value={productForm.sellerPhone}
                      onChange={(e) => handleFormChange('sellerPhone', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                    />
                  </div>
                </div>

                <Separator className="my-6 bg-white/10" />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shortDesc" className="text-sm font-medium text-white">
                      Short Description <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="shortDesc"
                      placeholder="Brief one-line description for product cards"
                      value={productForm.shortDesc}
                      onChange={(e) => handleFormChange('shortDesc', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      required
                    />
                    <p className="text-xs text-white/50">This appears on product cards and search results</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-white">
                      Full Description <span className="text-red-400">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      rows={5}
                      placeholder="Detailed product description with features, benefits, and use cases..."
                      value={productForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      required
                    />
                    <p className="text-xs text-white/50">Detailed description for the product page</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media & Visual Content */}
            <Card className="border-white/10 bg-gradient-to-br from-[#121212] to-[#0D0D0D] shadow-xl">
              <CardHeader className="border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="rounded-lg bg-purple-500/10 p-2">
                    <Eye className="h-5 w-5 text-purple-400" />
                  </div>
                  Media & Visual Content
                </CardTitle>
                <CardDescription>Images, videos and visual assets for your product</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail" className="text-sm font-medium text-white">
                      Thumbnail Image <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="thumbnail"
                      placeholder="https://example.com/thumbnail.jpg"
                      value={productForm.thumbnail}
                      onChange={(e) => handleFormChange('thumbnail', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      required
                    />
                    {productForm.thumbnail && (
                      <div className="mt-3 rounded-lg border border-white/10 p-3">
                        <p className="mb-2 text-xs font-medium text-white/60">Preview:</p>
                        <ImageWithFallback
                          src={productForm.thumbnail}
                          alt="Thumbnail preview"
                          className="h-24 w-32 rounded-lg object-cover border border-white/20"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="demoVideo" className="text-sm font-medium text-white">
                      Demo Video URL
                    </Label>
                    <Input
                      id="demoVideo"
                      placeholder="https://youtube.com/watch?v=..."
                      value={productForm.demoVideo}
                      onChange={(e) => handleFormChange('demoVideo', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                    />
                    <p className="text-xs text-white/50">YouTube video showcasing the product</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Label htmlFor="screenshots" className="text-sm font-medium text-white">
                    Screenshot URLs
                  </Label>
                  <Textarea
                    id="screenshots"
                    rows={3}
                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg, https://example.com/img3.jpg"
                    value={productForm.screenshots}
                    onChange={(e) => handleFormChange('screenshots', e.target.value)}
                    className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                  />
                  <p className="text-xs text-white/50">Comma-separated URLs for product screenshots gallery</p>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="border-white/10 bg-gradient-to-br from-[#121212] to-[#0D0D0D] shadow-xl">
              <CardHeader className="border-b border-white/10 pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="rounded-lg bg-green-500/10 p-2">
                    <Upload className="h-5 w-5 text-green-400" />
                  </div>
                  Product Details
                </CardTitle>
                <CardDescription>Features, tags, ratings and additional information</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="features" className="text-sm font-medium text-white">
                      Key Features
                    </Label>
                    <Textarea
                      id="features"
                      rows={5}
                      placeholder="Modern React 18 + TypeScript&#10;Tailwind CSS styling&#10;50+ pre-built components&#10;Dark/Light mode toggle&#10;Responsive design"
                      value={productForm.features}
                      onChange={(e) => handleFormChange('features', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                    />
                    <p className="text-xs text-white/50">One feature per line - these will be shown as bullet points</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-sm font-medium text-white">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      placeholder="react, typescript, admin, dashboard, template"
                      value={productForm.tags}
                      onChange={(e) => handleFormChange('tags', e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                    />
                    <p className="text-xs text-white/50">Comma-separated tags for search and categorization</p>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="rating" className="text-sm font-medium text-white">
                        Rating (0-5)
                      </Label>
                      <Input
                        id="rating"
                        type="number"
                        step={0.1}
                        min={0}
                        max={5}
                        value={productForm.rating || ''}
                        onChange={(e) => handleFormChange('rating', Number(e.target.value))}
                        className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reviews" className="text-sm font-medium text-white">
                        Reviews Count
                      </Label>
                      <Input
                        id="reviews"
                        type="number"
                        min={0}
                        value={productForm.reviews || ''}
                        onChange={(e) => handleFormChange('reviews', Number(e.target.value))}
                        className="border-white/20 bg-[#0D0D0D] focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      />
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-white">Product Status</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0D0D0D] p-4 transition-colors hover:bg-white/5">
                        <Switch
                          checked={productForm.isFeatured}
                          onCheckedChange={(checked) => handleFormChange('isFeatured', checked)}
                          className="data-[state=checked]:bg-[#5B46F7]"
                        />
                        <div>
                          <div className="text-sm font-medium text-white">Featured Product</div>
                          <div className="text-xs text-white/60">Display prominently on homepage</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#0D0D0D] p-4 transition-colors hover:bg-white/5">
                        <Switch
                          checked={productForm.isBestseller}
                          onCheckedChange={(checked) => handleFormChange('isBestseller', checked)}
                          className="data-[state=checked]:bg-[#5B46F7]"
                        />
                        <div>
                          <div className="text-sm font-medium text-white">Bestseller</div>
                          <div className="text-xs text-white/60">Mark as popular item</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-4 rounded-xl border border-white/10 bg-[#121212] p-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-white/20 hover:bg-white/5"
                disabled={isLoading}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel Changes
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !productForm.name || !productForm.category}
                className="bg-gradient-to-r from-[#5B46F7] to-[#4a38d9] hover:from-[#5B46F7]/90 hover:to-[#4a38d9]/90 disabled:opacity-50"
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Saving Product...' : (mode === 'edit' ? 'Update Product' : 'Create Product')}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}