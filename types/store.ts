export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  material?: string;
  dimensions?: string;
  color?: string;
  stock: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'active' | 'returned' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'pending_verification';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  items: OrderItem[];
  deliveryType: 'kiosk' | 'villa';
  location: string;
  villaAddress?: string;
  rentalDate: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt?: string;
}
