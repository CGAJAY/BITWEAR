// src/components/Footer.tsx
'use client';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-white/80 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">Logo</span>
            </div>
            <span className="ml-3 text-2xl font-bold">BITWEAR</span>
          </div>
          <p className="text-sm opacity-80">
                Tech-driven style for the modern geek.
            </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/shop" className="hover:text-gray-300 transition-all">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300 transition-all">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300 transition-all">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
          <div className="flex items-center space-x-2 mb-2">
            <Mail size={20} />
            <span>support@bitwear.com</span>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-300 transition-all">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-all">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-all">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} BITWEAR. All rights reserved.
      </div>
    </footer>
  );
}