'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import Link from 'next/link';
import { Crosshair, ShieldCheck, Truck, Clock, PhoneCall } from 'lucide-react';

export default function LayoutWrapper({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 font-sans antialiased">
      {/* Global Navbar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Trust Badges Section */}
      <section className="border-t border-zinc-900 bg-zinc-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="flex items-start gap-4 rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Garantía Asegurada</h4>
                <p className="text-xs text-zinc-400 mt-1">Todos nuestros rifles y accesorios cuentan con garantía oficial directa del fabricante.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Envíos a Todo el País</h4>
                <p className="text-xs text-zinc-400 mt-1">Gestionamos envíos seguros con empaque reforzado a cualquier parte de la república.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Atención Rápida</h4>
                <p className="text-xs text-zinc-400 mt-1">Cotiza en línea y recibe respuesta de nuestros especialistas por WhatsApp en minutos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500">
                <PhoneCall className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Soporte Personalizado</h4>
                <p className="text-xs text-zinc-400 mt-1">¿No sabes qué calibre o mira necesitas? Te asesoramos en tu compra sin costo extra.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            
            {/* Column 1 - Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Crosshair className="h-6 w-6 text-amber-500" />
                <span className="text-lg font-black tracking-wider text-white">
                  JC23 <span className="text-amber-500">ARMY</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Tu catálogo de confianza especializado en rifles de aire comprimido, miras telescópicas, diábolos y accesorios deportivos. Calidad, precisión y atención personalizada.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navegación</h3>
              <ul className="space-y-2 text-xs">
                <li><Link href="/" className="hover:text-amber-500 transition-colors">Inicio</Link></li>
                <li><Link href="/catalog" className="hover:text-amber-500 transition-colors">Catálogo Completo</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-amber-500 transition-colors">¿Cómo funciona?</Link></li>
              </ul>
            </div>

            {/* Column 3 - Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Categorías Populares</h3>
              <ul className="space-y-2 text-xs">
                <li><Link href="/catalog?category=Rifles%20de%20aire" className="hover:text-amber-500 transition-colors">Rifles de aire</Link></li>
                <li><Link href="/catalog?category=Pistolas%20de%20aire" className="hover:text-amber-500 transition-colors">Pistolas de aire</Link></li>
                <li><Link href="/catalog?category=Miras" className="hover:text-amber-500 transition-colors">Miras Telescópicas</Link></li>
                <li><Link href="/catalog?category=Diábolos" className="hover:text-amber-500 transition-colors">Diábolos y Copitas</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact Info */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contacto</h3>
              <ul className="space-y-2 text-xs text-zinc-500">
                <li>Asesoría de Compra / WhatsApp</li>
                <li className="text-white font-bold hover:text-amber-500 transition-colors">
                  <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '521234567890'}`} target="_blank" rel="noopener noreferrer">
                    {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+52 123 456 7890'}
                  </a>
                </li>
                <li>Lunes a Sábado: 9:00 AM - 7:00 PM</li>
              </ul>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="mt-12 border-t border-zinc-900 pt-8 text-center text-xs text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} JC23 ARMY. Todos los derechos reservados.</p>
            <p>Precisión deportiva certificada.</p>
          </div>
        </div>
      </footer>

      {/* Global Shopping/Quotation Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
