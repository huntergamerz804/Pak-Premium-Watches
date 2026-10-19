import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Testimonial } from '../types';
import { TESTIMONIALS } from '../data/journal';

interface CartContextType {
  cartItems: CartItem[];
  wishlist: string[];
  reviews: Testimonial[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isConciergeOpen: boolean;
  isWatchAnalysisOpen: boolean;
  isCheckoutOpen: boolean;
  isReviewModalOpen: boolean;
  reviewWatchName: string;
  selectedProduct: Product | null;
  selectedArticleId: string | null;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openConcierge: () => void;
  closeConcierge: () => void;
  openWatchAnalysis: () => void;
  closeWatchAnalysis: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  openReviewModal: (watchName?: string) => void;
  closeReviewModal: () => void;
  addReview: (review: { author: string; quote: string; rating?: number; watchModel?: string }) => void;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  openArticleModal: (articleId: string) => void;
  closeArticleModal: () => void;
  addToCart: (product: Product, quantity?: number, selectedStrap?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isOrderPageOpen: boolean;
  orderSelectedProduct: Product | null;
  openOrderPage: (product?: Product) => void;
  closeOrderPage: () => void;
  subtotal: number;
  totalItems: number;
  inventory: Record<string, number>;
  getStock: (productId: string) => number;
  isSoldOut: (productId: string) => boolean;
  deductStock: (items: { id: string; quantity?: number }[], directInventory?: Record<string, number>) => void;
  resetInventory: () => void;
  refreshInventory: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'auren_cart_v1';
const WISHLIST_STORAGE_KEY = 'auren_wishlist_v1';
const REVIEWS_STORAGE_KEY = 'pak_premium_customer_reviews_v1';
const INVENTORY_STORAGE_KEY = 'pak_premium_inventory_v1';

const DEFAULT_INVENTORY: Record<string, number> = {
  'three-in-one-deal': 1,
  'rado-centrix': 1,
  'ladies-rim-watch': 1,
  'pack-of-2-ladies': 1,
  'ladies-model-moving-dial': 1,
  'super-sunday-offer': 1,
  'bestwin-magnetic': 1,
  'tissot-prx-strap': 1,
  'husky-chain-edition': 1,
  'bestwin-arabic-gold': 1,
  'spetson-mesh-chrono': 1,
  'waterproof-sports-digital': 1,
  'cartier-president-skeleton': 1,
  'kezzi-gelflow-duo': 1,
  'curated-trio-bundle': 1,
  'rolex-gold-skeleton': 1,
  'heritage-aviator-trio': 1,
  'ladies-iced-out-rim': 1,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isWatchAnalysisOpen, setIsWatchAnalysisOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewWatchName, setReviewWatchName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isOrderPageOpen, setIsOrderPageOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#order';
  });
  const [orderSelectedProduct, setOrderSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#order') {
        setIsOrderPageOpen(true);
      } else if (window.location.hash !== '#order' && isOrderPageOpen) {
        setIsOrderPageOpen(false);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isOrderPageOpen]);

  const [reviews, setReviews] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  // Inventory Management: Exactly 1 piece available for all watches and deals
  const [inventory, setInventory] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_INVENTORY, ...JSON.parse(saved) };
      }
    } catch {}
    return { ...DEFAULT_INVENTORY };
  });

  const refreshInventory = async () => {
    try {
      const res = await fetch('/api/inventory');
      if (res.ok) {
        const data = await res.json();
        if (data?.inventory) {
          setInventory(prev => {
            const updated = { ...prev, ...data.inventory };
            try {
              localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(updated));
            } catch {}
            return updated;
          });
        }
      }
    } catch {}
  };

  // Sync inventory with server API on mount, focus, and every 10s
  useEffect(() => {
    refreshInventory();

    const handleFocus = () => refreshInventory();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', () => {
      if (!document.hidden) refreshInventory();
    });

    const interval = setInterval(refreshInventory, 10000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const getStock = (productId: string): number => {
    return inventory[productId] !== undefined ? inventory[productId] : 1;
  };

  const isSoldOut = (productId: string): boolean => {
    return getStock(productId) <= 0;
  };

  const deductStock = (
    itemsToDeduct: { id: string; quantity?: number }[],
    directInventory?: Record<string, number>
  ) => {
    setInventory(prev => {
      const updated = directInventory ? { ...prev, ...directInventory } : { ...prev };
      if (!directInventory) {
        for (const it of itemsToDeduct) {
          if (it.id) {
            const cur = updated[it.id] !== undefined ? updated[it.id] : 1;
            const qty = Number(it.quantity) || 1;
            updated[it.id] = Math.max(0, cur - qty);
          }
        }
      }
      try {
        localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save inventory to localStorage', e);
      }
      return updated;
    });
  };

  const resetInventory = () => {
    setInventory({ ...DEFAULT_INVENTORY });
    try {
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(DEFAULT_INVENTORY));
    } catch {}
    fetch('/api/inventory/reset', { method: 'POST' }).catch(() => {});
  };

  const openReviewModal = (watchName?: string) => {
    setReviewWatchName(watchName || '');
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewWatchName('');
  };

  const addReview = (newRev: { author: string; quote: string; rating?: number; watchModel?: string }) => {
    const formattedReview: Testimonial = {
      id: `rev-${Date.now()}`,
      author: newRev.author,
      quote: newRev.quote,
      rating: newRev.rating || 5,
      watchModel: newRev.watchModel,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    setReviews(prev => [formattedReview, ...prev]);
  };

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openConcierge = () => setIsConciergeOpen(true);
  const closeConcierge = () => setIsConciergeOpen(false);

  const openWatchAnalysis = () => setIsWatchAnalysisOpen(true);
  const closeWatchAnalysis = () => setIsWatchAnalysisOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openProductDetail = (product: Product) => setSelectedProduct(product);
  const closeProductDetail = () => setSelectedProduct(null);

  const openOrderPage = (product?: Product) => {
    if (product) {
      setOrderSelectedProduct(product);
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
    setIsOrderPageOpen(true);
    window.location.hash = '#order';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeOrderPage = () => {
    setIsOrderPageOpen(false);
    setOrderSelectedProduct(null);
    if (window.location.hash === '#order') {
      try {
        window.history.pushState(null, '', window.location.pathname);
      } catch {
        window.location.hash = '';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticleModal = (articleId: string) => setSelectedArticleId(articleId);
  const closeArticleModal = () => setSelectedArticleId(null);

  const addToCart = (product: Product, quantity = 1, selectedStrap?: string) => {
    if (isSoldOut(product.id)) {
      return;
    }
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        // Strictly 1 piece available per timepiece
        return prev;
      }
      return [...prev, { product, quantity: 1, selectedStrap: selectedStrap || product.strap }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    // Only 1 piece available for any timepiece
    const maxAllowed = Math.min(1, getStock(productId));
    const safeQty = Math.min(maxAllowed, quantity);
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: safeQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        reviews,
        isCartOpen,
        isSearchOpen,
        isConciergeOpen,
        isWatchAnalysisOpen,
        isCheckoutOpen,
        isReviewModalOpen,
        reviewWatchName,
        selectedProduct,
        selectedArticleId,
        openCart,
        closeCart,
        openSearch,
        closeSearch,
        openConcierge,
        closeConcierge,
        openWatchAnalysis,
        closeWatchAnalysis,
        openCheckout,
        closeCheckout,
        openReviewModal,
        closeReviewModal,
        addReview,
        openProductDetail,
        closeProductDetail,
        openArticleModal,
        closeArticleModal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isOrderPageOpen,
        orderSelectedProduct,
        openOrderPage,
        closeOrderPage,
        subtotal,
        totalItems,
        inventory,
        getStock,
        isSoldOut,
        deductStock,
        resetInventory,
        refreshInventory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
