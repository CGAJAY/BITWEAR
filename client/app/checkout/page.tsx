// src/app/checkout/page.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, ArrowLeft, Smartphone } from 'lucide-react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const [cartItems] = useState<CartItem[]>([
    { id: 1, name: 'Unix T-Shirt', price: 199.99, quantity: 1, image: '/images/unix.jpg' },
    { id: 2, name: 'Nasa Cap', price: 149.99, quantity: 2, image: '/images/nasa.jpg' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    mpesaPhone: '',
    deliveryOption: 'standard',
    paymentMethod: 'visa', // Default to Visa
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryCost = formData.deliveryOption === 'standard' ? 10 : 20;
  const total = (subtotal + tax + (cartItems.length > 0 ? deliveryCost : 0)).toFixed(2);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zip || !/^\d{5}$/.test(formData.zip)) newErrors.zip = 'Valid ZIP (5 digits) is required';

    if (formData.paymentMethod === 'visa') {
      if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, '')))
        newErrors.cardNumber = 'Valid 16-digit card number is required';
      if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry))
        newErrors.expiry = 'Valid expiry (MM/YY) is required';
      if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'Valid 3-digit CVV is required';
    } else if (formData.paymentMethod === 'mpesa') {
      if (!formData.mpesaPhone || !/^\d{10}$/.test(formData.mpesaPhone))
        newErrors.mpesaPhone = 'Valid 10-digit phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (formData.paymentMethod === 'visa') {
        console.log('Visa Payment Submitted:', { formData, cartItems, total });
        // Integrate with Visa payment gateway (e.g., Stripe)
      } else if (formData.paymentMethod === 'mpesa') {
        console.log('M-Pesa Payment Initiated:', { phone: formData.mpesaPhone, amount: total });
        alert(`Payment request sent to ${formData.mpesaPhone}. Please check your phone to confirm.`);
      }
    }
  };

  return (
    <section className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-black">Checkout</h1>
          <Link
            href="/cart"
            className="flex items-center gap-2 text-black hover:text-black/70 transition text-base sm:text-lg font-medium"
          >
            <ArrowLeft size={16}  />
            Back to Cart
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">Shipping & Payment</h2>
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-lg shadow-sm p-4 sm:p-6 space-y-6">
              {/* Shipping Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Shipping Information</h3>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                    rows={3}
                    required
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                      required
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                      required
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">ZIP Code</label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                      required
                    />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Delivery Options</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="standard"
                      checked={formData.deliveryOption === 'standard'}
                      onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
                      className="text-black focus:ring-black"
                    />
                    <span className="text-black text-sm">Standard ($10)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="express"
                      checked={formData.deliveryOption === 'express'}
                      onChange={(e) => setFormData({ ...formData, deliveryOption: e.target.value })}
                      className="text-black focus:ring-black"
                    />
                    <span className="text-black text-sm">Express ($20)</span>
                  </label>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">Payment Method</h3>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="visa"
                      checked={formData.paymentMethod === 'visa'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="text-black focus:ring-black"
                    />
                    <CreditCard size={20} className="text-black" />
                    <span className="text-black text-sm font-medium">Visa Card</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mpesa"
                      checked={formData.paymentMethod === 'mpesa'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="text-black focus:ring-black"
                    />
                    <Smartphone size={20} className="text-black" />
                    <span className="text-black text-sm font-medium">M-Pesa</span>
                  </label>
                </div>

                {/* Visa Payment Fields */}
                {formData.paymentMethod === 'visa' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Expiry</label>
                        <input
                          type="text"
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                          placeholder="MM/YY"
                          required
                        />
                        {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">CVV</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                          required
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* M-Pesa Payment Fields */}
                {formData.paymentMethod === 'mpesa' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">M-Pesa Phone Number</label>
                      <input
                        type="text"
                        value={formData.mpesaPhone}
                        onChange={(e) => setFormData({ ...formData, mpesaPhone: e.target.value })}
                        className="w-full p-3 rounded-md border border-black/20 focus:border-black text-black"
                        placeholder="e.g., 0712345678"
                        required
                      />
                      {errors.mpesaPhone && <p className="text-red-500 text-xs mt-1">{errors.mpesaPhone}</p>}
                    </div>
                    <p className="text-black/70 text-xs sm:text-sm">
                      You’ll receive a payment prompt on your phone to confirm the transaction.
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6">Order Summary</h2>
            <div className="bg-white border border-black/10 rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded-md" />
                  </div>
                  <div className="flex-1">
                    <p className="text-black font-medium text-sm sm:text-base">{item.name}</p>
                    <p className="text-black/70 text-xs sm:text-sm">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-black font-medium text-sm sm:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="space-y-2 pt-4 border-t border-black/10">
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
                  <span>{cartItems.length > 0 ? `$${deliveryCost.toFixed(2)}` : 'Free'}</span>
                </div>
                <div className="flex justify-between text-black font-semibold text-base sm:text-lg">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-yellow-500 text-black py-3 rounded-md font-medium hover:bg-yellow-600 transition-all flex items-center justify-center gap-2"
              >
                {formData.paymentMethod === 'visa' ? (
                  <CreditCard size={20}  />
                ) : (
                  <Smartphone size={20}  />
                )}
                {formData.paymentMethod === 'visa' ? 'Pay Now' : 'Pay with M-Pesa'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}