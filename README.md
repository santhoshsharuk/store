
# DevStore - Modern React E-commerce Platform

A modern, responsive e-commerce platform built with React, TypeScript, and Tailwind CSS featuring a sleek dark theme and comprehensive admin functionality.

## Features

- 🛒 **Complete E-commerce Experience**: Product catalog, cart, checkout
- 🔐 **Admin Authentication**: Secure admin login with protected routes
- 📱 **Mobile-First Design**: Fully responsive with beautiful UI/UX
- 🎨 **Modern Dark Theme**: Professional gradient design
- ⚡ **Fast Performance**: Built with Vite for optimal speed
- 🔧 **Product Management**: Full CRUD operations for products and categories

## Admin Access

- **Login URL**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

Admin routes are protected and hidden from public navigation - access them manually via URL.

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### GitHub Pages Setup

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"

2. **Push to main branch** - the workflow will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages

### Manual Deployment

The GitHub Action workflow (`.github/workflows/deploy.yml`) handles:
- Node.js 18 setup
- Dependency installation
- Project build
- GitHub Pages deployment

Your site will be available at: `https://[username].github.io/[repository-name]`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── data/               # Static data and products
├── pages/              # Route components
├── styles/             # Global styles
└── utils/              # Utility functions
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: Radix UI, Lucide Icons
- **Routing**: React Router
- **State Management**: React Context
- **Deployment**: GitHub Pages, GitHub Actions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.  