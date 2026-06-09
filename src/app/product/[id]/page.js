import React from 'react';
import Link from 'next/link';
import { getProductById } from '../../../services/products';
import ProductDetailsClient from '../../../components/ProductDetailsClient';
import { ChevronLeft, ArrowLeft, Crosshair, AlertTriangle } from 'lucide-react';

export const revalidate = 300; // Cache for 5 minutes

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 p-12 text-center">
        <div className="rounded-full bg-red-950/35 border border-red-500/20 p-4 text-red-400 mb-4">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-bold text-white">Producto no encontrado</h2>
        <p className="text-xs text-zinc-500 mt-1 max-w-xs">
          El artículo con ID "{id}" no existe o fue retirado del catálogo de JC23 ARMY.
        </p>
        <Link
          href="/catalog"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-500 px-5 py-2 text-xs font-bold hover:bg-zinc-850"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-zinc-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between text-xs text-zinc-500">
          <Link href="/catalog" className="flex items-center gap-1 hover:text-amber-500 transition-colors font-medium">
            <ChevronLeft className="h-4 w-4" />
            <span>Volver al Catálogo</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-semibold text-zinc-400">ID:</span> {product.id}
          </div>
        </div>

        {/* Product Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 rounded-3xl border border-zinc-900 bg-zinc-900/5 p-6 md:p-8 backdrop-blur-sm shadow-xl">
          
          {/* Left Column: Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950">
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {/* Category badge */}
            <span className="absolute left-4 top-4 rounded-md bg-zinc-950/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 backdrop-blur-sm border border-amber-500/20">
              {product.category}
            </span>
          </div>

          {/* Right Column: Information */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <Crosshair className="h-3.5 w-3.5 text-amber-500/80" />
                <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-500 transition-colors">
                  {product.category}
                </Link>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-black text-white leading-tight uppercase md:text-3xl">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            {/* Price and Cart Action (Client Component) */}
            <div className="mt-8">
              <ProductDetailsClient product={product} />
            </div>

            {/* Specifications Table */}
            {product.specs && (
              <div className="mt-8 space-y-3 pt-6 border-t border-zinc-900">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">Especificaciones técnicas</h3>
                <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 overflow-hidden text-xs">
                  <table className="min-w-full divide-y divide-zinc-900">
                    <tbody className="divide-y divide-zinc-900 text-zinc-300">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} className="hover:bg-zinc-900/40">
                          <td className="px-4 py-3 font-semibold text-zinc-400 bg-zinc-900/20 w-1/3 truncate">{key}</td>
                          <td className="px-4 py-3 text-zinc-200">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
