'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCw, AlertCircle } from 'lucide-react';

export default function CatalogClient({ initialProducts, categories: categoriesProp }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Safety: derive categories from products if the prop arrives empty
  const categories = useMemo(() => {
    if (categoriesProp && categoriesProp.length > 0) return categoriesProp;
    // Fallback: extract unique categories from products
    return [...new Set(initialProducts.map(p => p.category).filter(Boolean))];
  }, [categoriesProp, initialProducts]);

  // URL parameters
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-asc', 'price-desc'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    if (categoryParam) {
      // Find the exact category name from our list (handles case differences and URL encoding)
      const decoded = decodeURIComponent(categoryParam);
      const match = categories.find(c => c.toLowerCase() === decoded.toLowerCase());
      setSelectedCategory(match || decoded);
    } else {
      setSelectedCategory('Todas');
    }
  }, [categoryParam, categories]);

  useEffect(() => {
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParam]);

  // Handle category change (update URL)
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'Todas') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
    setSortBy('default');
    router.push('/catalog');
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by category
    if (selectedCategory !== 'Todas') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex-1 bg-zinc-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 border-b border-zinc-900 pb-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">JC23 ARMY</span>
          <h1 className="text-3xl font-black text-white uppercase mt-1">Catálogo de Equipos</h1>
          <p className="text-sm text-zinc-500 mt-1">Explora existencias de rifles de aire, miras telescópicas y consumibles para tiro.</p>
        </div>

        {/* Filter Controls (Desktop & Mobile trigger) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-4 pr-10 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="relative flex items-center rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-300">
              <ArrowUpDown className="h-3.5 w-3.5 mr-2 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white focus:outline-none cursor-pointer pr-4"
              >
                <option value="default" className="bg-zinc-950">Ordenar por: Relevancia</option>
                <option value="price-asc" className="bg-zinc-950">Precio: Menor a Mayor</option>
                <option value="price-desc" className="bg-zinc-950">Precio: Mayor a Menor</option>
              </select>
            </div>

            {/* Mobile filters toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-xs font-semibold text-zinc-300 md:hidden hover:border-amber-500 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-amber-500" />
              <span>Filtros</span>
            </button>

            {/* Reset filters */}
            {(searchQuery || selectedCategory !== 'Todas' || sortBy !== 'default') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors"
                title="Limpiar filtros"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Grid & Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Desktop Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl border border-zinc-900 bg-zinc-900/10 p-6 space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4">Categorías</h3>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => handleCategorySelect('Todas')}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-colors text-left ${
                      selectedCategory === 'Todas'
                        ? 'bg-amber-500 text-black'
                        : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                    }`}
                  >
                    <span>Todas las Categorías</span>
                    <span className={`text-[10px] ${selectedCategory === 'Todas' ? 'text-black' : 'text-zinc-600'}`}>
                      {initialProducts.length}
                    </span>
                  </button>
                  {categories.map((cat, idx) => {
                    const count = initialProducts.filter((p) => p.category === cat).length;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleCategorySelect(cat)}
                        className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-colors text-left ${
                          selectedCategory.toLowerCase() === cat.toLowerCase()
                            ? 'bg-amber-500 text-black'
                            : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        <span className={`text-[10px] ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'text-black' : 'text-zinc-650'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {showMobileFilters && (
            <div className="md:hidden border border-zinc-900 rounded-xl bg-zinc-900/20 p-4 space-y-4 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-2">Filtrar por Categoría</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    handleCategorySelect('Todas');
                    setShowMobileFilters(false);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium border ${
                    selectedCategory === 'Todas'
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'border-zinc-800 text-zinc-400'
                  }`}
                >
                  Todas ({initialProducts.length})
                </button>
                {categories.map((cat, idx) => {
                  const count = initialProducts.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        handleCategorySelect(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium border ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'border-zinc-800 text-zinc-400'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-12 rounded-2xl border border-zinc-900 bg-zinc-900/10">
                <AlertCircle className="h-10 w-10 text-amber-550/60 mb-4" />
                <h3 className="text-base font-bold text-white">No se encontraron productos</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                  Prueba cambiando la búsqueda o seleccionando otra categoría.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-500 px-5 py-2 text-xs font-bold hover:bg-zinc-850"
                >
                  Restaurar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
