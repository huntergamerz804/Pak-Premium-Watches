export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Tourbillon & Skeleton' | 'Classic Chronometre' | 'Precious Metals' | 'Integrated Sports' | 'Sport & Chronograph';
  price: number;
  caseSize: string;
  caseMaterial: string;
  movement: string;
  calibre: string;
  powerReserve: string;
  waterResistance: string;
  crystal: string;
  strap: string;
  warranty: string;
  limitedEdition?: string;
  description: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  primaryImage: string;
  galleryImages: string[];
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedStrap?: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  city: string;
  watchModel: string;
  year: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
