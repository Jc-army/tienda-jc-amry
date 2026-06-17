'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');

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

  const handleSendQuote = (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert("Por favor, ingresa tu nombre para personalizar la cotización.");
      return;
    }

    const sellerNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523310644238'; // Default placeholder format (Mexico code + number)
    
    // Construct message
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

    // Open in new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-zinc-950 border-l border-zinc-800 shadow-2xl transition-transform duration-300">
        
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
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-zinc-900/60 p-4 border border-zinc-850 text-zinc-600">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-300">El carrito está vacío</p>
                <p className="text-xs text-zinc-500 mt-1">Navega por el catálogo y agrega productos para cotizar.</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-black hover:bg-amber-400 transition-colors"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-zinc-900 bg-zinc-900/20 p-3 hover:border-zinc-800/80 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-950 border border-zinc-900">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="line-clamp-1 text-xs font-bold text-white">{item.name}</h4>
                        <p className="text-[10px] text-zinc-500">{item.category}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center rounded-lg bg-zinc-900 border border-zinc-800 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-bold text-amber-500">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-600 hover:text-red-400 self-start p-1 transition-colors"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Checkout Form */}
              <div className="border-t border-zinc-900 pt-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Tus Datos</h3>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor="client-name" className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="client-name"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
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
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="client-notes" className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Notas o Comentarios
                    </label>
                    <textarea
                      id="client-notes"
                      rows={2}
                      placeholder="Ej. Prefiero entrega a domicilio, preguntar por disponibilidad de calibres..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Sum & Submit */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex items-center justify-between text-sm font-bold text-white">
              <span>Total Estimado:</span>
              <span className="text-lg text-amber-500">{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="rounded-lg border border-zinc-800 hover:border-red-500/35 px-4 py-3 text-xs font-semibold text-zinc-500 hover:text-red-400 transition-colors"
              >
                Vaciar
              </button>
              <button
                onClick={handleSendQuote}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition-colors shadow-md shadow-emerald-950/20"
              >
                <Send className="h-4 w-4" />
                <span>Enviar por WhatsApp</span>
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
