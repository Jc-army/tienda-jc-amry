'use client';

import React, { useState } from 'react';
import { ShoppingCart, Send, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailsClient({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDirectQuote = () => {
    const sellerNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521234567890';
    const message = `*JC23 ARMY - Consulta de Producto*\n\nHola, me interesa cotizar este producto de inmediato:\n\n• *${quantity}x* ${product.name}\n  _Cal: ${product.category}_\n  _Precio Unitario: ${formatPrice(product.price)}_\n\n¿Tienen disponibilidad y cuánto sería del envío?\n\n_Enlace del producto: ${typeof window !== 'undefined' ? window.location.href : ''}_`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      
      {/* Price */}
      <div className="border-t border-b border-zinc-900 py-4">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Precio estimado</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-black text-amber-500">
            {formatPrice(product.price * quantity)}
          </span>
          {quantity > 1 && (
            <span className="text-xs text-zinc-500">
              ({formatPrice(product.price)} c/u)
            </span>
          )}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">Cantidad</span>
        <div className="flex h-11 w-32 items-center rounded-lg bg-zinc-900 border border-zinc-800 p-1">
          <button
            onClick={handleDecrease}
            className="flex h-full w-10 items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="flex-1 text-center text-sm font-bold text-white">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="flex h-full w-10 items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-all border ${
            added
              ? 'bg-zinc-850 border-emerald-500/30 text-emerald-400'
              : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-850 hover:border-zinc-700'
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              <span>¡Agregado al Carrito!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>Agregar a Cotización</span>
            </>
          )}
        </button>

        <button
          onClick={handleDirectQuote}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-650 hover:bg-emerald-600 py-3 text-sm font-bold text-white transition-colors shadow-md shadow-emerald-950/20"
        >
          <Send className="h-4 w-4" />
          <span>Preguntar por WhatsApp</span>
        </button>
      </div>

    </div>
  );
}
