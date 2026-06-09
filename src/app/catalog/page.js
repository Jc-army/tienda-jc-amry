import React, { Suspense } from 'react';
import { getAllProducts, getCategories } from '../../services/products';
import CatalogClient from '../../components/CatalogClient';
import { Loader2 } from 'lucide-react';

export const revalidate = 300; // Cache for 5 minutes

export default async function CatalogPage() {
  const products = await getAllProducts();
  const categories = await getCategories();

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
