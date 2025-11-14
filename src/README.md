# DevStore - Indian Digital Products Store

A complete WhatsApp-based digital store built for Indian market with Indian Rupee currency and direct WhatsApp ordering system.

## 🚀 Features

- **WhatsApp Ordering**: No payment gateway needed - customers order directly via WhatsApp
- **Indian Rupee Currency**: All prices in ₹ INR
- **Admin Panel**: Secure admin login to manage products
- **Product Categories**: Templates, AI Tools, Scripts, and Plugins
- **License Tiers**: Personal, Commercial, and Extended licenses
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark Theme**: Modern dark UI with purple and blue accents

## ⚙️ Configuration

### 1. Set Your WhatsApp Number

Edit `/data/products.ts` and update the seller WhatsApp number:

```typescript
// Replace with your actual WhatsApp number (include country code without +)
export const SELLER_WHATSAPP = '919812345678'; // Your number here
```

**Format**: Country code + number (no spaces, no + symbol)
- India: `919876543210`
- US: `14155552671`

### 2. Admin Login Credentials

Edit `/pages/AdminPage.tsx` to change admin credentials:

```typescript
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
```

**Default credentials for testing**:
- Username: `admin`
- Password: `admin123`

## 📦 Product Management

### Adding Products via Admin Panel

1. Go to `/admin` and login with credentials
2. Click "Add Product" button
3. Fill in:
   - Product name
   - Category (Templates/AI Tools/Scripts/Plugins)
   - Short description
   - Full description
   - Prices for Personal, Commercial, Extended licenses (in ₹)
   - Tags (comma-separated)

### Editing Products in Code

Edit `/data/products.ts` to add/modify products:

```typescript
{
  id: '1',
  name: 'Your Product Name',
  category: 'Templates', // or AI Tools, Scripts, Plugins
  price: 3999, // base price in rupees
  description: 'Full description',
  shortDesc: 'Brief description',
  thumbnail: 'image-url',
  license: {
    personal: 3999,
    commercial: 7999,
    extended: 15999
  },
  // ... other fields
}
```

## 🎨 Customization

### Colors

Edit `/styles/globals.css` to change theme colors:

```css
--primary: #5B46F7;      /* Purple accent */
--secondary: #00C2FF;     /* Blue accent */
--accent: #3575FF;        /* Bright blue */
--background: #0D0D0D;    /* Dark background */
--card: #121212;          /* Card background */
```

### Store Name

Update in multiple places:
- `/components/Header.tsx` - Logo text
- `/components/Footer.tsx` - Footer branding
- `/pages/AdminPage.tsx` - Store settings

## 📱 How Orders Work

1. **Customer browses products** and adds to cart
2. **Clicks "Checkout"** and fills their details (name, email, WhatsApp number)
3. **Clicks "Place Order via WhatsApp"** - sees order preview
4. **Clicks "Send to WhatsApp"** - redirected to WhatsApp with pre-filled message
5. **Message sent to your WhatsApp** with complete order details
6. **You send payment details** (UPI, bank transfer, etc.)
7. **After payment confirmation**, you send download links via WhatsApp or email

## 💰 Payment Methods

Recommended for India:
- **UPI** (GPay, PhonePe, Paytm)
- **Bank Transfer** (NEFT/IMPS)
- **PayPal** (for international customers)

## 📧 Order Format

Customers send this via WhatsApp:

```
🛒 *New Order Request*

*Order ID:* ORD1234

*Customer Details:*
Name: Rahul Kumar
Email: rahul@example.com
Phone: +91 98765 43210

*Products:*
1. React Dashboard Pro (personal license) - ₹3,999

*Total Amount:* ₹3,999

Please send invoice and download links.
```

## 🔐 Admin Panel Features

Access at `/admin`:

### Dashboard
- Total revenue
- Total orders
- Active products
- Customer count

### Products Tab
- View all products
- Add new products with form
- Edit/delete products (coming soon)

### Orders Tab
- View recent orders
- Order status tracking
- Customer information

### Settings Tab
- Store configuration
- WhatsApp number
- Email settings

## 🌟 Pages

- **Home** (`/`) - Hero, featured products, categories
- **Category** (`/category/:name`) - Filtered product listings
- **Product Detail** (`/product/:id`) - Full product info with WhatsApp ordering
- **Checkout** (`/checkout`) - Cart and WhatsApp order form
- **Dashboard** (`/dashboard`) - Customer downloads and orders
- **Admin** (`/admin`) - Store management (protected)
- **Support** (`/support`) - FAQ and contact

## 📱 Responsive Design

- **Mobile**: < 768px - Hamburger menu, stacked layouts
- **Tablet**: 768px - 1024px - 2-column grids
- **Desktop**: > 1024px - 3-4 column grids, sidebar navigation

## 🛠️ Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Motion** - Animations
- **Lucide Icons** - Icon library
- **Sonner** - Toast notifications

## 📞 Support

For any issues or questions, customers can:
- Send WhatsApp message
- Use contact form on Support page
- Email support (configure in settings)

## ⚠️ Important Notes

1. **Test your WhatsApp number** before going live
2. **Keep WhatsApp Business** app active to receive orders
3. **Respond quickly** to customer messages
4. **Send download links securely** (use temporary links or password protection)
5. **Keep records** of all transactions
6. **GST is calculated at 18%** (modify in CheckoutPage if needed)

## 🚀 Going Live

1. Update `SELLER_WHATSAPP` in `/data/products.ts`
2. Change admin credentials in `/pages/AdminPage.tsx`
3. Add your actual product details
4. Upload product images (use real URLs)
5. Test the complete order flow
6. Set up WhatsApp Business account
7. Deploy your site

## 📄 License

MIT License - Feel free to use for your digital store!
