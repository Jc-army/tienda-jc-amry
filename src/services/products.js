import Papa from 'papaparse';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const CSV_URL = process.env.NEXT_PUBLIC_SHEET_CSV_URL;

export async function getAllProducts() {
  if (!CSV_URL) {
    // Client-side console logging only to prevent pollution during build
    if (typeof window !== 'undefined') {
      console.log("No NEXT_PUBLIC_SHEET_CSV_URL env variable set. Using mock products.");
    }
    return MOCK_PRODUCTS;
  }

  try {
    const response = await fetch(CSV_URL, {
      next: { revalidate: 300 } // Cache for 5 minutes on the server
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const products = results.data.map((row) => {
              // Parse specifications
              let specs = {};
              if (row.specs) {
                try {
                  specs = JSON.parse(row.specs);
                } catch (e) {
                  // Fallback: parse as key:value, key2:value2
                  row.specs.split(',').forEach(pair => {
                    const [k, v] = pair.split(':');
                    if (k && v) specs[k.trim()] = v.trim();
                  });
                }
              }

              // Build a clean specs object from additional columns if they exist (custom support)
              // If the sheets have standard specs like "Calibre", "Velocidad", we can include them
              const customSpecs = { ...specs };
              const standardKeys = ['id', 'name', 'category', 'description', 'price', 'image_url', 'featured', 'specs'];
              Object.keys(row).forEach(key => {
                if (!standardKeys.includes(key) && row[key]) {
                  customSpecs[key] = row[key];
                }
              });

              return {
                id: row.id ? String(row.id).trim() : String(Math.random()),
                name: row.name ? String(row.name).trim() : 'Producto sin nombre',
                category: row.category ? String(row.category).trim() : 'Sin categoría',
                description: row.description ? String(row.description).trim() : '',
                price: parseFloat(String(row.price).replace(/[^0-9.-]+/g, "")) || 0,
                image_url: row.image_url ? String(row.image_url).trim() : 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=600&auto=format&fit=crop',
                featured: String(row.featured).toLowerCase() === 'true' || 
                          String(row.featured).toLowerCase() === 'si' || 
                          String(row.featured).toLowerCase() === 'sí' || 
                          row.featured === '1',
                specs: Object.keys(customSpecs).length > 0 ? customSpecs : null
              };
            });
            resolve(products);
          } catch (err) {
            console.error("Error formatting parsed products: ", err);
            resolve(MOCK_PRODUCTS);
          }
        },
        error: (error) => {
          console.error("PapaParse error: ", error);
          resolve(MOCK_PRODUCTS);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing products from Google Sheets:", error);
    return MOCK_PRODUCTS;
  }
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find(p => String(p.id) === String(id)) || null;
}

export async function getFeaturedProducts() {
  const products = await getAllProducts();
  return products.filter(p => p.featured);
}

export async function getCategories() {
  const products = await getAllProducts();
  const cats = products.map(p => p.category);
  return [...new Set(cats)];
}
