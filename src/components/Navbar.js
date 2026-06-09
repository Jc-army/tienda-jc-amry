'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, Crosshair } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onOpenCart }) {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Crosshair className="h-7 w-7 text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
              <span className="text-xl font-black tracking-wider text-white">
                JC23 <span className="text-amber-500">ARMY</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium text-zinc-300 transition-colors hover:text-amber-500">
              Inicio
            </Link>
            <Link href="/catalog" className="text-sm font-medium text-zinc-300 transition-colors hover:text-amber-500">
              Catálogo
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-zinc-300 transition-colors hover:text-amber-500">
              ¿Cómo Cotizar?
            </Link>
          </div>

          {/* Search bar & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative w-64">
              <input
                type="text"
                placeholder="Buscar armas, miras, diábolos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-zinc-800 bg-zinc-900/60 py-1.5 pl-4 pr-10 text-xs text-white placeholder-zinc-500 transition-all focus:border-amber-500/80 focus:bg-zinc-900 focus:outline-none focus:ring-1 focus:ring-amber-500/55"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-500">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <button
              onClick={onOpenCart}
              className="relative rounded-full border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-300 transition-all hover:border-amber-500/50 hover:bg-zinc-900 hover:text-amber-500"
              aria-label="Carrito de Cotización"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Cart Buttons */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenCart}
              className="relative rounded-full border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-300 hover:text-amber-500"
              aria-label="Carrito de Cotización"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-300 hover:text-amber-500"
              aria-label="Menu Principal"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-800/80 bg-zinc-950 px-4 py-4 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-2 pl-4 pr-10 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <Search className="h-5 w-5" />
            </button>
          </form>
          <div className="flex flex-col space-y-3 pl-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-300 hover:text-amber-500"
            >
              Inicio
            </Link>
            <Link
              href="/catalog"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-300 hover:text-amber-500"
            >
              Catálogo
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-300 hover:text-amber-500"
            >
              ¿Cómo Cotizar?
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
