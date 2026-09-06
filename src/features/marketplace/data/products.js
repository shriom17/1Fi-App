const MOCK_PRODUCTS = [
  {
    id: 'laptop',
    name: 'MacBook Air M3',
    description: 'Supercharged by Apple silicon',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85',
    variants: [
      { id: 'base', label: '8GB / 256GB', price: 99900 },
      { id: 'pro', label: '16GB / 512GB', price: 124900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'phone',
    name: 'iPhone 16',
    description: 'A total powerhouse in your pocket',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&q=85',
    variants: [
      { id: '128gb', label: '128GB', price: 79900 },
      { id: '256gb', label: '256GB', price: 89900 },
      { id: '512gb', label: '512GB', price: 109900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'television',
    name: 'Samsung Smart TV',
    description: 'Immersive 4K entertainment at home',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900&q=85',
    variants: [
      { id: '43inch', label: '43 inch / 4K', price: 34990 },
      { id: '55inch', label: '55 inch / 4K', price: 52990 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'smartwatch',
    name: 'Apple Watch Series 10',
    description: 'A healthier, more active you',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=900&q=85',
    variants: [
      { id: 'aluminium', label: 'Aluminium / 42mm', price: 46900 },
      { id: 'titanium', label: 'Titanium / 46mm', price: 79900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'tablet',
    name: 'iPad Air',
    description: 'Powerful creativity, wherever you go',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&q=85',
    variants: [
      { id: 'wifi128', label: 'Wi-Fi / 128GB', price: 59900 },
      { id: 'cellular256', label: 'Cellular / 256GB', price: 84900 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'headphones',
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise cancellation',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&q=85',
    variants: [
      { id: 'black', label: 'Black', price: 29990 },
      { id: 'silver', label: 'Silver', price: 31990 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'gaming-console',
    name: 'PlayStation 5',
    description: 'Lightning-fast gaming with immersive play',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=900&q=85',
    variants: [
      { id: 'digital', label: 'Digital Edition', price: 44990 },
      { id: 'disc', label: 'Disc Edition', price: 54990 },
    ],
    emiPlans: [3, 6, 12],
  },
  {
    id: 'camera',
    name: 'Canon EOS R50',
    description: 'Capture your stories in stunning detail',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85',
    variants: [
      { id: 'body', label: 'Body Only', price: 67990 },
      { id: 'kit', label: '18-45mm Kit', price: 74990 },
    ],
    emiPlans: [3, 6, 12],
  },
];

export default MOCK_PRODUCTS;
