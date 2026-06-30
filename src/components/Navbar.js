'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, Crosshair, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCart }) {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const prevCount = useRef(cartCount);
  const router = useRouter();

  // Scroll-aware background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart bump animation when count changes
  useEffect(() => {
    if (cartCount > prevCount.current) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 300);
      prevCount.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'border-b border-transparent bg-zinc-950/70 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Crosshair className="h-7 w-7 text-amber-500 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
                <div className="absolute -inset-1 rounded-full bg-amber-500/0 transition-all duration-500 group-hover:bg-amber-500/20 blur-md" />
              </div>
              <span className="text-xl font-black tracking-wider text-white transition-colors duration-300">
                JC23 <span className="text-amber-500">ARMY</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/catalog', label: 'Catálogo' },
              { href: '/#how-it-works', label: '¿Cómo Cotizar?' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-amber-500 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-amber-500 transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </div>

          {/* Search bar & Cart */}
          <div className="hidden md:flex items-center space-x-3">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input
                type="text"
                placeholder="Buscar armas, miras, diábolos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 rounded-full border border-zinc-800 bg-zinc-900/60 py-1.5 pl-4 pr-10 text-xs text-white placeholder-zinc-500 transition-all duration-300 focus:w-72 focus:border-amber-500/80 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-amber-500/55 group-hover:border-zinc-700"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors duration-200 hover:text-amber-500"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <button
              onClick={onOpenCart}
              className={`relative rounded-full border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-300 transition-all duration-200 hover:border-amber-500/50 hover:bg-zinc-900 hover:text-amber-500 hover:shadow-lg hover:shadow-amber-500/10 ${
                cartBump ? 'animate-cart-bump' : ''
              }`}
              aria-label="Carrito de Cotización"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black shadow-lg shadow-amber-500/30 animate-fade-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Cart Buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenCart}
              className={`relative rounded-full border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-300 transition-all duration-200 hover:text-amber-500 ${
                cartBump ? 'animate-cart-bump' : ''
              }`}
              aria-label="Carrito de Cotización"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black shadow-lg shadow-amber-500/30">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative rounded-full border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-300 transition-all duration-200 hover:text-amber-500 hover:border-amber-500/30"
              aria-label="Menu Principal"
            >
              {isOpen ? (
                <X className="h-5 w-5 animate-rotate-in" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } md:hidden border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl`}
      >
        <div className="px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-2.5 pl-4 pr-12 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors duration-200 hover:text-amber-500"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          <div className="flex flex-col space-y-1">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/catalog', label: 'Catálogo' },
              { href: '/#how-it-works', label: '¿Cómo Cotizar?' },
            ].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-zinc-300 transition-all duration-200 hover:bg-zinc-900 hover:text-amber-500"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
