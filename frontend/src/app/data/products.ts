export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  description: string;
  stock: number;
}

export const products: Product[] = [
  // Clothes
  {
    id: 'c1',
    name: 'Cotton T-Shirt',
    price: 499,
    rating: 4.5,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    description: 'Comfortable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.',
    stock: 50
  },
  {
    id: 'c2',
    name: 'Denim Jeans',
    price: 1299,
    rating: 4.7,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    description: 'Classic denim jeans with a modern fit. Durable and stylish for any occasion.',
    stock: 35
  },
  {
    id: 'c3',
    name: 'Casual Shirt',
    price: 899,
    rating: 4.3,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
    description: 'Versatile casual shirt suitable for office and casual outings.',
    stock: 40
  },
  {
    id: 'c4',
    name: 'Summer Dress',
    price: 1599,
    rating: 4.8,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    description: 'Elegant summer dress with beautiful floral patterns. Light and breezy fabric.',
    stock: 25
  },
  {
    id: 'c5',
    name: 'Hooded Jacket',
    price: 2199,
    rating: 4.6,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    description: 'Warm hooded jacket for cold weather. Water-resistant and windproof.',
    stock: 30
  },
  {
    id: 'c6',
    name: 'Formal Blazer',
    price: 2999,
    rating: 4.9,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400',
    description: 'Professional blazer perfect for business meetings and formal events.',
    stock: 20
  },
  {
    id: 'c7',
    name: 'Cotton Socks Pack',
    price: 100,
    rating: 4.3,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1586354782930-d6921b63a881?w=400',
    description: 'Comfortable pack of 3 cotton socks. Soft, breathable and durable for daily wear.',
    stock: 80
  },
  {
    id: 'c8',
    name: 'Cotton Cap',
    price: 50,
    rating: 4.2,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
    description: 'Lightweight cotton cap. Perfect for casual wear and sun protection.',
    stock: 150
  },
  {
    id: 'c9',
    name: 'Fashion Scarf',
    price: 199,
    rating: 4.5,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400',
    description: 'Lightweight printed scarf. Perfect accessory for outfits or as a head wrap.',
    stock: 60
  },
  {
    id: 'c10',
    name: 'Cotton Handkerchief',
    price: 35,
    rating: 4.0,
    category: 'clothes',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400',
    description: 'Soft cotton handkerchief. Multipurpose - use as pocket square or daily wipe.',
    stock: 200
  },

  // Jewellery
  {
    id: 'j1',
    name: 'Gold Necklace',
    price: 8999,
    rating: 4.9,
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    description: 'Elegant 22K gold necklace with intricate design. Perfect for special occasions.',
    stock: 10
  },
  {
    id: 'j2',
    name: 'Diamond Earrings',
    price: 12999,
    rating: 5.0,
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
    description: 'Stunning diamond earrings that sparkle beautifully. Premium quality diamonds.',
    stock: 8
  },
  {
    id: 'j3',
    name: 'Silver Bracelet',
    price: 3499,
    rating: 4.7,
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
    description: 'Stylish silver bracelet with modern design. Hypoallergenic and durable.',
    stock: 15
  },
  {
    id: 'j4',
    name: 'Pearl Ring',
    price: 5999,
    rating: 4.8,
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    description: 'Beautiful pearl ring with gold band. Timeless elegance for any outfit.',
    stock: 12
  },
  {
    id: 'j5',
    name: 'Gold Bangles Set',
    price: 15999,
    rating: 4.9,
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400',
    description: 'Set of 4 gold bangles with traditional design. Perfect for weddings and festivals.',
    stock: 6
  },
  {
    id: 'j6',
    name: 'Gemstone Pendant',
    price: 7499,
    rating: 4.6,
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1506630448388-4e663ecca085?w=400',
    description: 'Exquisite gemstone pendant with silver chain. Natural gemstones with vibrant colors.',
    stock: 10
  },

  // Food
  {
    id: 'f1',
    name: 'Organic Almonds',
    price: 699,
    rating: 4.5,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
    description: 'Premium quality organic almonds. Rich in protein and healthy fats. 500g pack.',
    stock: 100
  },
  {
    id: 'f2',
    name: 'Honey Jar',
    price: 399,
    rating: 4.7,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784670?w=400',
    description: 'Pure natural honey from bee farms. No artificial additives. 500ml jar.',
    stock: 75
  },
  {
    id: 'f3',
    name: 'Olive Oil',
    price: 899,
    rating: 4.8,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
    description: 'Extra virgin olive oil. Cold pressed and perfect for cooking and salads. 1L bottle.',
    stock: 60
  },
  {
    id: 'f4',
    name: 'Dark Chocolate',
    price: 299,
    rating: 4.6,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
    description: 'Premium dark chocolate with 70% cocoa. Rich and intense flavor. 200g bar.',
    stock: 120
  },
  {
    id: 'f5',
    name: 'Green Tea',
    price: 449,
    rating: 4.4,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400',
    description: 'Organic green tea leaves. Antioxidant-rich and refreshing. 250g pack.',
    stock: 90
  },
  {
    id: 'f6',
    name: 'Quinoa Pack',
    price: 599,
    rating: 4.7,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    description: 'Organic quinoa - superfood rich in protein and fiber. 1kg pack.',
    stock: 50
  },
  {
    id: 'f7',
    name: 'Cream Biscuits Pack',
    price: 100,
    rating: 4.4,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    description: 'Crispy cream-filled biscuits. Perfect with tea or as a quick snack. 200g pack.',
    stock: 120
  },
  {
    id: 'f8',
    name: 'Milk Chocolate Bar',
    price: 50,
    rating: 4.5,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400',
    description: 'Smooth milk chocolate. Rich and creamy taste. 50g bar.',
    stock: 150
  },
  {
    id: 'f9',
    name: 'Assorted Cookies Tin',
    price: 199,
    rating: 4.6,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
    description: 'Assorted butter cookies and biscuits. Great for gifting or snacking. 400g tin.',
    stock: 80
  },
  {
    id: 'f10',
    name: 'Chocolate Cookies',
    price: 35,
    rating: 4.2,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400',
    description: 'Chocolate-flavored cookies. Crunchy and delicious. 100g pack.',
    stock: 200
  },
  // --- SNACKS & DRINKS PRODUCTS (10x12) ---
  ...[
    {
      cat: 'chips-namkeen', items: [
        { id: 'lays-classic', name: "Lay's Classic Salted", weight: '26g', price: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop' },
        { id: 'kurkure-masala', name: 'Kurkure Masala Munch', weight: '90g', price: 30, image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=300&h=300&fit=crop' },
        { id: 'haldirams-aloo', name: "Haldiram's Aloo Bhujia", weight: '200g', price: 60, image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=300&h=300&fit=crop' },
        { id: 'lays-magic', name: "Lay's Magic Masala", weight: '26g', price: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop' },
        { id: 'bingo-rings', name: 'Bingo! Mad Angles', weight: '90g', price: 35, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'doritos-nacho', name: 'Doritos Nacho Cheese', weight: '70g', price: 50, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop' },
        { id: 'haldirams-mixture', name: "Haldiram's Mixture", weight: '150g', price: 55, image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=300&h=300&fit=crop' },
        { id: 'uncle-chips', name: 'Uncle Chipps Spicy', weight: '26g', price: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop' },
        { id: 'peppy-rings', name: 'Peppy Rings Tomato', weight: '80g', price: 30, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'act2-popcorn', name: 'ACT II Popcorn Classic', weight: '70g', price: 40, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'sweets-chocolates', items: [
        { id: 'dairy-milk', name: 'Cadbury Dairy Milk', weight: '36g', price: 30, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'kit-kat', name: 'KitKat Milk Chocolate', weight: '37g', price: 40, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'dairy-milk-silk', name: 'Cadbury Silk Oreo', weight: '130g', price: 155, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'kinder-joy', name: 'Kinder Joy Egg', weight: '20g', price: 50, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'five-star', name: 'Cadbury 5 Star', weight: '40g', price: 20, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'munch', name: 'Nestlé Munch Bar', weight: '13.5g', price: 10, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'eclairs', name: 'Cadbury Eclairs Toffee', weight: '100g pack', price: 50, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'milkybar', name: 'Milkybar White Choco', weight: '27g', price: 35, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'bounty', name: 'Bounty Coconut Bar', weight: '57g', price: 65, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
        { id: 'snickers', name: 'Snickers Peanut Bar', weight: '50g', price: 55, image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'drinks-juices', items: [
        { id: 'coca-cola', name: 'Coca-Cola Classic Can', weight: '300ml', price: 40, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'real-mango', name: 'Real Mango Juice', weight: '1L', price: 95, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'sprite', name: 'Sprite Lemon Lime', weight: '750ml', price: 45, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'tropicana-orange', name: 'Tropicana Orange 100%', weight: '1L', price: 120, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'pepsi', name: 'Pepsi Cola Bottle', weight: '2L', price: 85, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'maaza', name: 'Maaza Mango Drink', weight: '600ml', price: 40, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'frooti', name: 'Frooti Mango Drink', weight: '200ml', price: 15, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'slice', name: 'Slice Alphonso Mango', weight: '600ml', price: 40, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=300&fit=crop' },
        { id: 'mountain-dew', name: 'Mountain Dew Can', weight: '330ml', price: 45, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'red-bull', name: 'Red Bull Energy Drink', weight: '250ml', price: 125, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'tea-coffee', items: [
        { id: 'tata-tea-gold', name: 'Tata Tea Gold', weight: '500g', price: 270, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'nescafe-classic', name: 'Nescafé Classic Coffee', weight: '200g', price: 399, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'red-label', name: 'Brooke Bond Red Label', weight: '500g', price: 255, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'bru-coffee', name: 'Bru Instant Coffee', weight: '200g', price: 350, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'wagh-bakri', name: 'Wagh Bakri Premium Tea', weight: '500g', price: 280, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'amul-milk', name: 'Amul Gold Full Cream Milk', weight: '500ml', price: 32, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'horlicks', name: 'Horlicks Classic Malt', weight: '500g', price: 280, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'bournvita', name: 'Cadbury Bournvita 5 Star', weight: '500g', price: 260, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'lipton-green', name: 'Lipton Green Tea Bags', weight: '25 bags', price: 99, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
        { id: 'complan', name: 'Complan Chocolate Drink', weight: '500g', price: 300, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'instant-food', items: [
        { id: 'maggi-masala', name: 'Maggi 2-Minute Masala', weight: '280g', price: 72, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'yippee-noodles', name: 'Sunfeast YiPPee! Magic', weight: '240g', price: 60, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'knorr-soup', name: 'Knorr Tomato Soup Mix', weight: '53g', price: 35, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'mtr-poha', name: 'MTR Poha Breakfast Mix', weight: '180g', price: 55, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'top-ramen', name: 'Top Ramen Curry Noodles', weight: '70g', price: 15, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'ching-schezwan', name: "Ching's Schezwan Noodles", weight: '240g', price: 60, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'mtr-upma', name: 'MTR Rava Upma Mix', weight: '200g', price: 55, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'gits-idli', name: 'Gits Idli Mix', weight: '200g', price: 50, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
        { id: 'maggi-hot', name: 'Maggi Hot & Sweet Sauce', weight: '200g', price: 55, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'wai-wai', name: 'Wai Wai Chicken Noodles', weight: '75g', price: 20, image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'sauces-spreads', items: [
        { id: 'kissan-ketchup', name: 'Kissan Tomato Ketchup', weight: '500g', price: 110, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'maggi-sauce', name: 'Maggi Hot & Sweet Sauce', weight: '400g', price: 75, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'amul-butter', name: 'Amul Butter Pasteurised', weight: '500g', price: 270, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'saffola-mayo', name: 'Saffola Mayonnaise', weight: '250g', price: 99, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'dr-oetker-mayo', name: "Dr. Oetker Fun Foods Mayo", weight: '300g', price: 110, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'cremica-bbq', name: 'Cremica BBQ Sauce', weight: '325g', price: 99, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'del-monte-mustard', name: 'Del Monte Yellow Mustard', weight: '200g', price: 75, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'unibic-peanut', name: 'Sundrop Peanut Butter', weight: '462g', price: 200, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'kissan-mixed', name: 'Kissan Mixed Fruit Jam', weight: '500g', price: 130, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
        { id: 'top-chili', name: 'Ching\'s Red Chilli Sauce', weight: '290g', price: 80, image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'paan-corner', items: [
        { id: 'pass-pass', name: 'Pass Pass Pulse Candy', weight: '100 pcs', price: 50, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'rajnigandha', name: 'Rajnigandha Silver Pearls', weight: '4.4g', price: 15, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'catch-saunf', name: 'Catch Premium Saunf', weight: '100g', price: 40, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'pan-bahar', name: 'Pan Bahar Classic', weight: '10g', price: 10, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'polo-mint', name: 'Polo Strong Mint Candy', weight: '14g', price: 10, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'mentos', name: 'Mentos Spearmint Candy', weight: '35g', price: 20, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'pulse-candy', name: 'Pass Pass Pulse Raw Mango', weight: '100g', price: 50, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'orbit-gum', name: 'Orbit Spearmint Gum', weight: '28.6g', price: 30, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'center-fresh', name: 'Center Fresh Mint Gum', weight: '13g', price: 10, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
        { id: 'hajmola', name: 'Dabur Hajmola Regular', weight: '120 tabs', price: 55, image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'ice-creams', items: [
        { id: 'amul-cone', name: "Amul Choco Bar Ice Cream", weight: '60ml', price: 30, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'kwality-vanilla', name: 'Kwality Walls Vanilla Cup', weight: '100ml', price: 40, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'amul-kesar', name: 'Amul Kesar Pista Kulfi', weight: '60ml', price: 40, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'magnum-almond', name: 'Magnum Almond Ice Cream', weight: '80ml', price: 120, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'cornetto', name: 'Cornetto Classico Cone', weight: '75ml', price: 50, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'amul-tub', name: 'Amul Chocolate Tub', weight: '500ml', price: 190, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'softy-natural', name: 'Natural Strawberry Ice Cream', weight: '125ml', price: 65, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'joy-lychee', name: 'Joy Lychee Orange Lolly', weight: '60ml', price: 20, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'hersheys-sunday', name: "Hershey's Sunday Fudge Bar", weight: '70ml', price: 60, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
        { id: 'london-dairy', name: 'London Dairy Pistachio', weight: '500ml', price: 350, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'energy-drinks', items: [
        { id: 'redbull-sugarfree', name: 'Red Bull Sugarfree', weight: '250ml', price: 125, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'gatorade-blue', name: 'Gatorade Blue Bolt', weight: '500ml', price: 50, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'monster-energy', name: 'Monster Energy Drink', weight: '350ml', price: 110, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'sting', name: 'Sting Energy Drink', weight: '250ml', price: 20, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'hell-energy', name: 'Hell Energy Drink', weight: '250ml', price: 45, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'glucon-d', name: 'Glucon-D Regular', weight: '100g', price: 35, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'tang-orange', name: 'Tang Orange Drink Mix', weight: '100g', price: 30, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'rasna', name: 'Rasna Orange Spices', weight: '32 glass', price: 50, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'limca', name: 'Limca Pet Bottle', weight: '750ml', price: 40, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
        { id: 'thumbs-up', name: 'Thums Up Soft Drink', weight: '2L', price: 95, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'biscuits-cookies', items: [
        { id: 'parle-g', name: 'Parle-G Original', weight: '800g', price: 80, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'good-day', name: 'Britannia Good Day Cashew', weight: '210g', price: 40, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'oreo', name: 'Cadbury Oreo Vanilla', weight: '120g', price: 35, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'hide-n-seek', name: 'Parle Hide & Seek', weight: '200g', price: 50, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'dark-fantasy', name: 'Sunfeast Dark Fantasy', weight: '75g', price: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'marie-gold', name: 'Britannia Marie Gold', weight: '250g', price: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'bourbon', name: 'Britannia Bourbon', weight: '150g', price: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'monaco', name: 'Parle Monaco Salted', weight: '200g', price: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'unibic-choco', name: 'Unibic Choco Kiss', weight: '150g', price: 60, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
        { id: 'krackfill', name: 'KrackJack Sweet & Salty', weight: '200g', price: 30, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'dry-snacks', items: [
        { id: 'britannia-toast', name: 'Britannia Toastea Premium', weight: '300g', price: 40, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'haldirams-bhujia', name: 'Haldiram Bhujia Sev', weight: '400g', price: 105, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'mathri', name: 'Haldiram Punjabi Mathri', weight: '200g', price: 55, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'khari', name: 'Pune Special Khari', weight: '200g', price: 45, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'roasted-chana', name: 'Roasted Chana Salted', weight: '200g', price: 60, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'chana-jor', name: 'Chana Jor Garam', weight: '150g', price: 40, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'diet-chiwda', name: 'Diet Chiwda Mix', weight: '200g', price: 65, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'baker-rusk', name: 'Elite Milk Rusk', weight: '200g', price: 35, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'chakli', name: 'Haldiram Murukku / Chakli', weight: '200g', price: 60, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
        { id: 'namak-para', name: 'Namak Para Crispy', weight: '150g', price: 40, image: 'https://images.unsplash.com/photo-1600717535275-0b18ede2f7fc?w=300&h=300&fit=crop' },
      ]
    },
    {
      cat: 'ready-to-eat', items: [
        { id: 'haldirams-dal-makhani', name: 'Dal Makhani Ready to Eat', weight: '300g', price: 110, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'mtr-paneer', name: 'MTR Paneer Butter Masala', weight: '300g', price: 130, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'kitchens-of-india', name: 'KOI Pav Bhaji', weight: '285g', price: 99, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'mtr-rajma', name: 'MTR Rajma Masala', weight: '300g', price: 110, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'tata-q', name: 'Tata Q Spicy Chicken', weight: '330g', price: 150, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'itc-biryani', name: 'Kitchens of India Biryani', weight: '250g', price: 125, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'ashoka-palak', name: 'Ashoka Palak Paneer', weight: '280g', price: 115, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'kohinoor-dal', name: 'Kohinoor Dal Tadka', weight: '300g', price: 95, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'bikaner-chole', name: 'Bikanervala Chole', weight: '300g', price: 105, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
        { id: 'mtr-sambar', name: 'MTR Sambar Ready Mix', weight: '300g', price: 85, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop' },
      ]
    }
  ].flatMap(subcat => subcat.items.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    rating: Number((4 + Math.random()).toFixed(1)), // random rating 4-5
    category: subcat.cat,
    image: item.image,
    description: `${item.name} (${item.weight})`,
    stock: 50
  })))
,
  {
    id: 'prod-vegetables-fruits-1',
    name: 'Premium Fresh Greens Item 1',
    price: 159,
    rating: 4.1,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-2',
    name: 'Premium Fresh Greens Item 2',
    price: 365,
    rating: 4.2,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-3',
    name: 'Premium Fresh Greens Item 3',
    price: 267,
    rating: 4.4,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-4',
    name: 'Premium Fresh Greens Item 4',
    price: 222,
    rating: 4.8,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-5',
    name: 'Premium Fresh Greens Item 5',
    price: 108,
    rating: 4.3,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-6',
    name: 'Premium Fresh Greens Item 6',
    price: 303,
    rating: 4.5,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-7',
    name: 'Premium Fresh Greens Item 7',
    price: 140,
    rating: 4,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-8',
    name: 'Premium Fresh Greens Item 8',
    price: 262,
    rating: 4.9,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-9',
    name: 'Premium Fresh Greens Item 9',
    price: 102,
    rating: 4.2,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-vegetables-fruits-10',
    name: 'Premium Fresh Greens Item 10',
    price: 95,
    rating: 4.2,
    category: 'vegetables-fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
    description: 'High quality Fresh Greens product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-1',
    name: 'Premium Staple Foods Item 1',
    price: 152,
    rating: 4.9,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-2',
    name: 'Premium Staple Foods Item 2',
    price: 262,
    rating: 4.8,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-3',
    name: 'Premium Staple Foods Item 3',
    price: 228,
    rating: 4.3,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-4',
    name: 'Premium Staple Foods Item 4',
    price: 153,
    rating: 4.5,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-5',
    name: 'Premium Staple Foods Item 5',
    price: 325,
    rating: 4.2,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-6',
    name: 'Premium Staple Foods Item 6',
    price: 332,
    rating: 4.8,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-7',
    name: 'Premium Staple Foods Item 7',
    price: 352,
    rating: 4.4,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-8',
    name: 'Premium Staple Foods Item 8',
    price: 348,
    rating: 4.2,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-9',
    name: 'Premium Staple Foods Item 9',
    price: 211,
    rating: 4.1,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-atta-rice-dal-10',
    name: 'Premium Staple Foods Item 10',
    price: 269,
    rating: 4.7,
    category: 'atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1596646549247-512035ebffe8?w=300&h=300&fit=crop',
    description: 'High quality Staple Foods product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-1',
    name: 'Premium Spices & Oil Item 1',
    price: 429,
    rating: 4.4,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-2',
    name: 'Premium Spices & Oil Item 2',
    price: 139,
    rating: 4.4,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-3',
    name: 'Premium Spices & Oil Item 3',
    price: 218,
    rating: 4.7,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-4',
    name: 'Premium Spices & Oil Item 4',
    price: 213,
    rating: 4.8,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-5',
    name: 'Premium Spices & Oil Item 5',
    price: 168,
    rating: 4.5,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-6',
    name: 'Premium Spices & Oil Item 6',
    price: 294,
    rating: 4,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-7',
    name: 'Premium Spices & Oil Item 7',
    price: 77,
    rating: 4.9,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-8',
    name: 'Premium Spices & Oil Item 8',
    price: 334,
    rating: 4,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-9',
    name: 'Premium Spices & Oil Item 9',
    price: 102,
    rating: 4.8,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-oil-ghee-masala-10',
    name: 'Premium Spices & Oil Item 10',
    price: 427,
    rating: 4.6,
    category: 'oil-ghee-masala',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop',
    description: 'High quality Spices & Oil product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-1',
    name: 'Premium Morning Dairy Item 1',
    price: 339,
    rating: 4.8,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-2',
    name: 'Premium Morning Dairy Item 2',
    price: 407,
    rating: 4.3,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-3',
    name: 'Premium Morning Dairy Item 3',
    price: 387,
    rating: 4.9,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-4',
    name: 'Premium Morning Dairy Item 4',
    price: 358,
    rating: 4.3,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-5',
    name: 'Premium Morning Dairy Item 5',
    price: 255,
    rating: 4.7,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-6',
    name: 'Premium Morning Dairy Item 6',
    price: 67,
    rating: 4.4,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-7',
    name: 'Premium Morning Dairy Item 7',
    price: 442,
    rating: 4.1,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-8',
    name: 'Premium Morning Dairy Item 8',
    price: 94,
    rating: 4.5,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-9',
    name: 'Premium Morning Dairy Item 9',
    price: 135,
    rating: 4.3,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-dairy-bread-eggs-10',
    name: 'Premium Morning Dairy Item 10',
    price: 60,
    rating: 4.2,
    category: 'dairy-bread-eggs',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    description: 'High quality Morning Dairy product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-1',
    name: 'Premium Bakery Items Item 1',
    price: 414,
    rating: 4.9,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-2',
    name: 'Premium Bakery Items Item 2',
    price: 304,
    rating: 5,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-3',
    name: 'Premium Bakery Items Item 3',
    price: 119,
    rating: 4.8,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-4',
    name: 'Premium Bakery Items Item 4',
    price: 106,
    rating: 4.9,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-5',
    name: 'Premium Bakery Items Item 5',
    price: 88,
    rating: 4,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-6',
    name: 'Premium Bakery Items Item 6',
    price: 280,
    rating: 4.5,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-7',
    name: 'Premium Bakery Items Item 7',
    price: 251,
    rating: 4.9,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-8',
    name: 'Premium Bakery Items Item 8',
    price: 141,
    rating: 4.8,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-9',
    name: 'Premium Bakery Items Item 9',
    price: 81,
    rating: 4.2,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-bakery-biscuits-10',
    name: 'Premium Bakery Items Item 10',
    price: 408,
    rating: 5,
    category: 'bakery-biscuits',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
    description: 'High quality Bakery Items product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-1',
    name: 'Premium Nuts & Cereals Item 1',
    price: 398,
    rating: 4.7,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-2',
    name: 'Premium Nuts & Cereals Item 2',
    price: 228,
    rating: 4.5,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-3',
    name: 'Premium Nuts & Cereals Item 3',
    price: 219,
    rating: 5,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-4',
    name: 'Premium Nuts & Cereals Item 4',
    price: 303,
    rating: 4.6,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-5',
    name: 'Premium Nuts & Cereals Item 5',
    price: 97,
    rating: 4.6,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-6',
    name: 'Premium Nuts & Cereals Item 6',
    price: 61,
    rating: 4.8,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-7',
    name: 'Premium Nuts & Cereals Item 7',
    price: 68,
    rating: 4.7,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-8',
    name: 'Premium Nuts & Cereals Item 8',
    price: 149,
    rating: 4.3,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-9',
    name: 'Premium Nuts & Cereals Item 9',
    price: 143,
    rating: 4.7,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-dry-fruits-cereals-10',
    name: 'Premium Nuts & Cereals Item 10',
    price: 446,
    rating: 4.7,
    category: 'dry-fruits-cereals',
    image: 'https://images.unsplash.com/photo-1596316239121-a3f2d2bdecff?w=300&h=300&fit=crop',
    description: 'High quality Nuts & Cereals product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-1',
    name: 'Premium Fresh Meat Item 1',
    price: 129,
    rating: 4.6,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-2',
    name: 'Premium Fresh Meat Item 2',
    price: 56,
    rating: 4.9,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-3',
    name: 'Premium Fresh Meat Item 3',
    price: 385,
    rating: 4.1,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-4',
    name: 'Premium Fresh Meat Item 4',
    price: 313,
    rating: 4.6,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-5',
    name: 'Premium Fresh Meat Item 5',
    price: 416,
    rating: 4.1,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-6',
    name: 'Premium Fresh Meat Item 6',
    price: 209,
    rating: 4.7,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-7',
    name: 'Premium Fresh Meat Item 7',
    price: 206,
    rating: 4.3,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-8',
    name: 'Premium Fresh Meat Item 8',
    price: 300,
    rating: 4.1,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-9',
    name: 'Premium Fresh Meat Item 9',
    price: 382,
    rating: 4.8,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-chicken-meat-fish-10',
    name: 'Premium Fresh Meat Item 10',
    price: 406,
    rating: 4.5,
    category: 'chicken-meat-fish',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300&h=300&fit=crop',
    description: 'High quality Fresh Meat product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-1',
    name: 'Premium Kitchen Tools Item 1',
    price: 423,
    rating: 4,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-2',
    name: 'Premium Kitchen Tools Item 2',
    price: 87,
    rating: 4.8,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-3',
    name: 'Premium Kitchen Tools Item 3',
    price: 142,
    rating: 4.6,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-4',
    name: 'Premium Kitchen Tools Item 4',
    price: 165,
    rating: 4.8,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-5',
    name: 'Premium Kitchen Tools Item 5',
    price: 177,
    rating: 4.8,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-6',
    name: 'Premium Kitchen Tools Item 6',
    price: 152,
    rating: 4.1,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-7',
    name: 'Premium Kitchen Tools Item 7',
    price: 143,
    rating: 4.2,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-8',
    name: 'Premium Kitchen Tools Item 8',
    price: 316,
    rating: 4.2,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-9',
    name: 'Premium Kitchen Tools Item 9',
    price: 265,
    rating: 4.7,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-kitchenware-appliances-10',
    name: 'Premium Kitchen Tools Item 10',
    price: 334,
    rating: 4.8,
    category: 'kitchenware-appliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&h=300&fit=crop',
    description: 'High quality Kitchen Tools product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-1',
    name: 'Premium Frozen Snacks Item 1',
    price: 403,
    rating: 4.2,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-2',
    name: 'Premium Frozen Snacks Item 2',
    price: 214,
    rating: 4.8,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-3',
    name: 'Premium Frozen Snacks Item 3',
    price: 357,
    rating: 4.9,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-4',
    name: 'Premium Frozen Snacks Item 4',
    price: 54,
    rating: 4.7,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-5',
    name: 'Premium Frozen Snacks Item 5',
    price: 317,
    rating: 4.2,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-6',
    name: 'Premium Frozen Snacks Item 6',
    price: 201,
    rating: 4.3,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-7',
    name: 'Premium Frozen Snacks Item 7',
    price: 108,
    rating: 4.5,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-8',
    name: 'Premium Frozen Snacks Item 8',
    price: 367,
    rating: 5,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-9',
    name: 'Premium Frozen Snacks Item 9',
    price: 282,
    rating: 4.2,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-frozen-foods-10',
    name: 'Premium Frozen Snacks Item 10',
    price: 169,
    rating: 4.4,
    category: 'frozen-foods',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=300&fit=crop',
    description: 'High quality Frozen Snacks product.',
    stock: 50
  },
  {
    id: 'prod-organic-1',
    name: 'Premium Organic Range Item 1',
    price: 234,
    rating: 4.1,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-2',
    name: 'Premium Organic Range Item 2',
    price: 83,
    rating: 4,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-3',
    name: 'Premium Organic Range Item 3',
    price: 356,
    rating: 4.2,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-4',
    name: 'Premium Organic Range Item 4',
    price: 404,
    rating: 4.2,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-5',
    name: 'Premium Organic Range Item 5',
    price: 408,
    rating: 4.9,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-6',
    name: 'Premium Organic Range Item 6',
    price: 410,
    rating: 4.1,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-7',
    name: 'Premium Organic Range Item 7',
    price: 56,
    rating: 4.3,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-8',
    name: 'Premium Organic Range Item 8',
    price: 317,
    rating: 4.1,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-9',
    name: 'Premium Organic Range Item 9',
    price: 270,
    rating: 4.3,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-organic-10',
    name: 'Premium Organic Range Item 10',
    price: 287,
    rating: 4.6,
    category: 'organic',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=300&fit=crop',
    description: 'High quality Organic Range product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-1',
    name: 'Premium Cleaning Essentials Item 1',
    price: 312,
    rating: 4.7,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-2',
    name: 'Premium Cleaning Essentials Item 2',
    price: 95,
    rating: 4.7,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-3',
    name: 'Premium Cleaning Essentials Item 3',
    price: 149,
    rating: 4.1,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-4',
    name: 'Premium Cleaning Essentials Item 4',
    price: 317,
    rating: 4.4,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-5',
    name: 'Premium Cleaning Essentials Item 5',
    price: 86,
    rating: 4.7,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-6',
    name: 'Premium Cleaning Essentials Item 6',
    price: 50,
    rating: 4.1,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-7',
    name: 'Premium Cleaning Essentials Item 7',
    price: 329,
    rating: 4.7,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-8',
    name: 'Premium Cleaning Essentials Item 8',
    price: 399,
    rating: 4.7,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-9',
    name: 'Premium Cleaning Essentials Item 9',
    price: 245,
    rating: 4.7,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-cleaning-supplies-10',
    name: 'Premium Cleaning Essentials Item 10',
    price: 309,
    rating: 4.5,
    category: 'cleaning-supplies',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c11867c?w=300&h=300&fit=crop',
    description: 'High quality Cleaning Essentials product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-1',
    name: 'Premium Pet Food Item 1',
    price: 348,
    rating: 4.8,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-2',
    name: 'Premium Pet Food Item 2',
    price: 189,
    rating: 4,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-3',
    name: 'Premium Pet Food Item 3',
    price: 267,
    rating: 4.1,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-4',
    name: 'Premium Pet Food Item 4',
    price: 275,
    rating: 4.7,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-5',
    name: 'Premium Pet Food Item 5',
    price: 368,
    rating: 5,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-6',
    name: 'Premium Pet Food Item 6',
    price: 106,
    rating: 4.3,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-7',
    name: 'Premium Pet Food Item 7',
    price: 87,
    rating: 4.5,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-8',
    name: 'Premium Pet Food Item 8',
    price: 58,
    rating: 4.9,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-9',
    name: 'Premium Pet Food Item 9',
    price: 371,
    rating: 4.1,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-pet-care-10',
    name: 'Premium Pet Food Item 10',
    price: 427,
    rating: 4.9,
    category: 'pet-care',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
    description: 'High quality Pet Food product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-1',
    name: 'Premium Body Wash Item 1',
    price: 290,
    rating: 4.8,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-2',
    name: 'Premium Body Wash Item 2',
    price: 445,
    rating: 4.8,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-3',
    name: 'Premium Body Wash Item 3',
    price: 275,
    rating: 4.6,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-4',
    name: 'Premium Body Wash Item 4',
    price: 200,
    rating: 4,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-5',
    name: 'Premium Body Wash Item 5',
    price: 442,
    rating: 4.2,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-6',
    name: 'Premium Body Wash Item 6',
    price: 198,
    rating: 4.1,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-7',
    name: 'Premium Body Wash Item 7',
    price: 110,
    rating: 4.3,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-8',
    name: 'Premium Body Wash Item 8',
    price: 241,
    rating: 4.7,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-9',
    name: 'Premium Body Wash Item 9',
    price: 381,
    rating: 4.6,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-bath-body-10',
    name: 'Premium Body Wash Item 10',
    price: 438,
    rating: 4.2,
    category: 'bath-body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=300&h=300&fit=crop',
    description: 'High quality Body Wash product.',
    stock: 50
  },
  {
    id: 'prod-hair-1',
    name: 'Premium Hair Care Item 1',
    price: 391,
    rating: 4.2,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-2',
    name: 'Premium Hair Care Item 2',
    price: 121,
    rating: 4.4,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-3',
    name: 'Premium Hair Care Item 3',
    price: 228,
    rating: 4.2,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-4',
    name: 'Premium Hair Care Item 4',
    price: 328,
    rating: 4.7,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-5',
    name: 'Premium Hair Care Item 5',
    price: 389,
    rating: 4.1,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-6',
    name: 'Premium Hair Care Item 6',
    price: 260,
    rating: 5,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-7',
    name: 'Premium Hair Care Item 7',
    price: 371,
    rating: 4.2,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-8',
    name: 'Premium Hair Care Item 8',
    price: 226,
    rating: 4.4,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-9',
    name: 'Premium Hair Care Item 9',
    price: 253,
    rating: 4,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-hair-10',
    name: 'Premium Hair Care Item 10',
    price: 110,
    rating: 4.7,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&h=300&fit=crop',
    description: 'High quality Hair Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-1',
    name: 'Premium Skin Care Item 1',
    price: 324,
    rating: 4.6,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-2',
    name: 'Premium Skin Care Item 2',
    price: 418,
    rating: 4.3,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-3',
    name: 'Premium Skin Care Item 3',
    price: 251,
    rating: 4.4,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-4',
    name: 'Premium Skin Care Item 4',
    price: 137,
    rating: 4.2,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-5',
    name: 'Premium Skin Care Item 5',
    price: 190,
    rating: 4.9,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-6',
    name: 'Premium Skin Care Item 6',
    price: 62,
    rating: 4,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-7',
    name: 'Premium Skin Care Item 7',
    price: 303,
    rating: 4.6,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-8',
    name: 'Premium Skin Care Item 8',
    price: 376,
    rating: 4.8,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-9',
    name: 'Premium Skin Care Item 9',
    price: 247,
    rating: 4.3,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-skin-face-10',
    name: 'Premium Skin Care Item 10',
    price: 281,
    rating: 4.8,
    category: 'skin-face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop',
    description: 'High quality Skin Care product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-1',
    name: 'Premium Cosmetics Item 1',
    price: 51,
    rating: 4.5,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-2',
    name: 'Premium Cosmetics Item 2',
    price: 144,
    rating: 4.4,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-3',
    name: 'Premium Cosmetics Item 3',
    price: 434,
    rating: 4.3,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-4',
    name: 'Premium Cosmetics Item 4',
    price: 277,
    rating: 4.9,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-5',
    name: 'Premium Cosmetics Item 5',
    price: 407,
    rating: 4.6,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-6',
    name: 'Premium Cosmetics Item 6',
    price: 352,
    rating: 4.1,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-7',
    name: 'Premium Cosmetics Item 7',
    price: 59,
    rating: 4,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-8',
    name: 'Premium Cosmetics Item 8',
    price: 345,
    rating: 4.3,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-9',
    name: 'Premium Cosmetics Item 9',
    price: 214,
    rating: 4.9,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-beauty-cosmetics-10',
    name: 'Premium Cosmetics Item 10',
    price: 364,
    rating: 4.6,
    category: 'beauty-cosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
    description: 'High quality Cosmetics product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-1',
    name: 'Premium Hygiene Item 1',
    price: 183,
    rating: 4.4,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-2',
    name: 'Premium Hygiene Item 2',
    price: 386,
    rating: 5,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-3',
    name: 'Premium Hygiene Item 3',
    price: 292,
    rating: 4,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-4',
    name: 'Premium Hygiene Item 4',
    price: 397,
    rating: 4.3,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-5',
    name: 'Premium Hygiene Item 5',
    price: 360,
    rating: 4.4,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-6',
    name: 'Premium Hygiene Item 6',
    price: 218,
    rating: 4.4,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-7',
    name: 'Premium Hygiene Item 7',
    price: 265,
    rating: 4.7,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-8',
    name: 'Premium Hygiene Item 8',
    price: 186,
    rating: 4.9,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-9',
    name: 'Premium Hygiene Item 9',
    price: 289,
    rating: 4.9,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-feminine-hygiene-10',
    name: 'Premium Hygiene Item 10',
    price: 84,
    rating: 5,
    category: 'feminine-hygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=300&h=300&fit=crop',
    description: 'High quality Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-1',
    name: 'Premium Baby Care Item 1',
    price: 208,
    rating: 4.3,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-2',
    name: 'Premium Baby Care Item 2',
    price: 64,
    rating: 4.9,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-3',
    name: 'Premium Baby Care Item 3',
    price: 332,
    rating: 4.1,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-4',
    name: 'Premium Baby Care Item 4',
    price: 436,
    rating: 4.7,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-5',
    name: 'Premium Baby Care Item 5',
    price: 416,
    rating: 4.3,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-6',
    name: 'Premium Baby Care Item 6',
    price: 414,
    rating: 4.5,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-7',
    name: 'Premium Baby Care Item 7',
    price: 241,
    rating: 4.7,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-8',
    name: 'Premium Baby Care Item 8',
    price: 78,
    rating: 5,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-9',
    name: 'Premium Baby Care Item 9',
    price: 310,
    rating: 4.5,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-baby-care-10',
    name: 'Premium Baby Care Item 10',
    price: 194,
    rating: 4.7,
    category: 'baby-care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=300&h=300&fit=crop',
    description: 'High quality Baby Care product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-1',
    name: 'Premium Health Supplements Item 1',
    price: 141,
    rating: 4.8,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-2',
    name: 'Premium Health Supplements Item 2',
    price: 300,
    rating: 4.6,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-3',
    name: 'Premium Health Supplements Item 3',
    price: 247,
    rating: 4.2,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-4',
    name: 'Premium Health Supplements Item 4',
    price: 90,
    rating: 4.5,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-5',
    name: 'Premium Health Supplements Item 5',
    price: 182,
    rating: 4.8,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-6',
    name: 'Premium Health Supplements Item 6',
    price: 161,
    rating: 4.3,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-7',
    name: 'Premium Health Supplements Item 7',
    price: 405,
    rating: 4.9,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-8',
    name: 'Premium Health Supplements Item 8',
    price: 102,
    rating: 4.3,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-9',
    name: 'Premium Health Supplements Item 9',
    price: 388,
    rating: 4.1,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-health-pharma-10',
    name: 'Premium Health Supplements Item 10',
    price: 309,
    rating: 4.9,
    category: 'health-pharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=300&h=300&fit=crop',
    description: 'High quality Health Supplements product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-1',
    name: 'Premium Wellness Item 1',
    price: 253,
    rating: 4.3,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-2',
    name: 'Premium Wellness Item 2',
    price: 92,
    rating: 4.4,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-3',
    name: 'Premium Wellness Item 3',
    price: 252,
    rating: 4.6,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-4',
    name: 'Premium Wellness Item 4',
    price: 181,
    rating: 4.1,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-5',
    name: 'Premium Wellness Item 5',
    price: 411,
    rating: 5,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-6',
    name: 'Premium Wellness Item 6',
    price: 206,
    rating: 4.8,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-7',
    name: 'Premium Wellness Item 7',
    price: 69,
    rating: 4.8,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-8',
    name: 'Premium Wellness Item 8',
    price: 151,
    rating: 4.2,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-9',
    name: 'Premium Wellness Item 9',
    price: 335,
    rating: 4.3,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-sexual-wellness-10',
    name: 'Premium Wellness Item 10',
    price: 57,
    rating: 4.7,
    category: 'sexual-wellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=300&h=300&fit=crop',
    description: 'High quality Wellness product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-1',
    name: 'Premium Deodorants Item 1',
    price: 396,
    rating: 4.7,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-2',
    name: 'Premium Deodorants Item 2',
    price: 347,
    rating: 4.2,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-3',
    name: 'Premium Deodorants Item 3',
    price: 227,
    rating: 4,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-4',
    name: 'Premium Deodorants Item 4',
    price: 299,
    rating: 4,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-5',
    name: 'Premium Deodorants Item 5',
    price: 247,
    rating: 4.5,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-6',
    name: 'Premium Deodorants Item 6',
    price: 93,
    rating: 4.3,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-7',
    name: 'Premium Deodorants Item 7',
    price: 316,
    rating: 4.5,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-8',
    name: 'Premium Deodorants Item 8',
    price: 348,
    rating: 4.8,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-9',
    name: 'Premium Deodorants Item 9',
    price: 249,
    rating: 4.5,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-fragrances-10',
    name: 'Premium Deodorants Item 10',
    price: 211,
    rating: 4.5,
    category: 'fragrances',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=300&h=300&fit=crop',
    description: 'High quality Deodorants product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-1',
    name: 'Premium Oral Hygiene Item 1',
    price: 177,
    rating: 4.5,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-2',
    name: 'Premium Oral Hygiene Item 2',
    price: 157,
    rating: 4.7,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-3',
    name: 'Premium Oral Hygiene Item 3',
    price: 325,
    rating: 4.9,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-4',
    name: 'Premium Oral Hygiene Item 4',
    price: 266,
    rating: 4.7,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-5',
    name: 'Premium Oral Hygiene Item 5',
    price: 371,
    rating: 4.8,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-6',
    name: 'Premium Oral Hygiene Item 6',
    price: 280,
    rating: 4.5,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-7',
    name: 'Premium Oral Hygiene Item 7',
    price: 136,
    rating: 4.9,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-8',
    name: 'Premium Oral Hygiene Item 8',
    price: 110,
    rating: 4.8,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-9',
    name: 'Premium Oral Hygiene Item 9',
    price: 84,
    rating: 4.6,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-oral-care-10',
    name: 'Premium Oral Hygiene Item 10',
    price: 274,
    rating: 4.1,
    category: 'oral-care',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&h=300&fit=crop',
    description: 'High quality Oral Hygiene product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-1',
    name: 'Premium Eye Accessories Item 1',
    price: 143,
    rating: 4.5,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-2',
    name: 'Premium Eye Accessories Item 2',
    price: 290,
    rating: 4.1,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-3',
    name: 'Premium Eye Accessories Item 3',
    price: 121,
    rating: 4.2,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-4',
    name: 'Premium Eye Accessories Item 4',
    price: 298,
    rating: 4.3,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-5',
    name: 'Premium Eye Accessories Item 5',
    price: 345,
    rating: 4.9,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-6',
    name: 'Premium Eye Accessories Item 6',
    price: 94,
    rating: 4.5,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-7',
    name: 'Premium Eye Accessories Item 7',
    price: 267,
    rating: 4.6,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-8',
    name: 'Premium Eye Accessories Item 8',
    price: 329,
    rating: 4.9,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-9',
    name: 'Premium Eye Accessories Item 9',
    price: 245,
    rating: 4.1,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-eye-care-10',
    name: 'Premium Eye Accessories Item 10',
    price: 96,
    rating: 4.3,
    category: 'eye-care',
    image: 'https://images.unsplash.com/photo-1559563099-641a2d6c8db7?w=300&h=300&fit=crop',
    description: 'High quality Eye Accessories product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-1',
    name: 'Premium Mens Grooming Item 1',
    price: 443,
    rating: 4.3,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-2',
    name: 'Premium Mens Grooming Item 2',
    price: 357,
    rating: 4.8,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-3',
    name: 'Premium Mens Grooming Item 3',
    price: 106,
    rating: 4.4,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-4',
    name: 'Premium Mens Grooming Item 4',
    price: 326,
    rating: 4.8,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-5',
    name: 'Premium Mens Grooming Item 5',
    price: 132,
    rating: 4.9,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-6',
    name: 'Premium Mens Grooming Item 6',
    price: 362,
    rating: 4.4,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-7',
    name: 'Premium Mens Grooming Item 7',
    price: 58,
    rating: 4.6,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-8',
    name: 'Premium Mens Grooming Item 8',
    price: 204,
    rating: 5,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-9',
    name: 'Premium Mens Grooming Item 9',
    price: 139,
    rating: 4.8,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  },
  {
    id: 'prod-mens-grooming-10',
    name: 'Premium Mens Grooming Item 10',
    price: 277,
    rating: 4.4,
    category: 'mens-grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=300&fit=crop',
    description: 'High quality Mens Grooming product.',
    stock: 50
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  );
};
