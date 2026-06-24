import React, { Suspense } from 'react';
import { getAllProducts } from '../../services/products';
import CatalogClient from '../../components/CatalogClient';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const products = await getAllProducts();
  // Derive categories directly from loaded products (avoids a second fetch to Google Sheets)
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <Suspense fallback={
      <div className="flex flex-1 items-center justify-center bg-zinc-950 p-24 text-zinc-400">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider">Cargando Catálogo...</span>
        </div>
      </div>
    }>
      <CatalogClient initialProducts={products} categories={categories} />
    </Suspense>
  );
}
