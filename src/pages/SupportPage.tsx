import { useState } from 'react';
import { Search, MessageCircle, Mail, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { toast } from 'sonner@2.0.3';

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const faqs = [
    {
      question: 'How do I download my purchased products?',
      answer: 'After purchase, you will receive an email with download links. You can also access all your products from your dashboard by clicking on "My Downloads".',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, PayPal, UPI, and Razorpay. All payments are processed securely through our payment partners.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes! We offer a 14-day money-back guarantee. If you\'re not satisfied with your purchase, contact us for a full refund within 14 days of purchase.',
    },
    {
      question: 'Do I get updates for my purchased products?',
      answer: 'Absolutely! All licenses include lifetime updates. You\'ll be notified via email when updates are available, and you can download them from your dashboard.',
    },
    {
      question: 'What is the difference between license types?',
      answer: 'Personal License is for your own projects. Commercial License allows use in client projects. Extended License includes unlimited projects and resale rights. Check each product page for specific details.',
    },
    {
      question: 'Can I use the products for commercial projects?',
      answer: 'Yes, with a Commercial or Extended license. The Personal license is only for personal, non-commercial use.',
    },
    {
      question: 'How do I get support for a product?',
      answer: 'You can contact us via email, WhatsApp, or submit a ticket through your dashboard. We typically respond within 24 hours on business days.',
    },
    {
      question: 'Can I transfer my license to another person?',
      answer: 'License transfers are evaluated on a case-by-case basis. Please contact support with your request and we\'ll be happy to help.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleWhatsAppSupport = () => {
    const message = 'Hi! I need help with a product purchase.';
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4">Support & Documentation</h1>
            <p className="text-lg text-white/70">
              Find answers to common questions or get in touch with us
            </p>
          </div>

          {/* Search */}
          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-white/20 bg-[#121212] pl-12"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <button
              onClick={handleWhatsAppSupport}
              className="group rounded-2xl border border-white/10 bg-[#121212] p-6 text-center transition-all hover:border-[#25D366]/50 hover:bg-[#25D366]/5"
            >
              <div className="mb-4 inline-flex rounded-xl bg-[#25D366]/20 p-4">
                <MessageCircle className="h-8 w-8 text-[#25D366]" />
              </div>
              <h3 className="mb-2">WhatsApp Support</h3>
              <p className="text-sm text-white/60">Get instant help via WhatsApp</p>
            </button>

            <a
              href="mailto:support@devstore.com"
              className="group rounded-2xl border border-white/10 bg-[#121212] p-6 text-center transition-all hover:border-[#5B46F7]/50 hover:bg-[#5B46F7]/5"
            >
              <div className="mb-4 inline-flex rounded-xl bg-[#5B46F7]/20 p-4">
                <Mail className="h-8 w-8 text-[#5B46F7]" />
              </div>
              <h3 className="mb-2">Email Support</h3>
              <p className="text-sm text-white/60">support@devstore.com</p>
            </a>

            <div className="group rounded-2xl border border-white/10 bg-[#121212] p-6 text-center transition-all hover:border-[#00C2FF]/50 hover:bg-[#00C2FF]/5">
              <div className="mb-4 inline-flex rounded-xl bg-[#00C2FF]/20 p-4">
                <FileText className="h-8 w-8 text-[#00C2FF]" />
              </div>
              <h3 className="mb-2">Documentation</h3>
              <p className="text-sm text-white/60">Guides and tutorials</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-white/10 bg-[#121212] px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#121212] p-12 text-center">
                <p className="text-white/60">No FAQs found matching your search.</p>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-[#121212] p-8">
            <h2 className="mb-6">Still need help?</h2>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="border-white/20 bg-[#0D0D0D]"
                />
              </div>
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className="border-white/20 bg-[#0D0D0D]"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or question..."
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  className="border-white/20 bg-[#0D0D0D]"
                />
              </div>
              <Button type="submit" className="w-full bg-[#5B46F7] hover:bg-[#5B46F7]/90">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
