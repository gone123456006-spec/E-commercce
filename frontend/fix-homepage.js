const fs = require('fs');
const file = 'd:/Ecommerce/frontend/src/app/components/HomePage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace corrupted symbols
content = content.replace(/â‚¹/g, 'Rs. ');
content = content.replace(/â­\s*/g, '★ '); // Keep the space

// Make card rows stretch their children
content = content.replace(/className="flex w-max gap-([^"a-z]+)"/g, 'className="flex w-max gap-$1 items-stretch"');

// Fix "Flash Deals" card
content = content.replace(
  /className="min-w-\[180px\] sm:min-w-\[210px\] bg-white border rounded-xl p-2\.5"/g,
  'className="flex flex-col h-full min-w-[180px] sm:min-w-[210px] bg-white border rounded-xl p-2.5"'
);

// Fix "Buying History", "Recently Viewed", "Recommended" card
content = content.replace(
  /className="min-w-\[150px\] sm:min-w-\[190px\] border rounded-lg p-2 bg-white"/g,
  'className="flex flex-col h-full min-w-[150px] sm:min-w-[190px] border rounded-lg p-2 bg-white"'
);
content = content.replace(
  /className="min-w-\[150px\] sm:min-w-\[190px\] border rounded-lg p-2"/g,
  'className="flex flex-col h-full min-w-[150px] sm:min-w-[190px] border rounded-lg p-2"'
);

// Fix "Top Brands" card
content = content.replace(
  /className="min-w-\[170px\] sm:min-w-\[200px\] bg-white border rounded-xl p-2\.5"/g,
  'className="flex flex-col h-full min-w-[170px] sm:min-w-[200px] bg-white border rounded-xl p-2.5"'
);

// Fix "Shop From Here" cards
content = content.replace(
  /className="min-w-\[180px\] sm:min-w-\[200px\] md:min-w-\[220px\] bg-white border border-tawang-gold\/15 tawang-card rounded-xl p-2\.5 sm:p-3 shadow-sm"/g,
  'className="flex flex-col h-full min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-tawang-gold/15 tawang-card rounded-xl p-2.5 sm:p-3 shadow-sm"'
);

// Push prices to bottom for simpler cards
content = content.replace(
  /<p className="mt-1 text-sm font-bold text-tawang-gold">/g,
  '<p className="mt-auto pt-1 text-sm font-bold text-tawang-gold">'
);
content = content.replace(
  /<p className="text-sm font-bold text-tawang-gold mt-1">/g,
  '<p className="text-sm font-bold text-tawang-gold mt-auto pt-1">'
);

// Push prices down for "Shop From Here" cards
content = content.replace(
  /<div className="mt-2 flex items-center gap-2">/g,
  '<div className="mt-auto pt-2 flex items-center gap-2">'
);

fs.writeFileSync(file, content);
console.log("Successfully fixed styling and encoding.");
