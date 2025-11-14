import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useAuth } from '../context/AuthContext';
import { products, SELLER_WHATSAPP } from '../data/products';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatCurrencySimple } from '../utils/currency';

// Admin credentials (in production, use environment variables or backend auth)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Templates',
    description: '',
    shortDesc: '',
    pricePersonal: '',
    priceCommercial: '',
    priceExtended: '',
    tags: '',
  });

  // Mock stats
  const stats = [
    { label: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, change: '+12.5%' },
    { label: 'Total Orders', value: '248', icon: ShoppingBag, change: '+8.2%' },
    { label: 'Products', value: products.length.toString(), icon: Package, change: '+2' },
    { label: 'Customers', value: '1,284', icon: Users, change: '+18.3%' },
  ];

  // Mock orders
  const recentOrders = [
    { id: '1001', customer: 'Rahul Sharma', product: products[0].name, amount: 3999, status: 'completed', date: '2025-11-14' },
    { id: '1002', customer: 'Priya Patel', product: products[1].name, amount: 6499, status: 'completed', date: '2025-11-13' },
    { id: '1003', customer: 'Amit Kumar', product: products[2].name, amount: 2499, status: 'pending', date: '2025-11-14' },
  ];

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      login('admin@devstore.com', loginPassword);
      toast.success('Welcome to Admin Panel!');
    } else {
      toast.error('Invalid credentials!');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call
    const productData = {
      ...newProduct,
      pricePersonal: parseInt(newProduct.pricePersonal),
      priceCommercial: parseInt(newProduct.priceCommercial),
      priceExtended: parseInt(newProduct.priceExtended),
      tags: newProduct.tags.split(',').map(tag => tag.trim()),
    };
    
    console.log('New Product:', productData);
    toast.success('Product added successfully!');
    setAddProductOpen(false);
    
    // Reset form
    setNewProduct({
      name: '',
      category: 'Templates',
      description: '',
      shortDesc: '',
      pricePersonal: '',
      priceCommercial: '',
      priceExtended: '',
      tags: '',
    });
  };

  // Show login screen if not authenticated as admin
  if (!isAdminLoggedIn) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121212] p-8">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex rounded-xl bg-[#5B46F7]/20 p-4">
                <Package className="h-8 w-8 text-[#5B46F7]" />
              </div>
              <h1 className="mb-2">Admin Login</h1>
              <p className="text-sm text-white/60">Enter your credentials to access the admin panel</p>
            </div>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  className="border-white/20 bg-[#0D0D0D]"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="border-white/20 bg-[#0D0D0D] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 rounded-lg border border-white/10 bg-[#0D0D0D] p-4">
              <p className="mb-2 text-sm">Demo Credentials:</p>
              <p className="text-xs text-white/60">Username: <code className="text-[#5B46F7]">admin</code></p>
              <p className="text-xs text-white/60">Password: <code className="text-[#5B46F7]">admin123</code></p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2">Admin Dashboard</h1>
              <p className="text-white/60">Manage your digital store</p>
            </div>
            <div className="text-sm text-white/60">
              WhatsApp: <span className="text-[#25D366]">+{SELLER_WHATSAPP}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-[#121212] p-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-[#5B46F7]/20 p-2">
                      <Icon className="h-5 w-5 text-[#5B46F7]" />
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-400">
                      <TrendingUp className="h-4 w-4" />
                      {stat.change}
                    </div>
                  </div>
                  <p className="mb-1 text-sm text-white/60">{stat.label}</p>
                  <p className="text-2xl">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-8 border-b border-white/10 bg-transparent">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2>Manage Products</h2>
                <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl border-white/10 bg-[#121212]">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <div>
                        <Label htmlFor="product-name">Product Name *</Label>
                        <Input
                          id="product-name"
                          placeholder="React Dashboard Pro"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="border-white/20 bg-[#0D0D0D]"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-category">Category *</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                        >
                          <SelectTrigger className="border-white/20 bg-[#0D0D0D]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-white/10 bg-[#121212]">
                            <SelectItem value="Templates">Templates</SelectItem>
                            <SelectItem value="AI Tools">AI Tools</SelectItem>
                            <SelectItem value="Scripts">Scripts</SelectItem>
                            <SelectItem value="Plugins">Plugins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="product-short-desc">Short Description *</Label>
                        <Input
                          id="product-short-desc"
                          placeholder="Brief product description..."
                          value={newProduct.shortDesc}
                          onChange={(e) => setNewProduct({...newProduct, shortDesc: e.target.value})}
                          className="border-white/20 bg-[#0D0D0D]"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-desc">Full Description *</Label>
                        <Textarea
                          id="product-desc"
                          placeholder="Detailed product description..."
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          className="border-white/20 bg-[#0D0D0D]"
                          rows={4}
                          required
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="price-personal">Personal (₹) *</Label>
                          <Input
                            id="price-personal"
                            type="number"
                            placeholder="3999"
                            value={newProduct.pricePersonal}
                            onChange={(e) => setNewProduct({...newProduct, pricePersonal: e.target.value})}
                            className="border-white/20 bg-[#0D0D0D]"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="price-commercial">Commercial (₹) *</Label>
                          <Input
                            id="price-commercial"
                            type="number"
                            placeholder="7999"
                            value={newProduct.priceCommercial}
                            onChange={(e) => setNewProduct({...newProduct, priceCommercial: e.target.value})}
                            className="border-white/20 bg-[#0D0D0D]"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="price-extended">Extended (₹) *</Label>
                          <Input
                            id="price-extended"
                            type="number"
                            placeholder="15999"
                            value={newProduct.priceExtended}
                            onChange={(e) => setNewProduct({...newProduct, priceExtended: e.target.value})}
                            className="border-white/20 bg-[#0D0D0D]"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="product-tags">Tags (comma-separated)</Label>
                        <Input
                          id="product-tags"
                          placeholder="react, dashboard, admin, typescript"
                          value={newProduct.tags}
                          onChange={(e) => setNewProduct({...newProduct, tags: e.target.value})}
                          className="border-white/20 bg-[#0D0D0D]"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setAddProductOpen(false)}
                          className="flex-1 border-white/20"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="flex-1 bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                          Add Product
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-white/10 bg-[#121212] p-6"
                  >
                    <div className="flex flex-col gap-6 md:flex-row">
                      <ImageWithFallback
                        src={product.thumbnail}
                        alt={product.name}
                        className="h-24 w-32 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h3 className="mb-1">{product.name}</h3>
                            <p className="text-sm text-white/60">{product.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => toast.info('Edit feature coming soon')}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => toast.info('Delete feature coming soon')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="mb-3 text-sm text-white/70">{product.shortDesc}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-white/60">
                            Sales: <span className="text-white">{product.reviews}</span>
                          </span>
                          <span className="text-white/60">
                            Price: <span className="text-white">{formatCurrencySimple(product.license.personal)}</span>
                          </span>
                          <span className="text-white/60">
                            Rating: <span className="text-white">{product.rating}⭐</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#121212]">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="p-4 text-left text-sm">Order ID</th>
                        <th className="p-4 text-left text-sm">Date</th>
                        <th className="p-4 text-left text-sm">Customer</th>
                        <th className="p-4 text-left text-sm">Product</th>
                        <th className="p-4 text-left text-sm">Amount</th>
                        <th className="p-4 text-left text-sm">Status</th>
                        <th className="p-4 text-left text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-white/10 last:border-0">
                          <td className="p-4 text-sm">#{order.id}</td>
                          <td className="p-4 text-sm text-white/70">{order.date}</td>
                          <td className="p-4 text-sm text-white/70">{order.customer}</td>
                          <td className="p-4 text-sm">{order.product}</td>
                          <td className="p-4 text-sm">{formatCurrencySimple(order.amount)}</td>
                          <td className="p-4">
                            <Badge
                              className={
                                order.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button size="sm" variant="ghost" onClick={() => toast.info('View order details')}>
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#121212] p-8">
                <h2 className="mb-6">Store Settings</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                    <Input
                      id="whatsapp-number"
                      type="text"
                      value={`+${SELLER_WHATSAPP}`}
                      readOnly
                      className="border-white/20 bg-[#0D0D0D]"
                    />
                    <p className="mt-2 text-xs text-white/60">
                      Update this in /data/products.ts - SELLER_WHATSAPP constant
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      type="text"
                      defaultValue="DevStore"
                      className="border-white/20 bg-[#0D0D0D]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="store-email">Support Email</Label>
                    <Input
                      id="store-email"
                      type="email"
                      defaultValue="support@devstore.com"
                      className="border-white/20 bg-[#0D0D0D]"
                    />
                  </div>
                  <Button className="bg-[#5B46F7] hover:bg-[#5B46F7]/90" onClick={() => toast.success('Settings saved!')}>
                    Save Settings
                  </Button>
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
