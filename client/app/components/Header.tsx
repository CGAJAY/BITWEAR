'use client';
import { useState } from 'react';
import { Menu, X, Search, User, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="bg-white text-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Bitwear
            </Link>
          </div>

          {/* Center: Navigation Links (Hidden on mobile) */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-600 transition">
              Home
            </Link>
            <Link href="/shop" className="hover:text-gray-600 transition">
              Shop
            </Link>
            <Link href="/about" className="hover:text-gray-600 transition">
              About
            </Link>
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center space-x-4">

            {/* Search button (hidden on mobile)*/}
            <div className="hidden lg:flex items-center bg-gray-100 text-black rounded-2xl px-2 py-2">
              <input
                type="text"
                placeholder="Search Bitwear..."
                className="bg-transparent outline-none text-sm w-32 lg:w-48"
              />
              <Search size={20} className="ml-2" />
            </div>


            {/*Search button (hidden on lg devices) */}
            <button
              className="lg:hidden p-2 hover:text-gray-600 transition"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>

            {/* Visible on all devices */}
            <Link href="/cart" className="p-2 hover:text-gray-600 transition bg-amber-300">
              <ShoppingBag size={20} />
            </Link>

            <Link href="/liked" className="p-2 hover:text-gray-600 transition">
              <Heart size={20} />
            </Link>

            <Link href="/profile" className="p-2 hover:text-gray-600 transition">
              <User size={20} />
            </Link>
            {/* Hamburger Menu Button (Visible on mobile) */}
            <button
              className="md:hidden p-2 hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(true)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu (Covers entire screen, including header) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-in">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <span className="text-2xl font-bold">Bitwear</span>
            <button
              className="p-2 hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 p-4 text-lg">
            <Link
              href="/"
              className="hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}

      {/* Mobile Search Overlay (Covers entire screen, including header) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center animate-slide-in">
          <button
            className="absolute top-4 right-4 p-2 text-black hover:text-gray-600 transition"
            onClick={() => setIsSearchOpen(false)}
          >
            <X size={28} />
          </button>
          <div className="w-full max-w-md px-4">
            <div className="flex items-center bg-gray-100 text-black rounded-md p-2">
              <Search size={24} className="mr-2" />
              <input
                type="text"
                placeholder="Search Bitwear..."
                className="bg-transparent outline-none text-lg w-full"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}