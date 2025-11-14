import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Download, Shield, RefreshCw, MessageCircle, Layout, Brain, Code, Puzzle, Search } from 'lucide-react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { products } from '../data/products';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatCurrencySimple } from '../utils/currency';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const navigate = useNavigate();
  const featuredProducts = products.filter((p) => p.isFeatured);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for subscribing! Check your email for a free tool.');
    setEmail('');
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(heroSearchQuery.trim())}`);
      setHeroSearchQuery('');
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0D0D0D] to-[#121212] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Ship faster — download production‑ready code & tools
                </h1>
                <p className="mb-8 text-xl text-white/70">
                  Premium templates, AI tools, scripts, and plugins built by indie makers, for indie makers.
                </p>
                
                {/* Hero Search Bar */}
                <div className="mb-8">
                  <form onSubmit={handleHeroSearch} className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                    <Input
                      type="text"
                      placeholder="Search templates, tools, scripts..."
                      value={heroSearchQuery}
                      onChange={(e) => setHeroSearchQuery(e.target.value)}
                      className="h-12 w-full border-white/20 bg-white/5 pl-12 pr-4 text-white placeholder:text-white/40 focus:border-[#5B46F7] focus:ring-[#5B46F7]/20"
                    />
                  </form>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#5B46F7] hover:bg-[#5B46F7]/90"
                  >
                    <Link to="/category/all">
                      Shop Products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:bg-white/5"
                  >
                    <a href="#featured">Explore Freebies</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="grid gap-4">
                  {featuredProducts.slice(0, 3).map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className="overflow-hidden rounded-xl border border-white/10 bg-[#121212] p-4"
                    >
                      <div className="flex items-center gap-4">
                        <ImageWithFallback
                          src={product.thumbnail}
                          alt={product.name}
                          className="h-16 w-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm">{product.name}</h3>
                          <p className="text-xs text-white/60">{product.category}</p>
                        </div>
                        <span className="text-lg">{formatCurrencySimple(product.price)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-2">Featured Products</h2>
                <p className="text-white/60">Latest releases and bestsellers</p>
              </div>
              <Button asChild variant="ghost">
                <Link to="/category/all">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center">Browse by Category</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Templates', icon: Layout, color: '#5B46F7', count: 2 },
                { name: 'AI Tools', icon: Brain, color: '#00C2FF', count: 1 },
                { name: 'Scripts', icon: Code, color: '#3575FF', count: 2 },
                { name: 'Plugins', icon: Puzzle, color: '#5B46F7', count: 1 },
              ].map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    to={`/category/${category.name}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-8 transition-all hover:-translate-y-1 hover:border-white/20"
                  >
                    <div
                      className="mb-4 inline-flex rounded-xl p-3"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="h-8 w-8" style={{ color: category.color }} />
                    </div>
                    <h3 className="mb-2">{category.name}</h3>
                    <p className="text-sm text-white/60">{category.count} products</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Buy From Me */}
        <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center">Why Choose DevStore</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: RefreshCw,
                  title: 'Lifetime Updates',
                  desc: 'Get all future updates and improvements for free',
                },
                {
                  icon: Download,
                  title: 'Instant Download',
                  desc: 'Access your purchase immediately after payment',
                },
                {
                  icon: Shield,
                  title: 'Code Quality',
                  desc: 'Production-ready, well-documented, and tested',
                },
                {
                  icon: MessageCircle,
                  title: 'Friendly Support',
                  desc: 'Quick responses via email or WhatsApp',
                },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="text-center">
                    <div className="mb-4 inline-flex rounded-xl bg-[#5B46F7]/10 p-4">
                      <Icon className="h-8 w-8 text-[#5B46F7]" />
                    </div>
                    <h3 className="mb-2 text-lg">{feature.title}</h3>
                    <p className="text-sm text-white/60">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center">Loved by Developers</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'Indie Maker',
                  text: 'The React Dashboard Pro saved me weeks of development. Worth every penny!',
                  rating: 5,
                },
                {
                  name: 'Mike Rodriguez',
                  role: 'Freelance Developer',
                  text: 'Clean code, great documentation, and amazing support. Highly recommended.',
                  rating: 5,
                },
                {
                  name: 'Emma Thompson',
                  role: 'SaaS Founder',
                  text: 'These tools helped me ship my MVP faster. The quality is outstanding.',
                  rating: 5,
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-2xl border border-white/10 bg-[#121212] p-6"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-white/80">{testimonial.text}</p>
                  <div>
                    <p>{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4">Get a free tool every month</h2>
            <p className="mb-8 text-lg text-white/70">
              Join 8,000+ makers getting exclusive tools, tips, and early access to new products
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-white/20 bg-[#121212]"
              />
              <Button type="submit" className="bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
