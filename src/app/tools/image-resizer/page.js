'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Upload, Download, Image as ImageIcon, Crop, Maximize2, Check, RefreshCw, ArrowLeft, Sliders, Grid3X3 } from 'lucide-react';
import { handleImageError } from '../../../utils/images';

const PRESETS = [
  { label: 'Catálogo (card)', width: 600, height: 600, desc: 'Para cards de productos' },
  { label: 'Detalle producto', width: 800, height: 800, desc: 'Para página de detalle' },
  { label: 'Miniatura', width: 300, height: 300, desc: 'Para vista previa rápida' },
  { label: 'Custom', width: null, height: null, desc: 'Tamaño personalizado' },
];

export default function ImageResizerTool() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [originalDims, setOriginalDims] = useState({ w: 0, h: 0 });
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customW, setCustomW] = useState(400);
  const [customH, setCustomH] = useState(400);
  const [resizedUrl, setResizedUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [keepAspect, setKeepAspect] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [quality, setQuality] = useState(85);
  const [format, setFormat] = useState('image/jpeg');
  const [fitMode, setFitMode] = useState('cover');
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setResizedUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        setOriginalDims({ w: img.naturalWidth, h: img.naturalHeight });
        setPreview(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const preset = PRESETS[selectedPreset];
  const targetW = preset.width ?? customW;
  const targetH = preset.height ?? customH;
  const isCustom = selectedPreset === 3;

  const getTargetDims = useCallback(() => {
    let w = targetW;
    let h = targetH;

    if (keepAspect && originalDims.w > 0 && originalDims.h > 0) {
      const aspect = originalDims.w / originalDims.h;

      if (fitMode === 'contain') {
        if (w / h > aspect) {
          w = h * aspect;
        } else {
          h = w / aspect;
        }
      } else {
        if (w / h < aspect) {
          w = h * aspect;
        } else {
          h = w / aspect;
        }
      }
    }

    return { w: Math.round(w), h: Math.round(h) };
  }, [targetW, targetH, keepAspect, originalDims, fitMode]);

  const handleResize = useCallback(() => {
    if (!preview) return;
    setIsProcessing(true);

    const img = new window.Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const dims = getTargetDims();

      canvas.width = targetW;
      canvas.height = targetH;

      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, targetW, targetH);

      const ox = (targetW - dims.w) / 2;
      const oy = (targetH - dims.h) / 2;

      ctx.drawImage(img, ox, oy, dims.w, dims.h);

      const mimeType = format;
      const q = quality / 100;
      setResizedUrl(canvas.toDataURL(mimeType, q));
      setIsProcessing(false);
    };
    img.src = preview;
  }, [preview, getTargetDims, targetW, targetH, format, quality]);

  useEffect(() => {
    if (preview) handleResize();
  }, [preview, targetW, targetH, format, quality, fitMode, keepAspect]);

  const handleDownload = () => {
    if (!resizedUrl) return;
    const ext = format === 'image/png' ? 'png' : 'jpg';
    const link = document.createElement('a');
    const baseName = file?.name?.replace(/\.[^.]+$/, '') || 'imagen';
    link.download = `${baseName}_${targetW}x${targetH}.${ext}`;
    link.href = resizedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResizedUrl(null);
    setOriginalDims({ w: 0, h: 0 });
  };

  const readableSize = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const sizeReduction = () => {
    if (!file || !resizedUrl) return null;
    const originalSize = file.size;
    const base64Len = resizedUrl.split(',')[1]?.length || 0;
    const newSize = Math.round((base64Len * 3) / 4);
    const pct = ((1 - newSize / originalSize) * 100).toFixed(1);
    return { originalSize, newSize, pct };
  };

  const reduction = sizeReduction();

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:text-amber-500"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al catálogo</span>
            </Link>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Crop className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Redimensionar Imágenes</h1>
              <p className="text-xs text-zinc-500">
                Sube, redimensiona y descarga tus imágenes para Google Drive
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column: Upload & Previews */}
          <div className="lg:col-span-3 space-y-6">

            {/* Upload zone */}
            {!preview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
                  dragOver
                    ? 'border-amber-500 bg-amber-500/10 scale-[1.02]'
                    : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) handleFile(e.target.files[0]);
                    e.target.value = '';
                  }}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-4">
                  <div className={`rounded-full p-4 transition-all duration-300 ${
                    dragOver ? 'bg-amber-500/20 scale-110' : 'bg-zinc-800'
                  }`}>
                    <Upload className={`h-8 w-8 transition-colors duration-300 ${
                      dragOver ? 'text-amber-500' : 'text-zinc-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">
                      {dragOver ? '¡Suelta la imagen aquí!' : 'Arrastra una imagen o haz clic para subir'}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      JPG, PNG, WebP — Se procesa 100% en tu navegador (sin servidor)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Original preview card */
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden animate-fade-in-up">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="h-4 w-4 text-amber-500 shrink-0" />
                    <span className="text-sm text-zinc-300 truncate">{file?.name || 'Imagen'}</span>
                    <span className="text-xs text-zinc-600 shrink-0">({readableSize(file?.size)})</span>
                  </div>
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-zinc-400 transition-all duration-200 hover:bg-zinc-800 hover:text-zinc-200"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Cambiar
                  </button>
                </div>

                <div className="relative bg-zinc-950">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-lg bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs text-zinc-400">
                    <Maximize2 className="h-3 w-3" />
                    <span>{originalDims.w} × {originalDims.h} px</span>
                  </div>
                  <div className="flex items-center justify-center p-4">
                    <img
                      src={preview}
                      alt="Original"
                      onError={handleImageError}
                      className="max-h-[400px] rounded-lg object-contain"
                    />
                  </div>
                </div>

                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}

            {/* Resized preview */}
            {resizedUrl && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden animate-fade-in-up">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm font-medium text-zinc-200">Redimensionada</span>
                    <span className="text-xs text-zinc-600">
                      {targetW} × {targetH} px
                    </span>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-black transition-all duration-200 hover:bg-amber-400 active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </button>
                </div>

                <div className="relative bg-zinc-950">
                  {reduction && (
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-3 rounded-lg bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs">
                      <span className="text-emerald-400 font-medium">
                        -{reduction.pct}%
                      </span>
                      <span className="text-zinc-500">|</span>
                      <span className="text-zinc-400">
                        {readableSize(reduction.newSize)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-center p-4">
                    <img
                      src={resizedUrl}
                      alt="Redimensionada"
                      onError={handleImageError}
                      className="max-h-[400px] rounded-lg object-contain border border-zinc-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center justify-center gap-3 py-8 animate-fade-in">
                <div className="flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-6 py-3">
                  <RefreshCw className="h-4 w-4 text-amber-500 animate-spin" />
                  <span className="text-sm text-zinc-400">Procesando imagen...</span>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Controls */}
          <div className="lg:col-span-2 space-y-5">
            {/* Presets */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 animate-fade-in-up">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                <Grid3X3 className="h-3.5 w-3.5" />
                Tamaños predefinidos
              </h3>
              <div className="space-y-2">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPreset(i)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                      selectedPreset === i
                        ? 'border-amber-500/50 bg-amber-500/10 shadow-sm shadow-amber-500/10'
                        : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${selectedPreset === i ? 'text-amber-500' : 'text-zinc-300'}`}>
                        {p.label}
                      </span>
                      {p.width && (
                        <span className="text-xs text-zinc-500">{p.width}×{p.height}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-600">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom dimensions */}
            {isCustom && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 animate-fade-in">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                  Dimensiones personalizadas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Ancho (px)</label>
                    <input
                      type="number"
                      min="1"
                      max="4000"
                      value={customW}
                      onChange={(e) => setCustomW(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-white transition-all duration-200 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1">Alto (px)</label>
                    <input
                      type="number"
                      min="1"
                      max="4000"
                      value={customH}
                      onChange={(e) => setCustomH(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-white transition-all duration-200 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 animate-fade-in-up">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                <Sliders className="h-3.5 w-3.5" />
                Opciones
              </h3>

              <div className="space-y-4">
                {/* Aspect ratio toggle */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`relative h-5 w-9 rounded-full transition-all duration-200 ${
                    keepAspect ? 'bg-amber-500' : 'bg-zinc-700'
                  }`}>
                    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-200 ${
                      keepAspect ? 'left-4' : 'left-0.5'
                    }`} />
                    <input
                      type="checkbox"
                      checked={keepAspect}
                      onChange={() => setKeepAspect(!keepAspect)}
                      className="sr-only"
                    />
                  </div>
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-200 transition-colors duration-200">
                    Mantener proporción original
                  </span>
                </label>

                {/* Fit mode */}
                {keepAspect && (
                  <div className="flex gap-2">
                    {[
                      { value: 'cover', label: 'Rellenar (crop)' },
                      { value: 'contain', label: 'Ajustar (bordes)' },
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => setFitMode(mode.value)}
                        className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-200 ${
                          fitMode === mode.value
                            ? 'border-amber-500/50 bg-amber-500/10 text-amber-500'
                            : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quality slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-zinc-500">Calidad</span>
                    <span className="text-xs text-zinc-400">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-zinc-800 cursor-pointer accent-amber-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-amber-500/30 [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                </div>

                {/* Format selector */}
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Formato</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'image/jpeg', label: 'JPG' },
                      { value: 'image/png', label: 'PNG' },
                      { value: 'image/webp', label: 'WebP' },
                    ].map((fmt) => (
                      <button
                        key={fmt.value}
                        onClick={() => setFormat(fmt.value)}
                        className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium transition-all duration-200 ${
                          format === fmt.value
                            ? 'border-amber-500/50 bg-amber-500/10 text-amber-500'
                            : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations card */}
            <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-4 animate-fade-in-up">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                💡 Recomendación
              </h3>
              <ul className="space-y-1.5 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <Check className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                  <span><strong className="text-zinc-300">Catálogo:</strong> 600×600 px · JPG calidad 80%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                  <span><strong className="text-zinc-300">Detalle:</strong> 800×800 px · JPG calidad 85%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Archivos de ~100-300 KB ideales para Google Drive</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Usa <strong className="text-zinc-300">Ajustar (bordes)</strong> para que la imagen no se recorte</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
