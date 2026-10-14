'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { useAuth } from './AuthContext';
import { Product, CartItem, Order, OrderStatus, PaymentStatus } from '@/types/store';

interface StoreContextType {
  products: Product[];
  isLoadingProducts: boolean;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Promise<string>;
  myOrders: Order[];
  isLoadingOrders: boolean;
  // Admin specific
  allOrders: Order[];
  createProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => Promise<void>;
  seedDefaultProducts: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    name: 'TOWLE. Original Beach Towel',
    description: 'The signature beach towel with built-in ergonomic inflatable pillow pocket, hidden sealed zipper compartment, and ultra-absorbent waffle linen weave.',
    price: 50000,
    category: 'Towel',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8mbEpHNpkx-T2on4YAjoFokcXSpxAL9_WgUOYIusNB7_DPkE21LT-M4F-ja6d-tnWhi_oi6zgEzVegId2hyynJVXWup_EYEaeUYT2ZrxAt5g5ItK1yfHVPAG4UOjR5iIRuEOCZXaCbR307QcuYEpGdMcN6rQa6vULiWJZfzASed_IGS86hp7r5CJ-ROqtOz03wb920vxO3wzMXJsyB7btNbSfKvTxs0WV4s4Vis6oEtcMLMDHXQuddQ',
    material: 'Waffle Organic Linen & Long-staple Cotton',
    dimensions: '180cm x 100cm',
    color: 'Sand Beige & Ivory',
    stock: 45,
    isActive: true,
  },
  {
    name: 'TOWLE. Aerolight Dune Edition',
    description: 'Special aerolight weave engineered for rapid 15-minute coastal drying with integrated contoured cervical neck pocket.',
    price: 60000,
    category: 'Towel',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8mbEpHNpkx-T2on4YAjoFokcXSpxAL9_WgUOYIusNB7_DPkE21LT-M4F-ja6d-tnWhi_oi6zgEzVegId2hyynJVXWup_EYEaeUYT2ZrxAt5g5ItK1yfHVPAG4UOjR5iIRuEOCZXaCbR307QcuYEpGdMcN6rQa6vULiWJZfzASed_IGS86hp7r5CJ-ROqtOz03wb920vxO3wzMXJsyB7btNbSfKvTxs0WV4s4Vis6oEtcMLMDHXQuddQ',
    material: '100% Fine Turkish Linen',
    dimensions: '190cm x 105cm',
    color: 'Dune Ecru',
    stock: 28,
    isActive: true,
  },
  {
    name: 'Extra Ergonomic Inflatable Pillow',
    description: 'Rapid 3-second valve inflatable cervical neck cushion. Soft flocking finish for sublime beach resting.',
    price: 15000,
    category: 'Pillow',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8mbEpHNpkx-T2on4YAjoFokcXSpxAL9_WgUOYIusNB7_DPkE21LT-M4F-ja6d-tnWhi_oi6zgEzVegId2hyynJVXWup_EYEaeUYT2ZrxAt5g5ItK1yfHVPAG4UOjR5iIRuEOCZXaCbR307QcuYEpGdMcN6rQa6vULiWJZfzASed_IGS86hp7r5CJ-ROqtOz03wb920vxO3wzMXJsyB7btNbSfKvTxs0WV4s4Vis6oEtcMLMDHXQuddQ',
    material: 'TPU Eco-polymer with velvet touch',
    dimensions: '38cm x 26cm',
    color: 'Slate Mist',
    stock: 60,
    isActive: true,
  },
  {
    name: 'Coastal Sunset Couple Pack',
    description: 'Two premium TOWLE. towels, two ergonomic pillows, and complimentary villa delivery with chilled coconut water.',
    price: 120000,
    category: 'Package',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw7YhSG8b1Ms_2FZmQc08TVILBh6gf0QeDtH8f9sHAsyO5pQ-x6MhwgG1lubYgUC8x_zCKnUxf-xEaFSQJWSEDuvHGhc0CjjidV6XLo04ZiruqxbMZLlaEmppj-xUG6ueus7T6ptvPRi3Gp7OK213PXvCt2c-LJIExQkZx6Yx0WQkzS0C2EAJZTkkeIQNGv2w2Ky7Lf1xWZw_73gviMpDYM_p22K238RAa5p4V4yByYUjyl8tf5B3myQ',
    material: 'Linen Set & Dual Cushions',
    dimensions: '2x Full Sets',
    color: 'Natural Coast',
    stock: 20,
    isActive: true,
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const seedDefaultProducts = async () => {
    try {
      for (let i = 0; i < DEFAULT_PRODUCTS.length; i++) {
        const item = DEFAULT_PRODUCTS[i];
        const docId = `product-${i + 1}`;
        await setDoc(doc(db, 'products', docId), {
          ...item,
          id: docId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Auto-seed products note:', err);
    }
  };

  // Sync products from Firestore
  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsub = onSnapshot(
      productsRef,
      (snapshot) => {
        const loaded: Product[] = [];
        snapshot.forEach((d) => {
          loaded.push({ id: d.id, ...d.data() } as Product);
        });

        if (loaded.length === 0) {
          seedDefaultProducts();
        } else {
          setProducts(loaded);
          setIsLoadingProducts(false);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
        setIsLoadingProducts(false);
      }
    );

    return () => unsub();
  }, []);

  // Sync customer's orders
  useEffect(() => {
    if (!user) return;
    const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
    const unsub = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const loaded: Order[] = [];
        snapshot.forEach((d) => {
          loaded.push({ id: d.id, ...d.data() } as Order);
        });
        loaded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMyOrders(loaded);
        setIsLoadingOrders(false);
      },
      (error) => {
        console.error('Error fetching customer orders:', error);
        setIsLoadingOrders(false);
      }
    );

    return () => unsub();
  }, [user]);

  // Sync admin's all orders
  useEffect(() => {
    if (!isAdmin) return;
    const ordersRef = collection(db, 'orders');
    const unsub = onSnapshot(
      ordersRef,
      (snapshot) => {
        const loaded: Order[] = [];
        snapshot.forEach((d) => {
          loaded.push({ id: d.id, ...d.data() } as Order);
        });
        loaded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAllOrders(loaded);
      },
      (error) => {
        console.error('Error fetching all orders for admin:', error);
      }
    );

    return () => unsub();
  }, [isAdmin]);

  // Cart logic
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Order creation
  const createOrder = async (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>
  ): Promise<string> => {
    const orderDocId = `ord-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `TWL-${orderData.location.slice(0, 3).toUpperCase()}-${randomSuffix}`;

    const newOrder: Order = {
      ...orderData,
      id: orderDocId,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'orders', orderDocId), newOrder);

      // Decrement product stock if possible
      for (const item of orderData.items) {
        const prod = products.find((p) => p.id === item.productId);
        if (prod && prod.stock >= item.quantity) {
          try {
            await updateDoc(doc(db, 'products', item.productId), {
              stock: prod.stock - item.quantity,
              updatedAt: new Date().toISOString(),
            });
          } catch (e) {
            console.warn('Stock update note:', e);
          }
        }
      }

      clearCart();
      return orderNumber;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `orders/${orderDocId}`);
    }
  };

  // Admin operations
  const createProduct = async (productData: Omit<Product, 'id'>) => {
    const id = `product-${Date.now()}`;
    const newProd: Product = {
      ...productData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'products', id), newProd);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `products/${id}`);
    }
  };

  const updateProduct = async (id: string, partial: Partial<Product>) => {
    try {
      await updateDoc(doc(db, 'products', id), {
        ...partial,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `products/${id}`);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `products/${id}`);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        orderStatus: status,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const updatePaymentStatus = async (orderId: string, status: PaymentStatus) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        paymentStatus: status,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        isLoadingProducts,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        createOrder,
        myOrders,
        isLoadingOrders,
        allOrders,
        createProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        updatePaymentStatus,
        seedDefaultProducts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
