import type { Product } from "@/types/product";

// Helper functions for generating random values when adding new products
export const randomViews = (): number => Math.floor(Math.random() * 20000) + 5000;
export const randomPricing = (): number => Math.floor(Math.random() * 4000) + 500;
export const calculateRevenue = (views: number, pricing: number): number => {
  return Math.floor((views * pricing * (Math.random() * 7 + 8)) / 1000);
};

// Complete product data array with all properties - diversified across all categories
export const products: Product[] = [
  // Electronics (20 products)
  { id: "1", name: "iPhone 15 Pro Max", views: 14250, pricing: 1200, revenue: 171000, status: "published", category: "electronics" },
  { id: "2", name: "MacBook Pro M3", views: 18500, pricing: 2500, revenue: 462500, status: "published", category: "electronics" },
  { id: "3", name: "Samsung Galaxy S24 Ultra", views: 16300, pricing: 1800, revenue: 293400, status: "published", category: "electronics" },
  { id: "4", name: "Sony WH-1000XM5 Headphones", views: 11200, pricing: 800, revenue: 89600, status: "published", category: "electronics" },
  { id: "5", name: "Canon EOS R5 Camera", views: 19800, pricing: 3200, revenue: 633600, status: "published", category: "electronics" },
  { id: "6", name: "LG OLED C3 TV 65", views: 14500, pricing: 1500, revenue: 217500, status: "published", category: "electronics" },
  { id: "7", name: "Bose QuietComfort 45", views: 17600, pricing: 2200, revenue: 387200, status: "published", category: "electronics" },
  { id: "8", name: "DJI Mavic 3 Pro Drone", views: 13200, pricing: 950, revenue: 125400, status: "published", category: "electronics" },
  { id: "9", name: "Apple Watch Series 9", views: 21000, pricing: 2800, revenue: 588000, status: "published", category: "electronics" },
  { id: "10", name: "iPad Pro 12.9 M2", views: 15800, pricing: 1700, revenue: 268600, status: "published", category: "electronics" },
  { id: "11", name: "AirPods Pro 2", views: 19200, pricing: 2400, revenue: 460800, status: "published", category: "electronics" },
  { id: "12", name: "Samsung QLED 85", views: 12400, pricing: 1100, revenue: 136400, status: "published", category: "electronics" },
  { id: "13", name: "GoPro Hero 12", views: 16700, pricing: 1900, revenue: 317300, status: "published", category: "electronics" },
  { id: "14", name: "Fitbit Charge 6", views: 13900, pricing: 1300, revenue: 180700, status: "published", category: "electronics" },
  { id: "15", name: "Garmin Fenix 7", views: 20100, pricing: 3000, revenue: 603000, status: "published", category: "electronics" },
  { id: "16", name: "Dyson V15 Vacuum", views: 15200, pricing: 1600, revenue: 243200, status: "published", category: "electronics" },
  { id: "17", name: "JBL Flip 6 Speaker", views: 11800, pricing: 900, revenue: 106200, status: "published", category: "electronics" },
  { id: "18", name: "Nest Security Camera", views: 18900, pricing: 2600, revenue: 491400, status: "published", category: "electronics" },
  { id: "19", name: "Echo Dot 5th Gen", views: 16400, pricing: 2000, revenue: 328000, status: "published", category: "electronics" },
  { id: "20", name: "Google Nest Hub", views: 13500, pricing: 1200, revenue: 162000, status: "published", category: "electronics" },

  // Clothing (15 products)
  { id: "21", name: "Nike Air Max 270", views: 19500, pricing: 2700, revenue: 526500, status: "published", category: "clothing" },
  { id: "22", name: "Adidas Ultraboost 22", views: 14800, pricing: 1400, revenue: 207200, status: "published", category: "clothing" },
  { id: "23", name: "Levi's 501 Jeans", views: 17900, pricing: 2300, revenue: 411700, status: "published", category: "clothing" },
  { id: "24", name: "Patagonia Down Jacket", views: 12800, pricing: 1000, revenue: 128000, status: "published", category: "clothing" },
  { id: "25", name: "The North Face Backpack", views: 20500, pricing: 3100, revenue: 635500, status: "published", category: "clothing" },
  { id: "26", name: "Under Armour Running Shoes", views: 15600, pricing: 1750, revenue: 273000, status: "published", category: "clothing" },
  { id: "27", name: "Champion Hoodie", views: 18700, pricing: 2550, revenue: 476850, status: "published", category: "clothing" },
  { id: "28", name: "Vans Old Skool", views: 12100, pricing: 1050, revenue: 127050, status: "published", category: "clothing" },
  { id: "29", name: "Converse Chuck Taylor", views: 17000, pricing: 2100, revenue: 357000, status: "published", category: "clothing" },
  { id: "30", name: "Puma Suede Classic", views: 14100, pricing: 1250, revenue: 176250, status: "published", category: "clothing" },
  { id: "31", name: "Tommy Hilfiger Polo", views: 19900, pricing: 2900, revenue: 577100, status: "published", category: "clothing" },
  { id: "32", name: "Ralph Lauren Oxford Shirt", views: 15300, pricing: 1650, revenue: 252450, status: "published", category: "clothing" },
  { id: "33", name: "Calvin Klein T-Shirt", views: 11500, pricing: 850, revenue: 97750, status: "published", category: "clothing" },
  { id: "34", name: "Zara Blazer", views: 18200, pricing: 2350, revenue: 427700, status: "published", category: "clothing" },
  { id: "35", name: "H&M Denim Jacket", views: 13100, pricing: 1150, revenue: 150650, status: "published", category: "clothing" },

  // Gaming (10 products)
  { id: "36", name: "PlayStation 5 Console", views: 20700, pricing: 3300, revenue: 683100, status: "published", category: "gaming" },
  { id: "37", name: "Xbox Series X", views: 15900, pricing: 1850, revenue: 294150, status: "published", category: "gaming" },
  { id: "38", name: "Nintendo Switch OLED", views: 19300, pricing: 2450, revenue: 472850, status: "published", category: "gaming" },
  { id: "39", name: "Steam Deck", views: 12600, pricing: 1080, revenue: 136080, status: "published", category: "gaming" },
  { id: "40", name: "Meta Quest 3 VR", views: 17200, pricing: 2150, revenue: 369800, status: "published", category: "gaming" },
  { id: "41", name: "Oculus Rift S", views: 14400, pricing: 1350, revenue: 194400, status: "published", category: "gaming" },
  { id: "42", name: "Razer Gaming Mouse", views: 20000, pricing: 2950, revenue: 590000, status: "published", category: "gaming" },
  { id: "43", name: "Corsair Gaming Keyboard", views: 15400, pricing: 1680, revenue: 258720, status: "published", category: "gaming" },
  { id: "44", name: "HyperX Gaming Headset", views: 11700, pricing: 880, revenue: 102960, status: "published", category: "gaming" },
  { id: "45", name: "Logitech G Pro Mouse", views: 18400, pricing: 2420, revenue: 445280, status: "published", category: "gaming" },

  // Home (12 products)
  { id: "46", name: "Roomba i7+ Robot Vacuum", views: 13300, pricing: 1180, revenue: 156940, status: "published", category: "home" },
  { id: "47", name: "Nespresso Vertuo Coffee", views: 20800, pricing: 3400, revenue: 707200, status: "published", category: "home" },
  { id: "48", name: "KitchenAid Stand Mixer", views: 16000, pricing: 1920, revenue: 307200, status: "published", category: "home" },
  { id: "49", name: "Instant Pot Duo", views: 19400, pricing: 2480, revenue: 481120, status: "published", category: "home" },
  { id: "50", name: "Vitamix Blender", views: 12300, pricing: 1020, revenue: 125460, status: "published", category: "home" },
  { id: "51", name: "Breville Espresso Machine", views: 17300, pricing: 2180, revenue: 377140, status: "published", category: "home" },
  { id: "52", name: "Weber Genesis Grill", views: 14600, pricing: 1380, revenue: 201480, status: "published", category: "home" },
  { id: "53", name: "Dyson Air Purifier", views: 20200, pricing: 3020, revenue: 610040, status: "published", category: "home" },
  { id: "54", name: "Honeywell Thermostat", views: 15500, pricing: 1720, revenue: 266600, status: "published", category: "home" },
  { id: "55", name: "Ring Doorbell Pro", views: 11900, pricing: 920, revenue: 109480, status: "published", category: "home" },
  { id: "56", name: "Philips Hue Light Kit", views: 18600, pricing: 2520, revenue: 468720, status: "published", category: "home" },
  { id: "57", name: "Sonos Beam Soundbar", views: 13400, pricing: 1220, revenue: 163480, status: "published", category: "home" },

  // Sports (10 products)
  { id: "58", name: "Yoga Mat Premium", views: 20900, pricing: 3500, revenue: 731500, status: "published", category: "sports" },
  { id: "59", name: "Dumbbell Set 20kg", views: 16100, pricing: 1980, revenue: 318780, status: "published", category: "sports" },
  { id: "60", name: "Resistance Bands Set", views: 19600, pricing: 2580, revenue: 505680, status: "published", category: "sports" },
  { id: "61", name: "Basketball Official", views: 12700, pricing: 1120, revenue: 142240, status: "published", category: "sports" },
  { id: "62", name: "Tennis Racket Pro", views: 17400, pricing: 2220, revenue: 386280, status: "published", category: "sports" },
  { id: "63", name: "Running Treadmill", views: 14700, pricing: 1420, revenue: 208740, status: "published", category: "sports" },
  { id: "64", name: "Cycling Helmet", views: 20300, pricing: 3080, revenue: 625240, status: "published", category: "sports" },
  { id: "65", name: "Swimming Goggles", views: 15700, pricing: 1780, revenue: 279460, status: "published", category: "sports" },
  { id: "66", name: "Jump Rope Pro", views: 12000, pricing: 960, revenue: 115200, status: "published", category: "sports" },
  { id: "67", name: "Foam Roller", views: 18800, pricing: 2620, revenue: 492560, status: "published", category: "sports" },

  // Beauty (10 products)
  { id: "68", name: "L'Oreal Skincare Set", views: 13600, pricing: 1280, revenue: 174080, status: "published", category: "beauty" },
  { id: "69", name: "Philips Electric Shaver", views: 21000, pricing: 3600, revenue: 756000, status: "published", category: "beauty" },
  { id: "70", name: "Braun Hair Dryer", views: 16200, pricing: 2050, revenue: 332100, status: "published", category: "beauty" },
  { id: "71", name: "Oral-B Electric Toothbrush", views: 19700, pricing: 2650, revenue: 522050, status: "published", category: "beauty" },
  { id: "72", name: "Chanel Perfume No. 5", views: 12900, pricing: 1150, revenue: 148350, status: "published", category: "beauty" },
  { id: "73", name: "Dior Makeup Palette", views: 17500, pricing: 2280, revenue: 399000, status: "published", category: "beauty" },
  { id: "74", name: "Clinique Moisturizer", views: 14900, pricing: 1450, revenue: 216050, status: "published", category: "beauty" },
  { id: "75", name: "Estée Lauder Serum", views: 20400, pricing: 3150, revenue: 642600, status: "published", category: "beauty" },
  { id: "76", name: "MAC Lipstick Set", views: 15000, pricing: 1520, revenue: 228000, status: "published", category: "beauty" },
  { id: "77", name: "NARS Blush Palette", views: 19000, pricing: 2750, revenue: 522500, status: "published", category: "beauty" },

  // Accessories (10 products)
  { id: "78", name: "Ray-Ban Aviator Sunglasses", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "accessories" },
  { id: "79", name: "Oakley Sunglasses", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "accessories" },
  { id: "80", name: "Rolex Submariner Watch", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "accessories" },
  { id: "81", name: "Omega Seamaster Watch", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "accessories" },
  { id: "82", name: "Tag Heuer Watch", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "accessories" },
  { id: "83", name: "Hermes Birkin Bag", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "accessories" },
  { id: "84", name: "Louis Vuitton Wallet", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "accessories" },
  { id: "85", name: "Gucci Belt", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "accessories" },
  { id: "86", name: "Prada Sunglasses", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "accessories" },
  { id: "87", name: "Michael Kors Handbag", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "accessories" },

  // Books (8 products)
  { id: "88", name: "The Great Gatsby", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "books" },
  { id: "89", name: "To Kill a Mockingbird", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "books" },
  { id: "90", name: "1984 by George Orwell", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "books" },
  { id: "91", name: "Pride and Prejudice", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "books" },
  { id: "92", name: "The Catcher in the Rye", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "books" },
  { id: "93", name: "Harry Potter Collection", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "books" },
  { id: "94", name: "Lord of the Rings Set", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "books" },
  { id: "95", name: "The Hobbit", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "books" },

  // Toys (8 products)
  { id: "96", name: "LEGO Star Wars Set", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "toys" },
  { id: "97", name: "Barbie Dreamhouse", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "toys" },
  { id: "98", name: "Hot Wheels Track Set", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "toys" },
  { id: "99", name: "Nerf Blaster Elite", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "toys" },
  { id: "100", name: "Play-Doh Set", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "toys" },
  { id: "101", name: "Rubik's Cube", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "toys" },
  { id: "102", name: "Monopoly Board Game", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "toys" },
  { id: "103", name: "Jenga Tower Game", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "toys" },

  // Food (7 products)
  { id: "104", name: "Organic Coffee Beans", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "food" },
  { id: "105", name: "Premium Olive Oil", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "food" },
  { id: "106", name: "Artisan Chocolate Box", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "food" },
  { id: "107", name: "Gourmet Tea Collection", views: 21100, pricing: 3700, revenue: 780700, status: "published", category: "food" },
  { id: "108", name: "Organic Honey Jar", views: 16300, pricing: 2120, revenue: 345560, status: "published", category: "food" },
  { id: "109", name: "Premium Wine Set", views: 19800, pricing: 2720, revenue: 538560, status: "published", category: "food" },
  { id: "110", name: "Gourmet Spice Set", views: 13700, pricing: 1320, revenue: 180840, status: "published", category: "food" },

  // Draft products (5 products across different categories)
  { id: "111", name: "Draft Product Alpha", views: 16300, pricing: 2120, revenue: 345560, status: "draft", category: "electronics" },
  { id: "112", name: "Draft Product Beta", views: 19800, pricing: 2720, revenue: 538560, status: "draft", category: "clothing" },
  { id: "113", name: "Draft Product Gamma", views: 13700, pricing: 1320, revenue: 180840, status: "draft", category: "gaming" },
  { id: "114", name: "Draft Product Delta", views: 21100, pricing: 3700, revenue: 780700, status: "draft", category: "home" },
  { id: "115", name: "Draft Product Epsilon", views: 16300, pricing: 2120, revenue: 345560, status: "draft", category: "sports" },
];
