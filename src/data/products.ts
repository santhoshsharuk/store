import productsData from './products.json';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  shortDesc: string;
  thumbnail: string;
  demoVideo?: string;
  screenshots: string[];
  features: string[];
  rating: number;
  reviews: number;
  tags: string[];
  changelog: { version: string; date: string; changes: string[] }[];
  license: { personal: number; commercial: number; extended: number };
  sellerPhone: string;
  isFeatured: boolean;
  isBestseller: boolean;
}

// Seller WhatsApp number (include country code without +)
export const SELLER_WHATSAPP = '918110960489'; // Replace with your actual number

// Load products from JSON file
export const products: Product[] = productsData.products;

export const categories = productsData.categories;
