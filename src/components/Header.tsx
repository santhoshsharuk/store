import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D0D0D]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5B46F7] to-[#00C2FF]" />
            <span className="text-xl">DevStore</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm text-white/70 transition-colors hover:text-white">
              Home
            </Link>
            <Link to="/category/all" className="text-sm text-white/70 transition-colors hover:text-white">
              Products
            </Link>
            <Link to="/support" className="text-sm text-white/70 transition-colors hover:text-white">
              Support
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/checkout" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5B46F7] text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-sm text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/all"
                className="text-sm text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/support"
                className="text-sm text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </Link>
              <Link
                to="/checkout"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                Cart ({cart.length})
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
