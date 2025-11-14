import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Layers,
  Tag,
  Plus,
  Edit,
  Trash2,
  Download,
  Copy,
  Sparkles,
  Search,
  Filter,
  Eye,
  Calendar,
  TrendingUp,
  LogOut,
  Shield,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatCurrencySimple } from '../utils/currency';
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

export default function AdminPage() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '', count: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const stats = useMemo(() => {
    const totalValue = products.reduce((sum, product) => sum + product.price, 0);
    const featured = products.filter((p) => p.isFeatured).length;
    const bestsellers = products.filter((p) => p.isBestseller).length;
    return [
      { label: 'Total Products', value: products.length, icon: Package, color: 'from-blue-500 to-blue-600' },
      { label: 'Categories', value: categories.length, icon: Layers, color: 'from-purple-500 to-purple-600' },
      { label: 'Featured Items', value: featured, icon: Sparkles, color: 'from-yellow-500 to-yellow-600' },
      { label: 'Bestsellers', value: bestsellers, icon: TrendingUp, color: 'from-green-500 to-green-600' },
    ];
  }, [products, categories.length]);

  const handleProductChange = (field: keyof ProductFormState, value: string | number | boolean) => {
    // This function is no longer needed as we navigate to editor page
  };

  const resetProductForm = () => {
    // This function is no longer needed as we navigate to editor page
  };

  const productToFormState = (product: (typeof products)[number]): ProductFormState => ({
    // This function is no longer needed as we navigate to editor page
    ...product,
    screenshots: product.screenshots.join(', '),
    features: product.features.join('\n'),
    tags: product.tags.join(', '),
  });

  const parseList = (value: string, delimiter: RegExp | string) =>
    value
      .split(delimiter)
      .map((item) => item.trim())
      .filter(Boolean);

  const handleProductSubmit = (event: React.FormEvent) => {
    // This function is no longer needed as we navigate to editor page
    event.preventDefault();
  };

  const handleProductEdit = (productId: string) => {
    navigate(`/admin/editor?id=${productId}`);
  };

  const handleProductDelete = (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    toast.success('Product deleted successfully!');
  };

  const handleCategorySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!categoryForm.name || !categoryForm.icon) {
      toast.error('Category name and icon are required');
      return;
    }

    setCategories((prev) => {
      const exists = prev.some((category) => category.name.toLowerCase() === categoryForm.name.toLowerCase());
      if (exists) {
        toast.error('Category already exists');
        return prev;
      }
      return [
        ...prev,
        {
          name: categoryForm.name,
          icon: categoryForm.icon,
          count: Number(categoryForm.count) || 0,
        },
      ];
    });

    toast.success('Category added successfully!');
    setCategoryForm({ name: '', icon: '', count: '' });
  };

  const jsonString = JSON.stringify({ products, categories }, null, 2);

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.updated.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      toast.success('JSON copied to clipboard');
    } catch (error) {
      toast.error('Clipboard copy failed');
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-gradient-to-r from-[#5B46F7] to-[#4a38d9] p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="mb-1 text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-white/60">Manage products, categories, and export updated JSON.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                className="border-white/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> 
                Logout
              </Button>
              <Button variant="outline" className="border-white/20" onClick={handleCopyJson}>
                <Copy className="mr-2 h-4 w-4" /> Copy JSON
              </Button>
              <Button className="bg-[#5B46F7] hover:bg-[#5B46F7]/90" onClick={handleDownloadJson}>
                <Download className="mr-2 h-4 w-4" /> Download JSON
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#121212] to-[#0D0D0D] p-6 transition-all hover:border-white/20">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 transition-opacity group-hover:opacity-10`} />
                <div className="relative">
                  <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r ${stat.color} p-3 shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-white/60">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-8 border-b border-white/10 bg-transparent">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="json">JSON Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Search and Filter Controls */}
              <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#121212] p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 border-white/20 bg-[#0D0D0D]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#121212]">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={() => navigate('/admin/editor')}
                  className="bg-gradient-to-r from-[#5B46F7] to-[#4a38d9] hover:from-[#5B46F7]/90 hover:to-[#4a38d9]/90"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>

              {/* Products Table */}
              <div className="rounded-xl border border-white/10 bg-[#121212] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10 bg-[#0D0D0D]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Product</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Rating</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-white/40">
                            {searchTerm || selectedCategory !== 'all' ? 'No products match your search criteria' : 'No products found'}
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((product, index) => (
                          <tr 
                            key={product.id} 
                            className={`border-b border-white/5 transition-all hover:bg-white/5 ${
                              index % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                            }`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <ImageWithFallback
                                  src={product.thumbnail}
                                  alt={product.name}
                                  className="h-12 w-12 rounded-lg object-cover"
                                />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white truncate">{product.name}</p>
                                  <p className="text-xs text-white/50 truncate">{product.shortDesc}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant="secondary" className="bg-[#5B46F7]/10 text-[#5B46F7] hover:bg-[#5B46F7]/20">
                                {product.category}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-semibold text-white">{formatCurrencySimple(product.price)}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-1">
                                {product.isFeatured && (
                                  <Badge className="bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20">
                                    <Sparkles className="mr-1 h-3 w-3" />
                                    Featured
                                  </Badge>
                                )}
                                {product.isBestseller && (
                                  <Badge className="bg-green-500/10 text-green-400 hover:bg-green-500/20">
                                    <TrendingUp className="mr-1 h-3 w-3" />
                                    Bestseller
                                  </Badge>
                                )}
                                {!product.isFeatured && !product.isBestseller && (
                                  <Badge variant="outline" className="border-white/20 text-white/60">
                                    Regular
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-white">{product.rating}</span>
                                <div className="text-yellow-400">⭐</div>
                                <span className="text-xs text-white/40">({product.reviews})</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleProductEdit(product.id)}
                                  className="h-8 w-8 p-0 hover:bg-blue-500/10 hover:text-blue-400"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleProductDelete(product.id)}
                                  className="h-8 w-8 p-0 hover:bg-red-500/10 hover:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Table Footer */}
                <div className="border-t border-white/10 bg-[#0D0D0D] px-6 py-3">
                  <p className="text-sm text-white/60">
                    Showing {filteredProducts.length} of {products.length} products
                    {searchTerm && ` • Filtered by "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` • Category: ${selectedCategory}`}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.name} className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                      <p className="text-xs text-white/40">Icon: {category.icon}</p>
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm text-white/60">{category.count} products linked</p>
                    </div>
                  ))}
                </div>
                <form className="rounded-2xl border border-white/10 bg-[#121212] p-6" onSubmit={handleCategorySubmit}>
                  <h2 className="mb-4 text-lg">Add Category</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category-name">Name *</Label>
                      <Input
                        id="category-name"
                        value={categoryForm.name}
                        onChange={(event) => setCategoryForm((prev) => ({ ...prev, name: event.target.value }))}
                        className="border-white/20 bg-[#0D0D0D]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-icon">Icon label *</Label>
                      <Input
                        id="category-icon"
                        value={categoryForm.icon}
                        onChange={(event) => setCategoryForm((prev) => ({ ...prev, icon: event.target.value }))}
                        className="border-white/20 bg-[#0D0D0D]"
                        placeholder="e.g. Layout"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-count">Display count</Label>
                      <Input
                        id="category-count"
                        type="number"
                        min={0}
                        value={categoryForm.count}
                        onChange={(event) => setCategoryForm((prev) => ({ ...prev, count: event.target.value }))}
                        className="border-white/20 bg-[#0D0D0D]"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                      Add Category
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="json">
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg">products.json preview</h2>
                    <div className="flex gap-3">
                      <Button variant="outline" className="border-white/20" onClick={handleCopyJson}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                      </Button>
                      <Button className="bg-[#5B46F7] hover:bg-[#5B46F7]/90" onClick={handleDownloadJson}>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </div>
                  <Textarea value={jsonString} readOnly rows={20} className="border-white/10 bg-[#0D0D0D] font-mono text-xs" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
