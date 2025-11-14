import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Lock, Shield, User } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(username, password);
    
    if (success) {
      toast.success('Login successful! Welcome to admin dashboard.');
      navigate('/admin');
    } else {
      setError('Invalid username or password. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#121212] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <Card className="border-white/10 bg-gradient-to-br from-[#121212] to-[#0D0D0D] shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#5B46F7] to-[#4a38d9]">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Admin Access
              </CardTitle>
              <CardDescription className="text-white/60">
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {error && (
                  <Alert className="border-red-500/50 bg-red-500/10">
                    <AlertDescription className="text-red-400">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-white">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] pl-10 focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-white/20 bg-[#0D0D0D] pl-10 focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#5B46F7] to-[#4a38d9] hover:from-[#5B46F7]/90 hover:to-[#4a38d9]/90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Sign In to Admin
                    </>
                  )}
                </Button>
              </form>

              {/* Demo Credentials Info */}
              <div className="mt-8 rounded-lg border border-white/10 bg-[#0D0D0D] p-4">
                <h3 className="mb-2 text-sm font-medium text-white/80">Demo Credentials:</h3>
                <div className="space-y-1 text-xs text-white/60">
                  <div><span className="font-medium">Username:</span> admin</div>
                  <div><span className="font-medium">Password:</span> admin123</div>
                </div>
                <p className="mt-2 text-xs text-white/50">
                  These are demo credentials for testing purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to Store Link */}
          <div className="mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white/60 hover:text-white hover:bg-white/5"
            >
              ← Back to Store
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}