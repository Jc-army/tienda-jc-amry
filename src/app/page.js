'use client';

import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFeaturedProducts } from '../services/products';
import ProductCard from '../components/ProductCard';
import useInView from '../hooks/useInView';import { Crosshair, Target, Disc, Eye, Settings, Wrench, ChevronRight, ArrowRight, Shield, Truck, MessageSquare, Tv, Sword, Car, Sparkles, Zap, ChevronDown, } from 'lucide-react';

// Scroll-reveal wrapper component
function RevealSection({ children, className = '', delay = 0 }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function CategoryCard({ cat, idx }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const IconComp = cat.icon;
  return (
    <div ref={ref} className={`reveal ${isInView ? 'is-visible' : ''}`} style={{ transitionDelay: `${idx * 0.06}s` }}>
      <Link
        href={`/catalog?category=${encodeURIComponent(cat.name)}`}
        className={`group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-900 bg-gradient-to-br ${cat.color} p-6 text-center transition-all duration-500 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1.5`}
      >
        <div className="relative">
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-amber-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:text-amber-400">
            <IconComp className="h-6 w-6" />
          </div>
          <div className="absolute -inset-1 rounded-xl bg-amber-500/0 blur-lg transition-all duration-500 group-hover:bg-amber-500/10" />
        </div>
        <h3 className="mt-4 text-xs font-bold text-white leading-tight uppercase tracking-wider group-hover:text-amber-500 transition-colors duration-300">
          {cat.name}
        </h3>
        <p className="mt-1 text-[9px] text-zinc-500 line-clamp-1 transition-colors duration-300 group-hover:text-zinc-400">
          {cat.desc}
        </p>
      </Link>
    </div>
  );
}

function StepCard({ number, title, desc, isLast = false }) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const isGreen = isLast;
  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'is-visible' : ''} flex flex-col items-center relative`}
      style={{ transitionDelay: `${number * 0.1}s` }}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${
          isGreen
            ? 'bg-emerald-950/45 border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10'
            : 'bg-zinc-900 border-zinc-800 text-amber-500 group-hover:border-amber-500/50 group-hover:shadow-lg group-hover:shadow-amber-500/10'
        } ${isInView ? 'scale-100' : 'scale-0'}`}
        style={{
          transition: `all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${number * 0.1}s`,
        }}
      >
        <span className="font-black text-lg">{number}</span>
      </div>
      <h3 className="mt-4 text-sm font-bold text-white">{title}</h3>
      <p className="mt-2 text-xs text-zinc-500 max-w-[200px]">{desc}</p>
    </div>
  );
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    getFeaturedProducts().then((data) => {
      setFeaturedProducts(data);
      setLoadingFeatured(false);
    });
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const categoriesList = [
    { name: "Rifles de aire", icon: Crosshair, desc: "PCP, Resorte y Pistón de gas", color: "from-amber-500/20 to-orange-500/5" },
    { name: "Pistolas de aire", icon: Target, desc: "Modelos Co2 y deportivos", color: "from-blue-500/20 to-indigo-500/5" },
    { name: "Diábolos", icon: Disc, desc: "JSB, Gamo y calibres variados", color: "from-emerald-500/20 to-teal-500/5" },
    { name: "Copitas", icon: Disc, desc: "Mendoza, Deportivas y plomo", color: "from-red-500/20 to-pink-500/5" },
    { name: "Miras", icon: Eye, desc: "Telescópicas y Punto Rojo", color: "from-purple-500/20 to-fuchsia-500/5" },
    { name: "Accesorios", icon: Settings, desc: "Tanques PCP, fundas e infladores", color: "from-cyan-500/20 to-sky-500/5" },
    { name: "Ferretería", icon: Wrench, desc: "Aceites, refacciones y limpieza", color: "from-zinc-500/20 to-slate-500/5" },
    { name: "Electrodomésticos", icon: Tv, desc: "Hogar, cocina y entretenimiento", color: "from-orange-500/20 to-amber-500/5" },
    { name: "Katanas", icon: Sword, desc: "Colección, adorno y exhibición", color: "from-red-500/20 to-rose-500/5" },
    { name: "Carros a escala", icon: Car, desc: "Coleccionables y pasatiempo", color: "from-blue-500/20 to-cyan-500/5" },
  ];

  return (
    <div className="flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32 border-b border-zinc-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none animate-glow-pulse" />
        <div className="absolute -bottom-20 right-0 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`max-w-3xl transition-all duration-1000 ease-out ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20 animate-fade-in">
              <Shield className="h-3.5 w-3.5" /> Equipamiento Deportivo Profesional
            </span>

            {/* Title with animated underline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase leading-none">
              <span className="inline-block animate-fade-in-up">Precisión táctica</span>{' '}
              <br />
              <span className="text-amber-500 inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                en cada disparo
              </span>
            </h1>

            {/* Animated underline accent */}
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 animate-fade-in" style={{ animationDelay: '0.4s' }} />

            <p className="mt-6 text-lg leading-relaxed text-zinc-400 animate-fade-in-up max-w-xl" style={{ animationDelay: '0.3s' }}>
              Encuentra los mejores rifles de aire comprimido, pistolas, diábolos y miras telescópicas en el catálogo de <strong className="text-white">JC23 ARMY</strong>. Agrega al carrito y cotiza al instante por WhatsApp con atención personalizada.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Link
                href="/catalog"
                className="group relative flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.97] overflow-hidden"
              >
                <span className="relative z-10">Explorar Catálogo</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523310644238'}?text=Hola%20JC23%20ARMY,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20sobre%20sus%20productos.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-6 py-3 text-sm font-bold text-zinc-200 transition-all duration-300 hover:bg-zinc-800/60 hover:text-white hover:border-zinc-700 active:scale-[0.97]"
              >
                <MessageSquare className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                <span>Hablar con un Experto</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="h-5 w-5 text-zinc-600" />
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <RevealSection>
        <section className="py-16 bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  <Sparkles className="h-3 w-3" /> Colecciones
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">Categorías de Productos</h2>
              </div>
              <Link
                href="/catalog"
                className="group hidden sm:flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-all duration-300 uppercase tracking-wider"
              >
                <span>Ver todas</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
              {categoriesList.map((cat, idx) => (
                <CategoryCard key={idx} cat={cat} idx={idx} />
              ))}
            </div>

            <Link
              href="/catalog"
              className="group sm:hidden flex items-center justify-center gap-1 mt-6 text-xs font-bold text-amber-500 hover:text-amber-400 transition-all duration-300 uppercase tracking-wider"
            >
              <span>Ver todas las categorías</span>
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </RevealSection>

      {/* ===== FEATURED PRODUCTS ===== */}
      <RevealSection delay={0.1}>
        <section className="py-16 border-t border-zinc-900 bg-zinc-900/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-500">
                  <Zap className="h-3 w-3" /> Destacados
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">Los Más Buscados</h2>
              </div>
              <Link
                href="/catalog"
                className="group flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-all duration-300 uppercase tracking-wider"
              >
                <span>Ver todo el catálogo</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {loadingFeatured ? (
                // Skeleton placeholders while loading
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
                    <div className="aspect-square skeleton" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-3/4 rounded skeleton" />
                      <div className="h-3 w-full rounded skeleton" />
                      <div className="h-3 w-1/2 rounded skeleton" />
                      <div className="flex justify-between pt-2">
                        <div className="h-5 w-20 rounded skeleton" />
                        <div className="h-7 w-20 rounded skeleton" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                featuredProducts.slice(0, 4).map((product, idx) => (
                  <div
                    key={product.id}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards`,
                      opacity: 0,
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===== HOW IT WORKS ===== */}
      <RevealSection delay={0.2}>
        <section id="how-it-works" className="py-20 bg-zinc-950 border-t border-zinc-900 scroll-mt-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-500">
              <Sparkles className="h-3 w-3" /> Guía de compra
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">¿Cómo funciona la cotización?</h2>
            <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Hemos simplificado el proceso para que puedas consultar la disponibilidad e iniciar tu pedido directamente con nuestros asesores comerciales.
            </p>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mt-16 relative">
              <StepCard number={1} title="Explora el Catálogo" desc="Navega y encuentra tus productos favoritos con sus especificaciones." />
              <StepCard number={2} title="Agrega al Carrito" desc="Añade los artículos y define las cantidades que necesitas cotizar." />
              <StepCard number={3} title="Ingresa tus Datos" desc="Tu nombre y notas para personalizar el mensaje de cotización." />
              <StepCard number={4} title="Envía por WhatsApp" desc="Llega el detalle exacto a un asesor para confirmar existencias." isLast />
            </div>

            <div className="mt-16 rounded-2xl border border-zinc-900 bg-zinc-900/10 p-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left transition-all duration-300 hover:border-zinc-800 hover:shadow-lg hover:shadow-black/20">
              <div className="rounded-xl bg-amber-500/10 p-4 text-amber-500 transition-all duration-300 group-hover:scale-110">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Envío Garantizado</h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Enviamos con embalaje de alta resistencia para evitar cualquier percance durante el traslado. El costo exacto se calcula con tu código postal durante la conversación de WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>
    </div>
  );
}
