import Papa from 'papaparse';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const CSV_URL = process.env.NEXT_PUBLIC_SHEET_CSV_URL;

// Helper to look up key values in a row case-insensitively and with possible synonyms
function getRowValue(row, possibleKeys) {
  const normalizedRow = {};
  Object.keys(row).forEach(k => {
    normalizedRow[k.toLowerCase().trim()] = row[k];
  });

  for (const key of possibleKeys) {
    const normalizedKey = key.toLowerCase().trim();
    if (normalizedRow[normalizedKey] !== undefined && normalizedRow[normalizedKey] !== null) {
      return normalizedRow[normalizedKey];
    }
  }
  return undefined;
}

// Convert Google Drive view links to direct thumbnail view links
function formatImageUrl(url) {
  if (!url) return 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=600&auto=format&fit=crop';
  
  const trimmed = String(url).trim();
  
  if (trimmed.includes('drive.google.com')) {
    let fileId = '';
    
    // Pattern 1: /file/d/FILE_ID/view
    const pathMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (pathMatch && pathMatch[1]) {
      fileId = pathMatch[1];
    } else {
      // Pattern 2: id=FILE_ID
      const queryMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (queryMatch && queryMatch[1]) {
        fileId = queryMatch[1];
      }
    }
    
    if (fileId) {
      // Use the thumbnail API which is public, loads extremely fast, and is optimized for web <img> tags
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
    }
  }
  
  return trimmed;
}

export async function getAllProducts() {
  if (!CSV_URL) {
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
              // Extract values using robust matching
              const idVal = getRowValue(row, ['id', 'codigo', 'código']);
              const nameVal = getRowValue(row, ['name', 'nombre', 'producto', 'product']);
              const categoryVal = getRowValue(row, ['category', 'categoria', 'categoría']);
              const descVal = getRowValue(row, ['description', 'descripcion', 'descripción', 'desc']);
              const priceVal = getRowValue(row, ['price', 'precio', 'costo', 'cost']);
              const imgVal = getRowValue(row, ['image_url', 'imagen', 'img', 'foto', 'photo', 'url_imagen']);
              const featuredVal = getRowValue(row, ['featured', 'destacado', 'featuread', 'destacados']);
              const specsVal = getRowValue(row, ['specs', 'speects', 'especificaciones', 'caracteristicas', 'características']);

              // Parse specifications
              let specs = {};
              if (specsVal) {
                try {
                  specs = JSON.parse(String(specsVal));
                } catch (e) {
                  // Fallback: parse as key:value, key2:value2
                  String(specsVal).split(',').forEach(pair => {
                    const [k, v] = pair.split(':');
                    if (k && v) specs[k.trim()] = v.trim();
                  });
                }
              }

              // Standardize values
              const id = idVal ? String(idVal).trim() : String(Math.random());
              const name = nameVal ? String(nameVal).trim() : 'Producto sin nombre';
              const category = categoryVal ? String(categoryVal).trim() : 'Sin categoría';
              const description = descVal ? String(descVal).trim() : '';
              const price = parseFloat(String(priceVal).replace(/[^0-9.-]+/g, "")) || 0;
              const image_url = formatImageUrl(imgVal);
              const featured = String(featuredVal).toLowerCase() === 'true' || 
                                String(featuredVal).toLowerCase() === 'si' || 
                                String(featuredVal).toLowerCase() === 'sí' || 
                                String(featuredVal).toLowerCase() === '1';

              return {
                id,
                name,
                category,
                description,
                price,
                image_url,
                featured,
                specs: Object.keys(specs).length > 0 ? specs : null
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
