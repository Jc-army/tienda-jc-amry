export const MOCK_PRODUCTS = [
  {
    id: "101",
    name: "Rifle de Aire Gamo Whisper Maxxim Cal 5.5mm",
    category: "Rifles de aire",
    description: "Rifle de aire comprimido de alta potencia con tecnología Whisper Maxxim de reducción de ruido, culata sintética ergonómica y mira telescópica 4x32 incluida. Ideal para tiro deportivo y control de plagas.",
    price: 4999,
    image_url: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=600&auto=format&fit=crop", // placeholder target image
    featured: true,
    specs: {
      "Calibre": "5.5 mm (.22)",
      "Velocidad": "975 fps con diábolo de aleación",
      "Sistema": "Pistón de gas IGT",
      "Peso": "3.0 kg",
      "Largo Total": "116 cm"
    }
  },
  {
    id: "102",
    name: "Rifle PCP Hatsan Blitz Cal 5.5mm (Full Auto)",
    category: "Rifles de aire",
    description: "Impresionante rifle PCP semi-automático y completamente automático. Cuenta con un cargador rotativo de alta capacidad, culata táctica regulable y rieles Picatinny para accesorios. Una bestia del aire comprimido.",
    price: 19500,
    image_url: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=600&auto=format&fit=crop",
    featured: true,
    specs: {
      "Calibre": "5.5 mm (.22)",
      "Velocidad": "1050 fps",
      "Sistema": "PCP (Aire Pre-comprimido)",
      "Modo de Disparo": "Semiautomático / Automático",
      "Presión Máxima": "250 bar",
      "Capacidad del Cargador": "21 diábolos"
    }
  },
  {
    id: "201",
    name: "Pistola de Co2 Umarex Glock 19 Cal 4.5mm",
    category: "Pistolas de aire",
    description: "Réplica oficial licenciada por Glock. Funciona con tanques de Co2 de 12g, dispara balines de metal calibre 4.5mm. Carro metálico y cuerpo de polímero que replican fielmente el peso y la sensación de la original.",
    price: 2850,
    image_url: "https://images.unsplash.com/photo-1569074187119-c87815b476da?q=80&w=600&auto=format&fit=crop",
    featured: true,
    specs: {
      "Calibre": "4.5 mm (.177) Balines",
      "Velocidad": "410 fps",
      "Sistema": "Co2 (12g)",
      "Peso": "717 g",
      "Capacidad": "16 tiros"
    }
  },
  {
    id: "202",
    name: "Revolver de Co2 Crosman Vigilante Cal 4.5mm",
    category: "Pistolas de aire",
    description: "Revolver de Co2 con cañón estriado de 6 pulgadas. Dispara tanto diábolos como balines. Incluye rieles para mira y accesorios. Gran precisión para práctica de tiro.",
    price: 2100,
    image_url: "https://images.unsplash.com/photo-1584838392817-21a4f0dbb2f3?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Calibre": "4.5 mm (.177) Diábolos y Balines",
      "Velocidad": "435 fps",
      "Sistema": "Co2 (12g)",
      "Cañón": "Acero estriado",
      "Capacidad": "10 diábolos o 6 balines"
    }
  },
  {
    id: "301",
    name: "Diábolos JSB Exact Jumbo Heavy 5.52mm",
    category: "Diábolos",
    description: "Diábolos de alta precisión elegidos por tiradores de competencia de Field Target en todo el mundo. Peso intermedio que brinda una trayectoria muy estable incluso con viento.",
    price: 450,
    image_url: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?q=80&w=600&auto=format&fit=crop",
    featured: true,
    specs: {
      "Calibre": "5.52 mm (.22)",
      "Peso": "18.13 grains / 1.175 gramos",
      "Contenido": "250 piezas",
      "Forma": "Domo (Domed)"
    }
  },
  {
    id: "302",
    name: "Diábolos Gamo Red Fire Cal 5.5mm 125 pzas",
    category: "Diábolos",
    description: "Diábolo de expansión controlada con punta de polímero rojo simétrica. Ofrece una penetración y expansión excepcionales al impacto, ideal para caza deportiva.",
    price: 290,
    image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Calibre": "5.5 mm (.22)",
      "Peso": "15.4 grains",
      "Contenido": "125 piezas",
      "Punta": "Polímero expansivo"
    }
  },
  {
    id: "401",
    name: "Copitas Mendoza Express Cal 4.5mm 250 pzas",
    category: "Copitas",
    description: "Copitas tradicionales de plomo de la marca Mendoza. Excelente balance entre precio y calidad, ideales para rifles y pistolas de resorte y pistón de mediana potencia.",
    price: 120,
    image_url: "https://images.unsplash.com/photo-1584036561566-baf241830990?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Calibre": "4.5 mm (.177)",
      "Peso": "8 grains aprox.",
      "Contenido": "250 piezas",
      "Material": "Plomo premium"
    }
  },
  {
    id: "402",
    name: "Copitas Deportivas Cal 5.5mm 150 pzas",
    category: "Copitas",
    description: "Copitas de calibre 5.5mm ideales para diversión informal y tiro al blanco de lata. Aleación suave que protege el rayado de tu cañón.",
    price: 95,
    image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Calibre": "5.5 mm (.22)",
      "Peso": "14.3 grains",
      "Contenido": "150 piezas",
      "Forma": "Falda hueca tradicional"
    }
  },
  {
    id: "501",
    name: "Mira Telescópica Discovery VT-R 4-16x42 AOE",
    category: "Miras",
    description: "Mira telescópica táctica de aumentos variables (4x a 16x) con objetivo ajustable para corrección de paralaje. Retícula iluminada en verde y rojo en varios niveles de brillo. Resistente al agua, niebla y golpes.",
    price: 3200,
    image_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    featured: true,
    specs: {
      "Aumentos": "4x a 16x",
      "Diámetro Objetivo": "42 mm",
      "Retícula": "Mil-Dot Iluminada (Rojo/Verde)",
      "Tubo": "25.4 mm (1 pulgada)",
      "Ajuste de Paralaje": "Sí (10 yardas a infinito)"
    }
  },
  {
    id: "502",
    name: "Mira Punto Rojo UTG Reflex Compact",
    category: "Miras",
    description: "Mira réflex ultra compacta para adquisición rápida del objetivo. Ideal para pistolas de Co2 y rifles tácticos. Punto de 4 MOA con ajuste de brillo inteligente.",
    price: 1850,
    image_url: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Tamaño del Punto": "4 MOA",
      "Brillo": "6 niveles",
      "Montaje": "Picatinny / Weaver integrado",
      "Batería": "CR2032 (incluida)",
      "Material": "Aluminio de aviación"
    }
  },
  {
    id: "601",
    name: "Tanque de Aire PCP Scuba Carbono 4500 PSI",
    category: "Accesorios",
    description: "Estación de llenado portátil de fibra de carbono. Capacidad de 6.8 litros de volumen con válvula DIN y manguera de alta presión con conector rápido rápido. Imprescindible para usuarios de rifles PCP.",
    price: 8500,
    image_url: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=600&auto=format&fit=crop",
    featured: true,
    specs: {
      "Material": "Fibra de Carbono ligera",
      "Presión Máxima": "4500 psi (300 bar)",
      "Volumen": "6.8 Litros",
      "Conexión": "Manguera microbore con foster hembra"
    }
  },
  {
    id: "602",
    name: "Porta Rifle Acolchado Tactical JC 120cm",
    category: "Accesorios",
    description: "Funda de transporte de alta resistencia. Confeccionada en Nylon 1000D con acolchado de espuma gruesa para proteger tu rifle y mira de impactos. Cuenta con bolsillos externos para diábolos y accesorios.",
    price: 750,
    image_url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Largo": "120 cm",
      "Material": "Nylon 1000D impermeable",
      "Acolchado": "Espuma de celda cerrada de 2 cm",
      "Bolsillos": "3 externos con cierre"
    }
  },
  {
    id: "701",
    name: "Aceite de Silicona Mendoza Especial Pistón",
    category: "Ferretería",
    description: "Lubricante de silicona 100% pura para el mantenimiento de sellos y pistones de rifles de aire. No sufre 'dieseling' (combustión interna) por lo que es seguro para cámaras de compresión de resorte e IGT.",
    price: 150,
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Contenido": "30 ml",
      "Composición": "100% Aceite de Silicona",
      "Aplicación": "Sellos de pistón, juntas tóricas, válvulas de PCP"
    }
  },
  {
    id: "702",
    name: "Kit de Limpieza JC Premium Cal 4.5 y 5.5mm",
    category: "Ferretería",
    description: "Kit de mantenimiento completo para mantener el estriado del cañón impecable. Incluye varillas de bronce acoplables, escobillones de latón, nylon y algodón para ambos calibres, además de parches de limpieza.",
    price: 480,
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    featured: false,
    specs: {
      "Calibres": "4.5 mm y 5.5 mm",
      "Contenido": "Varillas, escobillas, adaptadores, parches",
      "Estuche": "Plástico rígido termoformado"
    }
  }
];
