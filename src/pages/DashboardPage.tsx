import { useState } from 'react';
import { Download, FileText, Bell, User } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function DashboardPage() {
  const { user, login, isAuthenticated } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Mock purchased products
  const purchasedProducts = isAuthenticated
    ? products.slice(0, 3).map((p) => ({
        ...p,
        purchaseDate: '2025-11-10',
        licenseKey: `XXXX-XXXX-XXXX-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        hasUpdate: Math.random() > 0.5,
      }))
    : [];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
    toast.success('Welcome back!');
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center px-4 py-16">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121212] p-8">
            <h1 className="mb-6 text-center">Sign In</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="border-white/20 bg-[#0D0D0D]"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="border-white/20 bg-[#0D0D0D]"
                />
              </div>
              <Button type="submit" className="w-full bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                Sign In
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-white/60">
              Demo: Use any email (use admin@example.com for admin access)
            </p>
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
          <div className="mb-8">
            <h1 className="mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-white/60">Manage your downloads and purchases</p>
          </div>

          <Tabs defaultValue="downloads" className="w-full">
            <TabsList className="mb-8 border-b border-white/10 bg-transparent">
              <TabsTrigger value="downloads">My Downloads</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
                {purchasedProducts.filter((p) => p.hasUpdate).length > 0 && (
                  <Badge className="ml-2 bg-[#5B46F7]">
                    {purchasedProducts.filter((p) => p.hasUpdate).length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Downloads Tab */}
            <TabsContent value="downloads" className="space-y-6">
              {purchasedProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-[#121212] p-6"
                >
                  <div className="flex flex-col gap-6 md:flex-row">
                    <ImageWithFallback
                      src={product.thumbnail}
                      alt={product.name}
                      className="h-32 w-48 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="mb-1">{product.name}</h3>
                          <p className="text-sm text-white/60">{product.category}</p>
                        </div>
                        {product.hasUpdate && (
                          <Badge className="bg-green-500">Update Available</Badge>
                        )}
                      </div>
                      <p className="mb-4 text-sm text-white/70">
                        Purchased on {product.purchaseDate}
                      </p>
                      <div className="mb-4 rounded-lg border border-white/10 bg-[#0D0D0D] p-3">
                        <p className="mb-1 text-xs text-white/60">License Key</p>
                        <code className="text-sm text-[#5B46F7]">{product.licenseKey}</code>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={() => toast.success('Download started!')}
                          className="bg-[#5B46F7] hover:bg-[#5B46F7]/90"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download (ZIP)
                        </Button>
                        <Button
                          onClick={() => toast.info('License details copied to clipboard')}
                          variant="outline"
                          className="border-white/20"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View License
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                        <th className="p-4 text-left text-sm">Product</th>
                        <th className="p-4 text-left text-sm">Amount</th>
                        <th className="p-4 text-left text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchasedProducts.map((product, index) => (
                        <tr key={product.id} className="border-b border-white/10 last:border-0">
                          <td className="p-4 text-sm">#{1000 + index}</td>
                          <td className="p-4 text-sm text-white/70">{product.purchaseDate}</td>
                          <td className="p-4 text-sm">{product.name}</td>
                          <td className="p-4 text-sm">${product.price}</td>
                          <td className="p-4">
                            <Badge className="bg-green-500">Completed</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                <h2 className="mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profile-email">Email</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="border-white/20 bg-[#0D0D0D]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile-name">Name</Label>
                    <Input
                      id="profile-name"
                      type="text"
                      defaultValue={user?.name || ''}
                      className="border-white/20 bg-[#0D0D0D]"
                    />
                  </div>
                  <Button className="bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              {purchasedProducts.filter((p) => p.hasUpdate).map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-white/10 bg-[#121212] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-[#5B46F7]/20 p-3">
                      <Bell className="h-6 w-6 text-[#5B46F7]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1">Update Available: {product.name}</h3>
                      <p className="mb-3 text-sm text-white/70">
                        A new version is available for download with bug fixes and new features.
                      </p>
                      <Button
                        size="sm"
                        onClick={() => toast.success('Downloading latest version...')}
                        className="bg-[#5B46F7] hover:bg-[#5B46F7]/90"
                      >
                        Download Update
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {purchasedProducts.filter((p) => p.hasUpdate).length === 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#121212] p-12 text-center">
                  <Bell className="mx-auto mb-4 h-12 w-12 text-white/20" />
                  <p className="text-white/60">No new notifications</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
