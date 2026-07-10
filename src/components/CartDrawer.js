'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { handleImageError } from '../utils/images';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [sending, setSending] = useState(false);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(price);
  };

  const handleSendQuote = async (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setClientName('');
      const input = document.getElementById('client-name');
      input?.focus();
      input?.classList.add('border-red-500/50', 'focus:border-red-500');
      setTimeout(() => input?.classList.remove('border-red-500/50', 'focus:border-red-500'), 2000);
      return;
    }

    setSending(true);

    const sellerNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523310644238';
    
    let message = `*JC23 ARMY - Nueva Solicitud de Cotización*\n\n`;
    message += `*Cliente:* ${clientName.trim()}\n`;
    if (clientPhone.trim()) {
      message += `*Teléfono:* ${clientPhone.trim()}\n`;
    }
    if (clientNotes.trim()) {
      message += `*Notas:* ${clientNotes.trim()}\n`;
    }
    message += `\n*Detalle del Pedido:*\n`;
    message += `───────────────────\n`;

    cart.forEach((item) => {
      message += `• *${item.quantity}x* ${item.name}\n  _Cat: ${item.category}_ | _Unit: ${formatPrice(item.price)}_\n\n`;
    });

    message += `───────────────────\n`;
    message += `*Total Estimado:* ${formatPrice(cartTotal)}\n\n`;
    message += `_Enviado desde el Catálogo Web de JC23 ARMY._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setTimeout(() => setSending(false), 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isOpen ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'
        }`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`relative flex h-full w-full max-w-md flex-col bg-zinc-950 border-l border-zinc-800 shadow-2xl transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white">Tu Cotización</h2>
            <span className="rounded-full bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400 font-semibold">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 transition-all duration-200 hover:bg-zinc-900 hover:text-white hover:scale-105 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="rounded-full bg-zinc-900/60 p-4 border border-zinc-800 text-zinc-600">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-300">El carrito está vacío</p>
                <p className="text-xs text-zinc-500 mt-1">Navega por el catálogo y agrega productos para cotizar.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-black transition-all duration-200 hover:bg-amber-400 active:scale-95 hover:shadow-lg hover:shadow-amber-500/20"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="space-y-3">
                {cart.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex gap-3 rounded-xl border border-zinc-900 bg-zinc-900/20 p-3 transition-all duration-300 hover:border-zinc-800/80 hover:bg-zinc-900/40 animate-slide-in-right"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    {/* Thumbnail */}
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-950 border border-zinc-900">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        onError={handleImageError}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col min-w-0">
                      {/* Name & Category */}
                      <div>
                        <h4 className="line-clamp-2 text-xs font-bold text-white leading-snug">{item.name}</h4>
                        <span className="inline-block mt-0.5 rounded-md bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      {/* Description snippet */}
                      {item.description?.trim() && (
                        <p className="text-[10px] text-zinc-500 leading-relaxed mt-1.5 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {/* Specs chips */}
                      {item.specs && Object.keys(item.specs).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {Object.entries(item.specs).slice(0, 3).map(([key, val]) => (
                            <span
                              key={key}
                              className="inline-flex items-center gap-1 rounded-md bg-zinc-900/80 border border-zinc-800/60 px-1.5 py-0.5 text-[9px] text-zinc-300"
                            >
                              <span className="text-amber-500/70 font-semibold uppercase text-[8px]">{key}:</span>
                              <span className="truncate max-w-[80px]">{String(val)}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Unit price, quantity, line total */}
                      <div className="flex items-end justify-between mt-2 pt-1.5 border-t border-zinc-800/40">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-zinc-500">
                            Unit: <span className="text-zinc-300 font-semibold">{formatPrice(item.price)}</span>
                          </span>
                          {/* Quantity controls */}
                          <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 mt-1 transition-all duration-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-zinc-400 transition-all duration-200 hover:text-white hover:bg-zinc-800 rounded active:scale-90"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-white min-w-[20px] text-center select-none tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-zinc-400 transition-all duration-200 hover:text-white hover:bg-zinc-800 rounded active:scale-90"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        {/* Line total & remove */}
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="text-[9px] text-zinc-500 block -mb-0.5">Total</span>
                            <span className="text-sm font-bold text-amber-500 tabular-nums">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-600 transition-all duration-200 hover:text-red-400 hover:scale-110 self-start p-1 active:scale-90 -mr-1"
                            title="Eliminar del carrito"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <div className="border-t border-zinc-900 pt-6 space-y-4 animate-fade-in-up">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tus Datos</h3>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor="client-name" className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Nombre Completo <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="client-name"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:bg-zinc-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="client-phone" className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Celular (Opcional)
                    </label>
                    <input
                      type="tel"
                      id="client-phone"
                      placeholder="Ej. +52 123 456 7890"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:bg-zinc-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="client-notes" className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Notas o Comentarios
                    </label>
                    <textarea
                      id="client-notes"
                      rows={2}
                      placeholder="Ej. Prefiero entrega a domicilio..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:bg-zinc-900 resize-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Sum & Submit */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-800 bg-zinc-950 p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between text-sm font-bold text-white">
              <span>Total Estimado:</span>
              <span className="text-lg text-amber-500">{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="rounded-lg border border-zinc-800 px-4 py-3 text-xs font-semibold text-zinc-500 transition-all duration-200 hover:border-red-500/35 hover:text-red-400 hover:bg-red-950/20 active:scale-95"
              >
                Vaciar
              </button>
              <button
                onClick={handleSendQuote}
                disabled={sending}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-emerald-500 active:scale-[0.98] hover:shadow-lg hover:shadow-emerald-950/30 disabled:opacity-70"
              >
                <Send className={`h-4 w-4 ${sending ? 'animate-spin' : ''}`} />
                <span>{sending ? 'Enviando...' : 'Enviar por WhatsApp'}</span>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500 text-center">
              * El precio total es una estimación. JC23 ARMY confirmará la disponibilidad y el precio final de envío por WhatsApp.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
