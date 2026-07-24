export interface Product {
  id: string;
  name: string;
  category: string;
  department: 'men' | 'women' | 'unisex';
  price: number;
  description: string;
  image: string;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'WINTER JACKET',
    category: 'OWL ORANGE',
    department: 'men',
    price: 320.00,
    description: 'Stay warm and stylish with this premium orange winter jacket. Crafted with high-quality materials to provide superior insulation and a modern aesthetic.',
    image: '/images/orange_jacket.png',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p2',
    name: 'SUN GLASS WMN',
    category: 'GOLD FINISH',
    department: 'women',
    price: 180.00,
    description: 'Elevate your look with these striking yellow round sunglasses. Featuring a premium gold finish frame, perfect for sunny days and bold fashion statements.',
    image: '/images/purple_sweater.png',
    sizes: ['ONE SIZE']
  },
  {
    id: 'p3',
    name: 'SUIT FOR MEN',
    category: 'RED MODEL',
    department: 'men',
    price: 550.00,
    description: 'A sharp, sophisticated red suit jacket tailored to perfection. Combine classic elegance with contemporary fashion for your most important events.',
    image: '/images/red_suit.png',
    sizes: ['38R', '40R', '42R', '44R']
  },
  {
    id: 'p4',
    name: 'SUN GLASS 45VR',
    category: 'WHITE',
    department: 'men',
    price: 450.00,
    description: 'Step out in confidence with Sun Glass 45VR, crafted for those who love sleek design and superior comfort. Featuring UV400 protection, scratch-resistant lenses, and a lightweight frame, these sunglasses perfectly blend fashion and function.',
    image: '/images/white_sunglasses.png',
    sizes: ['ONE SIZE']
  },
  {
    id: 'p5',
    name: 'SUMMER DRESS',
    category: 'FLOWING ELEGANCE',
    department: 'women',
    price: 240.00,
    description: 'A beautifully flowing summer dress made from lightweight, breathable fabric. Perfect for warm evenings and upscale casual events.',
    image: '/images/women_dress.png',
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'p6',
    name: 'LEATHER JACKET',
    category: 'EDGY BLACK',
    department: 'women',
    price: 680.00,
    description: 'Classic black leather jacket with an edgy, modern cut. Features premium hardware and supple full-grain leather that molds to your shape over time.',
    image: '/images/women_leather.png',
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'p7',
    name: 'CASUAL LINEN SHIRT',
    category: 'RELAXED FIT',
    department: 'men',
    price: 145.00,
    description: 'The ultimate casual linen shirt for a relaxed, premium look. Garment-washed for extra softness and a perfectly broken-in feel from day one.',
    image: '/images/men_casual.png',
    sizes: ['M', 'L', 'XL', 'XXL']
  },
  {
    id: 'p8',
    name: 'DENIM JACKET',
    category: 'CLASSIC BLUE',
    department: 'men',
    price: 210.00,
    description: 'A timeless staple. This classic blue denim jacket features reinforced stitching, custom hardware, and a fit that looks good on everyone.',
    image: '/images/men_denim.png',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'p9',
    name: 'TRENDY SNEAKERS',
    category: 'STREET WEAR',
    department: 'unisex',
    price: 150.00,
    description: 'High fashion trendy modern sneakers with a sleek design and vibrant colors. Perfect for completing a stylish streetwear look.',
    image: '/images/trendy_sneakers.png',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
  },
  {
    id: 'p10',
    name: 'LUXURY WATCH',
    category: 'PREMIUM ACCESSORY',
    department: 'unisex',
    price: 1200.00,
    description: 'A luxury modern wristwatch with a sleek metallic design. Engineered with precision and designed to make a statement.',
    image: '/images/stylish_watch.png',
    sizes: ['ONE SIZE']
  }
];
