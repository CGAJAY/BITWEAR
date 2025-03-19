// src/app/cart/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Unix T-Shirt', price: 199.99, quantity: 1, image: '/images/unix.jpg' },
    { id: 2, name: 'Nasa Cap', price: 149.99, quantity: 2, image: '/images/nasa.jpg' },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax; adjust as needed
  const delivery = subtotal > 100 ? 0 : 10; // Free delivery over $100, else $10
  const total = (subtotal + tax + delivery).toFixed(2);

  return (
    <section className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-black flex items-center gap-2 mb-4 sm:mb-0">
            <ShoppingBag size={32} className="text-black" />
            Cart
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-black hover:text-black/70 transition text-base sm:text-lg font-medium"
          >
            <ArrowLeft size={32}  />
            Continue Shopping
          </Link>
        </div>

        {/* Main Content */}
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black/70 text-base sm:text-lg mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-black text-white py-2 px-6 sm:py-3 sm:px-8 rounded-md font-medium text-sm sm:text-base hover:bg-black/80 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Your Bag Section */}
            <div className="lg:col-span-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">Your Bag</h2>
              <div className="bg-white border border-black/10 rounded-lg shadow-sm">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 sm:space-x-4 border-b border-black/10 pb-4 sm:pb-6 last:border-b-0"
                    >
                      <div className="relative w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 space-y-1 sm:space-y-2">
                        <Link href={`/items/${item.id}`} className="hover:text-black/70 transition">
                          <p className="text-black font-medium text-base sm:text-lg">{item.name}</p>
                        </Link>
                        <p className="text-black/70 text-xs sm:text-sm">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 sm:p-2 hover:bg-black/5 rounded-md transition"
                          >
                            <Minus size={32}  />
                          </button>
                          <span className="text-black font-medium text-base sm:text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 sm:p-2 hover:bg-black/5 rounded-md transition"
                          >
                            <Plus size={32}  />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4">
                        <p className="text-black font-medium text-base sm:text-lg">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-black hover:text-red-500 transition"
                        >
                          <Trash2 size={32}  />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">Order Summary</h2>
              <div className="bg-white border border-black/10 rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
                <div className="flex justify-between text-black/70 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black/70 text-sm sm:text-base">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-black/70 text-sm sm:text-base">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-black font-semibold text-base sm:text-lg border-t border-black/10 pt-4">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-yellow-500 text-black py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base text-center hover:bg-yellow-600 transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}