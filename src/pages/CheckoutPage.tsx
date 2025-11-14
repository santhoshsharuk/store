import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Trash2, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { formatCurrencySimple } from '../utils/currency';
import { SELLER_WHATSAPP } from '../data/products';

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState('');

  const generateOrderId = () => {
    return 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = generateOrderId();
    
    // Build product list
    const productList = cart.map((item, index) => 
      `${index + 1}. ${item.name} (${item.license} license) - ${formatCurrencySimple(item.price)}`
    ).join('\n');

    // Create WhatsApp message
    const message = `🛒 *New Order Request*

*Order ID:* ${orderId}

*Customer Details:*
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
${customerAddress ? `Address: ${customerAddress}` : ''}

*Products:*
${productList}

*Total Amount:* ${formatCurrencySimple(cartTotal)}

Please send invoice and download links.`;

    setOrderMessage(message);
    setWhatsappModalOpen(true);
  };

  const sendToWhatsApp = () => {
    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://wa.me/${SELLER_WHATSAPP}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and redirect
    setTimeout(() => {
      clearCart();
      toast.success('Order placed! We will contact you on WhatsApp shortly.');
      navigate('/');
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center px-4 py-16">
          <div className="text-center">
            <h1 className="mb-4">Your cart is empty</h1>
            <p className="mb-8 text-white/60">Add some products to get started</p>
            <Button asChild className="bg-[#5B46F7] hover:bg-[#5B46F7]/90">
              <a href="/category/all">Browse Products</a>
            </Button>
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
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Order Form */}
            <div>
              <form onSubmit={handlePlaceOrder} className="space-y-8">
                {/* Customer Information */}
                <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                  <h2 className="mb-6">Your Details</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Santhosh Kumar"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="border-white/20 bg-[#0D0D0D]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="santhosh@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                        className="border-white/20 bg-[#0D0D0D]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">WhatsApp Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98123 45678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="border-white/20 bg-[#0D0D0D]"
                      />
                      <p className="mt-2 text-xs text-white/60">
                        We'll send order confirmation on this number
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="address">Address (Optional)</Label>
                      <Textarea
                        id="address"
                        placeholder="Your address..."
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        rows={3}
                        className="border-white/20 bg-[#0D0D0D]"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="rounded-2xl border border-white/10 bg-[#121212] p-6">
                  <h2 className="mb-4">Order via WhatsApp</h2>
                  <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-[#0D0D0D] p-4">
                    <MessageCircle className="h-6 w-6 flex-shrink-0 text-[#25D366]" />
                    <div>
                      <p className="mb-2">
                        After clicking "Place Order", you'll be redirected to WhatsApp to complete your purchase.
                      </p>
                      <p className="text-sm text-white/60">
                        • Send the order message to our WhatsApp<br />
                        • We'll send you payment details<br />
                        • After payment confirmation, get instant download links
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Place Order via WhatsApp
                </Button>

                <p className="text-center text-xs text-white/60">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#121212] p-6">
                <h2 className="mb-6">Order Summary</h2>

                <div className="mb-6 space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.productId}-${item.license}`} className="flex gap-4">
                      <ImageWithFallback
                        src={item.thumbnail}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm">{item.name}</h3>
                        <p className="text-xs capitalize text-white/60">{item.license} License</p>
                        <p className="text-sm">{formatCurrencySimple(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-white/60 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <Separator className="mb-4 bg-white/10" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span>{formatCurrencySimple(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>GST (18%)</span>
                    <span>{formatCurrencySimple(Math.round(cartTotal * 0.18))}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-white/10" />

                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span>{formatCurrencySimple(Math.round(cartTotal * 1.18))}</span>
                </div>

                <div className="mt-6 space-y-2 text-xs text-white/60">
                  <p>✓ Instant download after payment</p>
                  <p>✓ Secure WhatsApp ordering</p>
                  <p>✓ Email delivery of products</p>
                  <p>✓ Lifetime updates included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* WhatsApp Preview Modal */}
      <Dialog open={whatsappModalOpen} onOpenChange={setWhatsappModalOpen}>
        <DialogContent className="border-white/10 bg-[#121212] max-w-2xl">
          <DialogHeader>
            <DialogTitle>Confirm Your Order</DialogTitle>
            <DialogDescription className="text-white/60">
              Review your order details before sending to WhatsApp
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-white/10 bg-[#0D0D0D] p-4">
            <pre className="whitespace-pre-wrap text-sm text-white/80">{orderMessage}</pre>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setWhatsappModalOpen(false)}
              className="flex-1 border-white/20"
            >
              Cancel
            </Button>
            <Button onClick={sendToWhatsApp} className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90">
              <ExternalLink className="mr-2 h-4 w-4" />
              Send to WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
