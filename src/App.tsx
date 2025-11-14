import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import SupportPage from './pages/SupportPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProductEditorPage from './pages/ProductEditorPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AdminAuthProvider } from './context/AdminAuthContext';

export default function App() {
  return (
    <CartProvider>
      <AdminAuthProvider>
        <Router>
          <div className="min-h-screen bg-[#0D0D0D] text-white">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/preview_page.html" element={<Navigate to="/" replace />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/support" element={<SupportPage />} />
                
                {/* Admin Authentication Route */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                
                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                  <AdminProtectedRoute>
                    <AdminPage />
                  </AdminProtectedRoute>
                } />
                <Route path="/admin/editor" element={
                  <AdminProtectedRoute>
                    <ProductEditorPage />
                  </AdminProtectedRoute>
                } />
                
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AdminAuthProvider>
    </CartProvider>
  );
}