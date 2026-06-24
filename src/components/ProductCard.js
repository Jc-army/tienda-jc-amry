'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { handleImageError } from '../utils/images';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700/60 hover:bg-zinc-900/80 hover:shadow-lg hover:shadow-black/50">
      
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-zinc-950">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={handleImageError}
        />
        {/* Overlay Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-amber-500 hover:text-black transition-colors">
            <Eye className="h-5 w-5" />
          </span>
        </div>

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-md bg-zinc-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-500 backdrop-blur-sm border border-amber-500/20">
          {product.category}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <Link href={`/product/${product.id}`} className="group-hover:text-amber-500 transition-colors">
          <h3 className="line-clamp-2 text-sm font-semibold text-white leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Description (brief) */}
        <p className="mt-2 line-clamp-2 text-xs text-zinc-400 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Add to Cart */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-800/60">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Precio</span>
            <span className="text-base font-bold text-amber-500">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-850 border border-zinc-800 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-all hover:bg-amber-500 hover:text-black hover:border-amber-500"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
