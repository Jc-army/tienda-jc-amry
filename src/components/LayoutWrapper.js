'use client';

import React, { useState } from 'react';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import Link from 'next/link';
import { Crosshair, ShieldCheck, Truck, Clock, PhoneCall, ArrowUp } from 'lucide-react';
import useInView from '../hooks/useInView';

function TrustBadge({ icon: Icon, title, desc, delay = 0 }) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'is-visible' : ''} flex items-start gap-4 rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-black/20 group cursor-default`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="rounded-lg bg-amber-500/10 p-3 text-amber-500 transition-all duration-300 group-hover:bg-amber-500/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/10">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-amber-500">{title}</h4>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-30 rounded-full border border-zinc-800 bg-zinc-900/80 p-3 text-zinc-400 backdrop-blur-md transition-all duration-300 hover:bg-amber-500 hover:text-black hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 active:scale-90 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Volver arriba"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

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
      <section className="border-t border-zinc-900 bg-zinc-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Por qué elegirnos</span>
            <h2 className="text-2xl font-extrabold text-white mt-1">Compromiso JC23 ARMY</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <TrustBadge
              icon={ShieldCheck}
              title="Garantía Asegurada"
              desc="Todos nuestros rifles y accesorios cuentan con garantía oficial directa del fabricante."
              delay={0}
            />
            <TrustBadge
              icon={Truck}
              title="Envíos a Todo el País"
              desc="Gestionamos envíos seguros con empaque reforzado a cualquier parte de la república."
              delay={0.1}
            />
            <TrustBadge
              icon={Clock}
              title="Atención Rápida"
              desc="Cotiza en línea y recibe respuesta de nuestros especialistas por WhatsApp en minutos."
              delay={0.2}
            />
            <TrustBadge
              icon={PhoneCall}
              title="Soporte Personalizado"
              desc="¿No sabes qué calibre o mira necesitas? Te asesoramos en tu compra sin costo extra."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            
            {/* Column 1 - Brand Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <Crosshair className="h-6 w-6 text-amber-500 transition-all duration-300 group-hover:rotate-180" />
                <span className="text-lg font-black tracking-wider text-white">
                  JC23 <span className="text-amber-500">ARMY</span>
                </span>
              </Link>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Tu catálogo de confianza especializado en rifles de aire comprimido, miras telescópicas, diábolos y accesorios deportivos. Calidad, precisión y atención personalizada.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navegación</h3>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/" className="transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block">Inicio</Link></li>
                <li><Link href="/catalog" className="transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block">Catálogo Completo</Link></li>
                <li><Link href="/#how-it-works" className="transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block">¿Cómo funciona?</Link></li>
              </ul>
            </div>

            {/* Column 3 - Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Categorías Populares</h3>
              <ul className="space-y-2.5 text-xs">
                <li><Link href="/catalog?category=Rifles%20de%20aire" className="transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block">Rifles de aire</Link></li>
                <li><Link href="/catalog?category=Pistolas%20de%20aire" className="transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block">Pistolas de aire</Link></li>
                <li><Link href="/catalog?category=Miras" className="transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block">Miras Telescópicas</Link></li>
                <li><Link href="/catalog?category=Diábolos" className="transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block">Diábolos y Copitas</Link></li>
              </ul>
            </div>

            {/* Column 4 - Contact Info */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contacto</h3>
              <ul className="space-y-2.5 text-xs text-zinc-500">
                <li className="text-zinc-400">Asesoría de Compra / WhatsApp</li>
                <li>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523310644238'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold transition-all duration-200 hover:text-amber-500 hover:pl-1 inline-block"
                  >
                    {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+52 331 064 4238'}
                  </a>
                </li>
                <li className="text-zinc-500">Lunes a Sábado: 9:00 AM - 7:00 PM</li>
              </ul>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="mt-12 border-t border-zinc-900 pt-8 text-center text-xs text-zinc-600 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} JC23 ARMY. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Precisión deportiva certificada.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Global Shopping/Quotation Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
