import './globals.css';
import { CartProvider } from '../context/CartContext';
import LayoutWrapper from '../components/LayoutWrapper';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'JC23 ARMY | Catálogo de Aire Comprimido y Tiro Deportivo',
  description: 'Explora nuestro catálogo premium de rifles de aire, pistolas de aire, diábolos, miras, accesorios y herramientas de tiro deportivo. Cotiza de inmediato a través de WhatsApp.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-zinc-950" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
