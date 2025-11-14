import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#121212] flex items-center justify-center px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Glassy Container */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-12 shadow-2xl">
            {/* Background Sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-r from-[#5B46F7]/20 to-[#00C2FF]/20 blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20 blur-xl"></div>
              <div className="absolute top-1/2 left-1/4 h-16 w-16 rounded-full bg-gradient-to-r from-[#FFE66D]/20 to-[#FF6B6B]/20 blur-xl"></div>
              
              {/* Floating Sparkles */}
              <Sparkles className="absolute top-8 right-12 h-6 w-6 text-[#5B46F7]/30" />
              <Sparkles className="absolute bottom-12 left-8 h-4 w-4 text-[#00C2FF]/40" />
              <Sparkles className="absolute top-1/3 right-1/4 h-5 w-5 text-[#FFE66D]/30" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* 404 Number */}
              <div className="mb-8">
                <h1 className="text-9xl sm:text-[12rem] font-bold bg-gradient-to-r from-[#5B46F7] via-[#00C2FF] to-[#4ECDC4] bg-clip-text text-transparent leading-none">
                  404
                </h1>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#5B46F7] to-[#00C2FF] rounded-full mt-4"></div>
              </div>

              {/* Error Message */}
              <div className="mb-8 space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Page Not Found
                </h2>
                <p className="text-lg text-white/70 max-w-md mx-auto leading-relaxed">
                  Oops! The page you're looking for seems to have vanished into the digital void. 
                  Don't worry, even the best developers lose their way sometimes.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#5B46F7] to-[#4a38d9] hover:from-[#5B46F7]/90 hover:to-[#4a38d9]/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </Link>
                </Button>

                <Button 
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all duration-300"
                >
                  <Link to="/category/all">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Products
                  </Link>
                </Button>
              </div>

              {/* Additional Help */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-white/50 mb-4">
                  Need help finding something?
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link 
                    to="/category/all" 
                    className="text-[#5B46F7] hover:text-[#4a38d9] transition-colors underline decoration-dotted underline-offset-4"
                  >
                    All Products
                  </Link>
                  <span className="text-white/30">•</span>
                  <Link 
                    to="/support" 
                    className="text-[#5B46F7] hover:text-[#4a38d9] transition-colors underline decoration-dotted underline-offset-4"
                  >
                    Support
                  </Link>
                  <span className="text-white/30">•</span>
                  <button 
                    onClick={() => window.history.back()} 
                    className="text-[#5B46F7] hover:text-[#4a38d9] transition-colors underline decoration-dotted underline-offset-4 flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-[#5B46F7] rounded-full opacity-60"></div>
            <div className="absolute bottom-32 right-16 w-3 h-3 bg-[#00C2FF] rounded-full opacity-60"></div>
            <div className="absolute top-1/2 left-8 w-1 h-1 bg-[#FFE66D] rounded-full opacity-60"></div>
            <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-[#4ECDC4] rounded-full opacity-60"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}