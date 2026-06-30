'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { handleImageError } from '../utils/images';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

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
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/30 transition-all duration-500 hover:-translate-y-1.5 hover:border-zinc-700/60 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-black/40 active:translate-y-0">
      
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="relative block aspect-square w-full overflow-hidden bg-zinc-950">
        {/* Skeleton loader */}
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}

        <img
          src={product.image_url}
          alt={product.name}
          className={`h-full w-full object-contain p-4 transition-all duration-700 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={handleImageError}
        />
        
        {/* Overlay Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-700 text-white transition-all duration-300 hover:bg-amber-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95">
            <Eye className="h-5 w-5" />
          </span>
        </div>

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-md bg-zinc-950/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-sm border border-amber-500/15 transition-all duration-300 group-hover:bg-amber-500/15 group-hover:border-amber-500/30">
          {product.category}
        </span>

        {/* Added confirmation badge */}
        {added && (
          <span className="absolute right-3 top-3 rounded-md bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 backdrop-blur-sm animate-bounce-in">
            <Check className="h-3 w-3 inline mr-0.5" /> ¡Agregado!
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <Link href={`/product/${product.id}`} className="group/title">
          <h3 className="line-clamp-2 text-sm font-semibold text-white leading-tight transition-colors duration-200 group-hover/title:text-amber-500">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-xs text-zinc-500 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Add to Cart */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-800/50">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">Precio</span>
            <span className="text-base font-bold text-amber-500 transition-all duration-300 group-hover:text-amber-400">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddClick}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-300 active:scale-95 ${
              added
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'border-zinc-800 bg-zinc-850 text-zinc-200 hover:bg-amber-500 hover:text-black hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/15'
            }`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5 animate-bounce-in" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
