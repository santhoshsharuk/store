import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Download, Shield, RefreshCw, MessageCircle, ShoppingCart, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useCart } from '../context/CartContext';
import { products, SELLER_WHATSAPP } from '../data/products';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatCurrencySimple } from '../utils/currency';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const [selectedLicense, setSelectedLicense] = useState<'personal' | 'commercial' | 'extended'>('personal');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4">Product not found</h1>
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.license[selectedLicense],
      license: selectedLicense,
      thumbnail: product.thumbnail,
    });
    toast.success('Added to cart!');
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in purchasing "${product.name}" with the ${selectedLicense} license (${formatCurrencySimple(product.license[selectedLicense])}). Can you help me with the order?`;
    const whatsappUrl = `https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setWhatsappModalOpen(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Product Header */}
          <div className="mb-12 grid gap-8 lg:grid-cols-2">
            {/* Left: Images */}
            <div>
              <div className="mb-4 overflow-hidden rounded-2xl border border-white/10">
                <ImageWithFallback
                  src={product.screenshots[currentImageIndex]}
                  alt={product.name}
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`overflow-hidden rounded-lg border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-[#5B46F7]'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <ImageWithFallback
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="aspect-video w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Purchase Info */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full bg-[#5B46F7]/10 px-3 py-1 text-sm text-[#5B46F7]">
                  {product.category}
                </span>
                {product.isBestseller && (
                  <span className="rounded-full bg-[#00C2FF]/10 px-3 py-1 text-sm text-[#00C2FF]">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="mb-4">{product.name}</h1>

              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span>{product.rating}</span>
                </div>
                <span className="text-white/60">({product.reviews} reviews)</span>
              </div>

              <p className="mb-8 text-lg text-white/80">{product.description}</p>

              {/* License Selection */}
              <div className="mb-6 rounded-2xl border border-white/10 bg-[#121212] p-6">
                <h3 className="mb-4">Select License</h3>
                <RadioGroup value={selectedLicense} onValueChange={(value: any) => setSelectedLicense(value)}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="personal" id="personal" />
                        <Label htmlFor="personal" className="cursor-pointer">
                          <div>
                            <p>Personal License</p>
                            <p className="text-sm text-white/60">For personal projects</p>
                          </div>
                        </Label>
                      </div>
                      <span className="text-xl">{formatCurrencySimple(product.license.personal)}</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="commercial" id="commercial" />
                        <Label htmlFor="commercial" className="cursor-pointer">
                          <div>
                            <p>Commercial License</p>
                            <p className="text-sm text-white/60">For client projects</p>
                          </div>
                        </Label>
                      </div>
                      <span className="text-xl">{formatCurrencySimple(product.license.commercial)}</span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="extended" id="extended" />
                        <Label htmlFor="extended" className="cursor-pointer">
                          <div>
                            <p>Extended License</p>
                            <p className="text-sm text-white/60">Unlimited projects</p>
                          </div>
                        </Label>
                      </div>
                      <span className="text-xl">{formatCurrencySimple(product.license.extended)}</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* CTA Buttons */}
              <div className="mb-6 flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 bg-[#5B46F7] hover:bg-[#5B46F7]/90"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => setWhatsappModalOpen(true)}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-white/20"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </Button>
              </div>

              <p className="mb-8 text-center text-sm text-white/60">
                Instant download after payment • Email & in-dashboard delivery
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div className="text-center">
                  <Download className="mx-auto mb-2 h-6 w-6 text-[#5B46F7]" />
                  <p className="text-xs text-white/60">Instant Download</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="mx-auto mb-2 h-6 w-6 text-[#5B46F7]" />
                  <p className="text-xs text-white/60">Lifetime Updates</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 h-6 w-6 text-[#5B46F7]" />
                  <p className="text-xs text-white/60">Secure Payment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mb-12">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 w-full justify-start border-b border-white/10 bg-transparent">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="changelog">Changelog</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#121212] p-8">
                  <h2 className="mb-4">What's Included</h2>
                  <p className="mb-6 text-white/70">{product.description}</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {product.features.slice(0, 6).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-[#5B46F7]/20 flex items-center justify-center flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-[#5B46F7]" />
                        </div>
                        <p className="text-white/80">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#121212] p-8">
                  <h2 className="mb-6">All Features</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 rounded-full bg-[#5B46F7]/20 flex items-center justify-center flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-[#5B46F7]" />
                        </div>
                        <p className="text-white/80">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="changelog" className="space-y-6">
                <div className="space-y-4">
                  {product.changelog.map((version, index) => (
                    <div key={index} className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3>Version {version.version}</h3>
                        <span className="text-sm text-white/60">{version.date}</span>
                      </div>
                      <ul className="space-y-2">
                        {version.changes.map((change, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/70">
                            <span className="text-[#5B46F7]">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      q: 'What do I get after purchase?',
                      a: 'You will receive an instant download link via email and access to the product in your dashboard. All files, documentation, and license keys are included.',
                    },
                    {
                      q: 'Do I get updates?',
                      a: 'Yes! All licenses include lifetime updates. You will be notified when new versions are released.',
                    },
                    {
                      q: 'What is your refund policy?',
                      a: 'We offer a 14-day money-back guarantee. If you are not satisfied, contact us for a full refund.',
                    },
                    {
                      q: 'Can I use this for client projects?',
                      a: 'Yes, with the Commercial or Extended license. The Personal license is only for your own projects.',
                    },
                  ].map((faq, index) => (
                    <div key={index} className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                      <h3 className="mb-2">{faq.q}</h3>
                      <p className="text-white/70">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="mb-8">Related Products</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* WhatsApp Modal */}
      <Dialog open={whatsappModalOpen} onOpenChange={setWhatsappModalOpen}>
        <DialogContent className="border-white/10 bg-[#121212]">
          <DialogHeader>
            <DialogTitle>Order via WhatsApp</DialogTitle>
            <DialogDescription className="text-white/60">
              We'll send this message to our support team
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-white/10 bg-[#0D0D0D] p-4">
            <p className="text-sm text-white/80">
              Hi! I'm interested in purchasing "{product.name}" with the {selectedLicense} license (
              {formatCurrencySimple(product.license[selectedLicense])}). Can you help me with the order?
            </p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setWhatsappModalOpen(false)}
              className="flex-1 border-white/20"
            >
              Cancel
            </Button>
            <Button onClick={handleWhatsAppOrder} className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
