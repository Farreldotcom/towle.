'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  ShieldCheck,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  MapPin,
  RefreshCw,
  Search,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';
import { Product, Order, OrderStatus, PaymentStatus } from '@/types/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, profile, isAdmin, isLoading } = useAuth();
  const {
    products,
    allOrders,
    createProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updatePaymentStatus,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [searchOrder, setSearchOrder] = useState('');

  // Product Form Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState(50000);
  const [prodCategory, setProdCategory] = useState('Towel');
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [prodMaterial, setProdMaterial] = useState('');
  const [prodDimensions, setProdDimensions] = useState('');
  const [prodColor, setProdColor] = useState('');
  const [prodStock, setProdStock] = useState(20);
  const [prodIsActive, setProdIsActive] = useState(true);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // If not admin and not loading, show restricted view
  if (!isLoading && (!user || !isAdmin)) {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto py-24 px-6 text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-error-container/60 text-error mx-auto flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="font-headline-lg text-2xl text-primary font-normal">
            Administrative Access Restricted
          </h1>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            This area is designated exclusively for TOWLE. store operators. Your current account ({user ? user.email : 'guest'}) does not hold verified administrator privileges.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 bg-primary-container text-surface font-label-caps-sm text-xs tracking-widest"
            >
              RETURN TO HOMEPAGE
            </Link>
            {!user && (
              <Link
                href="/login"
                className="px-6 py-2.5 border border-outline-variant/60 font-label-caps-sm text-xs tracking-widest text-primary"
              >
                SIGN IN
              </Link>
            )}
          </div>
        </main>
        <Footer onRentClick={() => {}} onOpenInfoModal={() => {}} />
      </div>
    );
  }

  // KPI Calculations from real Firestore state
  const totalRevenue = allOrders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const totalOrdersCount = allOrders.length;
  const newOrdersCount = allOrders.filter((o) => o.orderStatus === 'confirmed' || o.orderStatus === 'pending').length;
  const activeRentalsCount = allOrders.filter((o) => o.orderStatus === 'active').length;
  const completedReturnsCount = allOrders.filter((o) => o.orderStatus === 'returned').length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const filteredOrders = allOrders.filter((o) => {
    if (orderFilter !== 'all' && o.orderStatus !== orderFilter) return false;
    if (searchOrder.trim()) {
      const q = searchOrder.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.guestName.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setProdName('');
    setProdDesc('');
    setProdPrice(50000);
    setProdCategory('Towel');
    setProdImageUrl(
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8mbEpHNpkx-T2on4YAjoFokcXSpxAL9_WgUOYIusNB7_DPkE21LT-M4F-ja6d-tnWhi_oi6zgEzVegId2hyynJVXWup_EYEaeUYT2ZrxAt5g5ItK1yfHVPAG4UOjR5iIRuEOCZXaCbR307QcuYEpGdMcN6rQa6vULiWJZfzASed_IGS86hp7r5CJ-ROqtOz03wb920vxO3wzMXJsyB7btNbSfKvTxs0WV4s4Vis6oEtcMLMDHXQuddQ'
    );
    setProdMaterial('Organic Waffle Linen');
    setProdDimensions('180cm x 100cm');
    setProdColor('Sand Beige');
    setProdStock(20);
    setProdIsActive(true);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdDesc(prod.description);
    setProdPrice(prod.price);
    setProdCategory(prod.category);
    setProdImageUrl(prod.imageUrl);
    setProdMaterial(prod.material || '');
    setProdDimensions(prod.dimensions || '');
    setProdColor(prod.color || '');
    setProdStock(prod.stock);
    setProdIsActive(prod.isActive);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProduct(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, {
          name: prodName,
          description: prodDesc,
          price: Number(prodPrice),
          category: prodCategory,
          imageUrl: prodImageUrl,
          material: prodMaterial,
          dimensions: prodDimensions,
          color: prodColor,
          stock: Number(prodStock),
          isActive: prodIsActive,
        });
      } else {
        await createProduct({
          name: prodName,
          description: prodDesc,
          price: Number(prodPrice),
          category: prodCategory,
          imageUrl: prodImageUrl,
          material: prodMaterial,
          dimensions: prodDimensions,
          color: prodColor,
          stock: Number(prodStock),
          isActive: prodIsActive,
        });
      }
      setIsProductModalOpen(false);
    } catch (err) {
      console.error('Error saving product:', err);
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-16 py-10 lg:py-16">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-outline-variant/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-label-caps-sm text-[11px] text-secondary tracking-widest uppercase">
                OPERATIONAL CONSOLE
              </span>
              <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-caps-sm text-[10px] tracking-wider border border-secondary/30">
                FIREBASE LIVE
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl text-primary font-normal">
              TOWLE. Store Operations
            </h1>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1 font-light">
              Managing real-time stock, seaside locker fulfillment, and guest reservations in Bali.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="px-4 py-2 border border-outline-variant/60 text-xs font-label-caps-sm tracking-wider text-on-surface hover:text-primary transition-colors"
            >
              VIEW PUBLIC CATALOG
            </Link>
            <button
              onClick={handleOpenCreateProduct}
              className="px-5 py-2 bg-primary-container text-surface text-xs font-label-caps-sm tracking-widest hover:bg-on-surface-variant transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> ADD NEW TOWEL
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex border-b border-outline-variant/30 mb-8 space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-label-caps-lg text-xs tracking-wider transition-colors border-b-2 -mb-[1px] cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> OVERVIEW &amp; KPIS
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 font-label-caps-lg text-xs tracking-wider transition-colors border-b-2 -mb-[1px] cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> ORDERS &amp; FULFILLMENT ({allOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 font-label-caps-lg text-xs tracking-wider transition-colors border-b-2 -mb-[1px] cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <Package className="w-4 h-4" /> CATALOG INVENTORY ({products.length})
          </button>
        </div>

        {/* VIEW 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Revenue */}
              <div className="p-6 bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
                <span className="font-label-caps-sm text-[10px] text-on-surface-variant tracking-wider uppercase block mb-2">
                  TOTAL TRANSACTION VALUE
                </span>
                <div className="font-display-lg text-2xl lg:text-3xl text-primary font-normal tabular-nums">
                  Rp{totalRevenue.toLocaleString('id-ID')}
                </div>
                <span className="font-body-sm text-[11px] text-secondary mt-1 block">
                  From {totalOrdersCount} active customer rentals
                </span>
              </div>

              {/* Card 2: New Orders */}
              <div className="p-6 bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
                <span className="font-label-caps-sm text-[10px] text-on-surface-variant tracking-wider uppercase block mb-2">
                  PENDING / NEW PASSES
                </span>
                <div className="font-display-lg text-2xl lg:text-3xl text-secondary font-normal tabular-nums">
                  {newOrdersCount}
                </div>
                <span className="font-body-sm text-[11px] text-on-surface-variant mt-1 block">
                  Awaiting locker pickup or villa drop
                </span>
              </div>

              {/* Card 3: Active Rentals */}
              <div className="p-6 bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
                <span className="font-label-caps-sm text-[10px] text-on-surface-variant tracking-wider uppercase block mb-2">
                  ACTIVE ON BEACHES
                </span>
                <div className="font-display-lg text-2xl lg:text-3xl text-primary font-normal tabular-nums">
                  {activeRentalsCount}
                </div>
                <span className="font-body-sm text-[11px] text-on-surface-variant mt-1 block">
                  Currently out with guests
                </span>
              </div>

              {/* Card 4: Returned */}
              <div className="p-6 bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
                <span className="font-label-caps-sm text-[10px] text-on-surface-variant tracking-wider uppercase block mb-2">
                  COMPLETED &amp; RETURNED
                </span>
                <div className="font-display-lg text-2xl lg:text-3xl text-outline font-normal tabular-nums">
                  {completedReturnsCount}
                </div>
                <span className="font-body-sm text-[11px] text-on-surface-variant mt-1 block">
                  Laundered &amp; renewed in Bali
                </span>
              </div>
            </div>

            {/* Low stock alerts if any */}
            {lowStockProducts.length > 0 && (
              <div className="p-4 bg-error-container/30 border border-error/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-error shrink-0" />
                  <div>
                    <span className="font-headline-sm text-xs text-error font-medium block">
                      Low Inventory Warning ({lowStockProducts.length} item{lowStockProducts.length > 1 ? 's' : ''})
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      {lowStockProducts.map((p) => `${p.name} (${p.stock} left)`).join(' · ')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-3 py-1 bg-surface border border-outline-variant/40 text-[11px] font-label-caps-sm"
                >
                  MANAGE STOCK
                </button>
              </div>
            )}

            {/* Recent Orders Preview */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/30">
                <h3 className="font-headline-sm text-lg text-primary font-medium">
                  Recent Beach Reservations
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="font-body-sm text-xs text-secondary hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              {allOrders.length === 0 ? (
                <div className="text-center py-8 text-xs text-on-surface-variant">
                  No orders recorded yet. As customers book via the web app, transactions appear here in real-time.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-body-sm">
                    <thead>
                      <tr className="border-b border-outline-variant/30 text-on-surface-variant font-label-caps-sm text-[10px]">
                        <th className="pb-3">PASS #</th>
                        <th className="pb-3">GUEST</th>
                        <th className="pb-3">HUB / BEACH</th>
                        <th className="pb-3">ITEMS</th>
                        <th className="pb-3">TOTAL</th>
                        <th className="pb-3">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {allOrders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-surface-variant/30">
                          <td className="py-3 font-semibold text-primary">{o.orderNumber}</td>
                          <td className="py-3">
                            <div>{o.guestName}</div>
                            <span className="text-[10px] text-on-surface-variant">{o.guestPhone}</span>
                          </td>
                          <td className="py-3">{o.location}</td>
                          <td className="py-3">
                            {o.items.map((it) => `${it.name} (×${it.quantity})`).join(', ')}
                          </td>
                          <td className="py-3 font-medium tabular-nums">
                            Rp{o.totalAmount.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 text-[9px] uppercase font-label-caps-sm border bg-surface-container">
                              {o.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-container-lowest p-4 border border-outline-variant/40">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Search className="w-4 h-4 text-outline" />
                <input
                  type="text"
                  placeholder="Filter by pass number or guest..."
                  value={searchOrder}
                  onChange={(e) => setSearchOrder(e.target.value)}
                  className="bg-transparent text-xs p-1 text-primary focus:outline-none w-full sm:w-64"
                />
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {['all', 'confirmed', 'active', 'returned', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1 text-[10px] font-label-caps-sm uppercase border transition-colors ${
                      orderFilter === st
                        ? 'bg-primary-container text-surface border-primary-container'
                        : 'bg-surface border-outline-variant/40 text-on-surface hover:border-primary'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 overflow-hidden shadow-sm">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-xs text-on-surface-variant">
                  No orders matching the selected filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-body-sm">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant/30 text-on-surface-variant font-label-caps-sm text-[10px]">
                        <th className="p-4">ORDER PASS</th>
                        <th className="p-4">GUEST &amp; CONTACT</th>
                        <th className="p-4">BEACH / HUB</th>
                        <th className="p-4">RENTAL DATE</th>
                        <th className="p-4">ITEMS</th>
                        <th className="p-4">TOTAL</th>
                        <th className="p-4">FULFILLMENT STATUS</th>
                        <th className="p-4">PAYMENT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-surface-variant/20">
                          <td className="p-4 font-semibold text-primary">
                            <div>{ord.orderNumber}</div>
                            <span className="text-[10px] text-outline font-normal">
                              {new Date(ord.createdAt).toLocaleDateString('en-GB')}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-medium">{ord.guestName}</div>
                            <div className="text-[11px] text-secondary">{ord.guestPhone}</div>
                            {ord.villaAddress && (
                              <div className="text-[10px] text-on-surface-variant italic truncate max-w-[150px]">
                                {ord.villaAddress}
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="font-medium">{ord.location}</span>
                            <span className="text-[10px] text-outline block uppercase">
                              {ord.deliveryType}
                            </span>
                          </td>
                          <td className="p-4">{ord.rentalDate}</td>
                          <td className="p-4">
                            <ul className="space-y-0.5">
                              {ord.items.map((it, i) => (
                                <li key={i}>
                                  {it.name} <strong className="text-primary">×{it.quantity}</strong>
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="p-4 font-semibold tabular-nums">
                            Rp{ord.totalAmount.toLocaleString('id-ID')}
                          </td>
                          <td className="p-4">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) =>
                                updateOrderStatus(ord.id, e.target.value as OrderStatus)
                              }
                              className="p-1.5 bg-surface border border-outline-variant/40 text-[11px] font-medium rounded-none focus:outline-none focus:border-primary uppercase"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="active">Active (On Beach)</option>
                              <option value="returned">Returned</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <select
                              value={ord.paymentStatus}
                              onChange={(e) =>
                                updatePaymentStatus(ord.id, e.target.value as PaymentStatus)
                              }
                              className={`p-1.5 bg-surface border border-outline-variant/40 text-[11px] font-medium rounded-none focus:outline-none focus:border-primary uppercase ${
                                ord.paymentStatus === 'paid' ? 'text-secondary' : 'text-on-surface-variant'
                              }`}
                            >
                              <option value="unpaid">Unpaid</option>
                              <option value="paid">Paid</option>
                              <option value="pending_verification">Pending Verify</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: PRODUCTS INVENTORY */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center bg-surface-container-lowest p-4 border border-outline-variant/40">
              <span className="text-xs font-body-sm text-on-surface-variant">
                Managing {products.length} catalog items stored in Cloud Firestore.
              </span>
              <button
                onClick={handleOpenCreateProduct}
                className="px-4 py-2 bg-primary-container text-surface text-xs font-label-caps-sm tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> ADD PRODUCT
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-surface-container-lowest border border-outline-variant/40 p-5 flex flex-col justify-between shadow-sm relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 bg-secondary-container/70 text-on-secondary-container text-[10px] font-label-caps-sm uppercase">
                        {prod.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[9px] font-label-caps-sm uppercase border ${
                          prod.isActive
                            ? 'bg-surface text-secondary border-secondary/30'
                            : 'bg-surface-container-high text-outline border-outline-variant/40'
                        }`}
                      >
                        {prod.isActive ? 'Active' : 'Draft'}
                      </span>
                    </div>

                    <div className="aspect-[4/3] bg-surface-container-low p-4 mb-4 flex items-center justify-center border border-outline-variant/20">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="max-h-36 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <h4 className="font-headline-sm text-base text-primary font-medium mb-1">
                      {prod.name}
                    </h4>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mb-3">
                      {prod.description}
                    </p>

                    <div className="flex justify-between items-center text-xs border-t border-outline-variant/20 pt-3">
                      <div>
                        <span className="text-outline text-[10px] block">RENTAL RATE</span>
                        <span className="font-semibold text-primary tabular-nums">
                          Rp{prod.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-outline text-[10px] block">STOCK</span>
                        <span
                          className={`font-semibold tabular-nums ${
                            prod.stock <= 5 ? 'text-error' : 'text-primary'
                          }`}
                        >
                          {prod.stock} units
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-outline-variant/20 flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditProduct(prod)}
                      className="px-3 py-1.5 border border-outline-variant/50 text-[11px] font-label-caps-sm text-primary hover:border-primary flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" /> EDIT
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id, prod.name)}
                      className="px-3 py-1.5 border border-error/40 text-[11px] font-label-caps-sm text-error hover:bg-error-container/20 flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Add / Edit Modal */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
            <div
              onClick={() => setIsProductModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            ></div>

            <div className="relative w-full max-w-lg bg-surface border border-outline-variant/50 shadow-2xl p-6 sm:p-8 animate-in fade-in duration-200">
              <h3 className="font-headline-sm text-lg text-primary font-medium mb-1">
                {editingProduct ? 'Edit Towel Item' : 'Add New Product'}
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant mb-5">
                Update catalog items and inventory in Firestore.
              </p>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-label-caps-sm text-on-surface-variant mb-1">
                    PRODUCT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-label-caps-sm text-on-surface-variant mb-1">
                      PRICE (IDR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-label-caps-sm text-on-surface-variant mb-1">
                      STOCK UNITS *
                    </label>
                    <input
                      type="number"
                      required
                      value={prodStock}
                      onChange={(e) => setProdStock(Number(e.target.value))}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-label-caps-sm text-on-surface-variant mb-1">
                      CATEGORY
                    </label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                    >
                      <option value="Towel">Towel</option>
                      <option value="Pillow">Pillow</option>
                      <option value="Package">Package</option>
                      <option value="Accessory">Accessory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-label-caps-sm text-on-surface-variant mb-1">
                      STATUS
                    </label>
                    <select
                      value={prodIsActive ? 'active' : 'draft'}
                      onChange={(e) => setProdIsActive(e.target.value === 'active')}
                      className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                    >
                      <option value="active">Active (Published)</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-label-caps-sm text-on-surface-variant mb-1">
                    IMAGE URL
                  </label>
                  <input
                    type="url"
                    required
                    value={prodImageUrl}
                    onChange={(e) => setProdImageUrl(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-label-caps-sm text-on-surface-variant mb-1">
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-label-caps-sm text-on-surface-variant mb-1">
                      MATERIAL
                    </label>
                    <input
                      type="text"
                      value={prodMaterial}
                      onChange={(e) => setProdMaterial(e.target.value)}
                      placeholder="Waffle Linen"
                      className="w-full p-2 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-label-caps-sm text-on-surface-variant mb-1">
                      DIMENSIONS
                    </label>
                    <input
                      type="text"
                      value={prodDimensions}
                      onChange={(e) => setProdDimensions(e.target.value)}
                      placeholder="180x100cm"
                      className="w-full p-2 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-label-caps-sm text-on-surface-variant mb-1">
                      COLOR
                    </label>
                    <input
                      type="text"
                      value={prodColor}
                      onChange={(e) => setProdColor(e.target.value)}
                      placeholder="Sand Beige"
                      className="w-full p-2 bg-surface-container-lowest border border-outline-variant/50 text-xs text-primary"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2 border-t border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 border border-outline-variant/40 text-xs font-label-caps-sm"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProduct}
                    className="px-6 py-2 bg-primary-container text-surface text-xs font-label-caps-sm tracking-widest disabled:opacity-50"
                  >
                    {isSavingProduct ? 'SAVING...' : 'SAVE PRODUCT'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer onRentClick={() => {}} onOpenInfoModal={() => {}} />
    </div>
  );
}
