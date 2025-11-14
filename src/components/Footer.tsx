import { Link } from 'react-router-dom';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0D0D0D] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5B46F7] to-[#00C2FF]" />
              <span className="text-xl">DevStore</span>
            </div>
            <p className="text-sm text-white/60">
              Production-ready code, scripts, and tools for indie makers.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm">Products</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link to="/category/Templates" className="hover:text-white">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/category/AI Tools" className="hover:text-white">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link to="/category/Scripts" className="hover:text-white">
                  Scripts
                </Link>
              </li>
              <li>
                <Link to="/category/Plugins" className="hover:text-white">
                  Plugins
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm">Support</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link to="/support" className="hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="mb-4 text-sm">Legal</h3>
            <ul className="mb-6 space-y-2 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  License
                </a>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:flex-row">
          <p>© 2025 DevStore. Made in India 🇮🇳</p>
          <div className="flex gap-2 text-xs text-white/40">
            <span>WhatsApp Orders • UPI • Bank Transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
