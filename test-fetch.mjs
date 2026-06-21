import fs from 'fs';

// Manually load .env.local first
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        let value = valueParts.join('=').trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key.trim()] = value;
      }
    }
  });
} catch (e) {
  console.log("Could not load .env.local:", e.message);
}

console.log("Environment URL:", process.env.NEXT_PUBLIC_SHEET_CSV_URL);

async function test() {
  try {
    const url = process.env.NEXT_PUBLIC_SHEET_CSV_URL;
    const res = await fetch(url);
    const text = await res.text();
    console.log("Raw CSV headers:", text.split('\n')[0]);
    console.log("Raw CSV Row 1:", text.split('\n')[1]);

    // Dynamic import to ensure process.env is populated before products.js module evaluation
    const { getAllProducts } = await import('./src/services/products.js');
    const products = await getAllProducts();
    console.log("Number of products parsed:", products.length);
    if (products.length > 0) {
      console.log("Sample product:", JSON.stringify(products[0], null, 2));
    }
  } catch (error) {
    console.error("Test failed with error:", error);
  }
}

test();
