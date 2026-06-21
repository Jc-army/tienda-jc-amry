import React from 'react';
import Link from 'next/link';
import { getFeaturedProducts } from '../services/products';
import ProductCard from '../components/ProductCard';
import { 
  Crosshair, 
  Target, 
  Disc, 
  Eye, 
  Settings, 
  Wrench, 
  ChevronRight, 
  ArrowRight,
  Shield, 
  Truck, 
  MessageSquare,
  Tv,
  Sword,
  Car
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  // List of categories with icons and descriptions
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
    { name: "Carros a escala", icon: Car, desc: "Coleccionables y pasatiempo", color: "from-blue-500/20 to-cyan-500/5" }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950 py-24 sm:py-32 border-b border-zinc-900">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500 border border-amber-500/20">
              <Shield className="h-3.5 w-3.5" /> Equipamiento Deportivo Profesional
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl uppercase">
              Precisión táctica <br />
              <span className="text-amber-500">en cada disparo</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              Encuentra los mejores rifles de aire comprimido, pistolas, diábolos y miras telescópicas en el catálogo de <strong>JC23 ARMY</strong>. Agrega al carrito y cotiza al instante por WhatsApp con atención personalizada.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-bold text-black transition-colors"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '523310644238'}?text=Hola%20JC23%20ARMY,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20sobre%20sus%20productos.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 px-6 py-3 text-sm font-bold text-zinc-200 hover:text-white transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                <span>Hablar con un Experto</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Colecciones</span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Categorías de Productos</h2>
            </div>
            <Link href="/catalog" className="hidden sm:flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-wider">
              <span>Ver todas</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
            {categoriesList.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/catalog?category=${encodeURIComponent(cat.name)}`}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-900 bg-gradient-to-br ${cat.color} p-6 text-center transition-all duration-300 hover:border-zinc-800 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-1`}
                >
                  <div className="rounded-xl bg-zinc-900 border border-zinc-850 p-4 text-amber-500 transition-transform duration-300 group-hover:scale-110">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xs font-bold text-white leading-tight uppercase tracking-wider">{cat.name}</h3>
                  <p className="mt-1 text-[9px] text-zinc-500 line-clamp-1">{cat.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Destacados</span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Los Más Buscados</h2>
            </div>
            <Link href="/catalog" className="flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors uppercase tracking-wider">
              <span>Ver todo el catálogo</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20 bg-zinc-950 border-t border-zinc-900 scroll-mt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Guía de compra</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">¿Cómo funciona la cotización?</h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Hemos simplificado el proceso para que puedas consultar la disponibilidad e iniciar tu pedido directamente con nuestros asesores comerciales.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mt-16 relative">
            
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-amber-500 font-bold text-lg">
                1
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">Explora el Catálogo</h3>
              <p className="mt-2 text-xs text-zinc-500">Navega y encuentra tus productos favoritos con sus especificaciones.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-amber-500 font-bold text-lg">
                2
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">Agrega al Carrito</h3>
              <p className="mt-2 text-xs text-zinc-500">Añade los artículos y define las cantidades que necesitas cotizar.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-amber-500 font-bold text-lg">
                3
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">Ingresa tus Datos</h3>
              <p className="mt-2 text-xs text-zinc-500">Ingresa tu nombre para personalizar y agilizar tu mensaje de cotización.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/45 border border-emerald-500/20 text-emerald-400 font-bold text-lg">
                4
              </div>
              <h3 className="mt-4 text-sm font-bold text-white">Envía por WhatsApp</h3>
              <p className="mt-2 text-xs text-zinc-500">Se enviará el detalle exacto a un asesor para confirmar existencias y costos finales.</p>
            </div>

          </div>

          <div className="mt-16 rounded-2xl border border-zinc-900 bg-zinc-900/10 p-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left">
            <div className="rounded-xl bg-amber-500/10 p-4 text-amber-500">
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
    </div>
  );
}
