declare module './products.json' {
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

  export interface Category {
    name: string;
    icon: string;
    count: number;
  }

  export interface ProductData {
    products: Product[];
    categories: Category[];
  }

  const data: ProductData;
  export default data;
}
