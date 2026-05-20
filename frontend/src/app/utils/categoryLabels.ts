export const categoryNames: Record<string, string> = {
  clothes: 'Clothes',
  jewellery: 'Jewellery',
  food: 'Food',
  'chips-namkeen': 'Chips & Namkeen',
  'sweets-chocolates': 'Sweets & Chocolates',
  'drinks-juices': 'Drinks & Juices',
  'tea-coffee': 'Tea, Coffee & Milk Drinks',
  'instant-food': 'Instant Food',
  'sauces-spreads': 'Sauces & Spreads',
  'paan-corner': 'Paan Corner',
  'ice-creams': 'Ice Creams & More',
  'energy-drinks': 'Energy & Sports Drinks',
  'biscuits-cookies': 'Biscuits & Cookies',
  'dry-snacks': 'Dry Snacks & Toast',
  'ready-to-eat': 'Ready to Eat',
  'vegetables-fruits': 'Vegetables & Fruits',
  'atta-rice-dal': 'Atta, Rice & Dal',
  'oil-ghee-masala': 'Oil, Ghee & Masala',
  'dairy-bread-eggs': 'Dairy, Bread & Eggs',
  'bakery-biscuits': 'Bakery & Biscuits',
  'dry-fruits-cereals': 'Dry Fruits & Cereals',
  'chicken-meat-fish': 'Chicken, Meat & Fish',
  'kitchenware-appliances': 'Kitchenware & Appliances',
  'kitchen-stock-up': 'Kitchen Stock Up',
  'bath-body': 'Bath & Body',
  hair: 'Hair',
  'skin-face': 'Skin & Face',
  'beauty-cosmetics': 'Beauty & Cosmetics',
  'feminine-hygiene': 'Feminine Hygiene',
  'baby-care': 'Baby Care',
  'health-pharma': 'Health & Pharma',
  'sexual-wellness': 'Sexual Wellness',
  'mens-grooming': "Men's Grooming"
};

export function getCategoryDisplayName(category?: string): string {
  if (!category) return 'Category';
  if (categoryNames[category]) return categoryNames[category];
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
