// Структура для моковых данных товаров
export type Product = {
  id: string;
  slug: string; // для url
  title: string;
  category: string[]; // путь категорий
  images: string[];
  variants: Array<{
    name: string;
    images: string[];
  }>;
  sizes: Array<{
    label: string;
    dimensions: string;
  }>;
  price: number;
  oldPrice?: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  article: string;
  composition: string;
  dimensions: string;
  weight: string;
  description: string;
  characteristics: Array<{ label: string; value: string }>;
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'dragon-glass',
    title: 'Дракон из стекла',
    category: ['Фигурки', 'Фэнтези', 'Драконы'],
    images: [
      '/card-image1.png',
      '/banner-image.png',
      '/card-image1.png',
      '/card-image1.png',
      '/card-image1.png',
      '/card-image1.png',
      '/card-image1.png',
    ],
    variants: [
      { name: 'оригинал', images: [
        '/card-image1.png',
        '/card-image2.png',
        '/banner-image.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
      ] },
      { name: 'чёрный', images: [
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
      ] },
      { name: 'тёмный', images: [
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
      ] },
      { name: 'ночь', images: [
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
      ] },
      { name: 'утро', images: [
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
      ] },
      { name: 'нефть', images: [
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
        '/card-image1.png',
      ] },
    ],
    sizes: [
      { label: '40', dimensions: '40 см X 30 см X 20 см' },
      { label: '20', dimensions: '20 см X 15 см X 10 см' },
      { label: '15', dimensions: '15 см X 10 см X 7 см' },
    ],
    price: 2000,
    oldPrice: 2900,
    stock: 2,
    rating: 5.0,
    reviewsCount: 526,
    article: '1232130545',
    composition: 'Высококачественное стекло',
    dimensions: '40 см X 30 см X 20 см',
    weight: '40.2 г.',
    description: 'Уникальный стеклянный дракон, выполненный вручную. Прекрасно подойдёт для коллекции или подарка.',
    characteristics: [
      { label: 'Артикул', value: '1232130545' },
      { label: 'Состав', value: 'Высококачественное стекло' },
      { label: 'Размеры', value: '40 см X 30 см X 20 см' },
      { label: 'Вес', value: '40.2 г.' },
    ],
  },
  {
    id: '2',
    slug: 'unicorn-glass',
    title: 'Единорог из стекла',
    category: ['Фигурки', 'Фэнтези', 'Единороги'],
    images: [
      '/images/unicorn1.jpg',
      '/images/unicorn2.jpg',
      '/images/unicorn3.jpg',
    ],
    variants: [
      { name: 'белый', images: ['/images/unicorn1.jpg'] },
      { name: 'розовый', images: ['/images/unicorn2.jpg'] },
      { name: 'фиолетовый', images: ['/images/unicorn3.jpg'] },
    ],
    sizes: [
      { label: '25', dimensions: '25 см X 18 см X 10 см' },
      { label: '15', dimensions: '15 см X 10 см X 6 см' },
    ],
    price: 1700,
    oldPrice: 2100,
    stock: 70,
    rating: 4.8,
    reviewsCount: 312,
    article: '1232130546',
    composition: 'Стекло, ручная работа',
    dimensions: '25 см X 18 см X 10 см',
    weight: '28.5 г.',
    description: 'Очаровательный единорог из стекла, символ чистоты и волшебства.',
    characteristics: [
      { label: 'Артикул', value: '1232130546' },
      { label: 'Состав', value: 'Стекло, ручная работа' },
      { label: 'Размеры', value: '25 см X 18 см X 10 см' },
      { label: 'Вес', value: '28.5 г.' },
    ],
  },
  {
    id: '3',
    slug: 'cat-glass',
    title: 'Кот из стекла',
    category: ['Фигурки', 'Животные', 'Коты'],
    images: [
      '/images/cat1.jpg',
      '/images/cat2.jpg',
    ],
    variants: [
      { name: 'чёрный', images: ['/images/cat1.jpg'] },
      { name: 'белый', images: ['/images/cat2.jpg'] },
    ],
    sizes: [
      { label: '12', dimensions: '12 см X 8 см X 5 см' },
    ],
    price: 950,
    oldPrice: 1200,
    stock: 12,
    rating: 4.9,
    reviewsCount: 98,
    article: '1232130547',
    composition: 'Стекло',
    dimensions: '12 см X 8 см X 5 см',
    weight: '12.1 г.',
    description: 'Милый котик из стекла, отличный подарок для любителей животных.',
    characteristics: [
      { label: 'Артикул', value: '1232130547' },
      { label: 'Состав', value: 'Стекло' },
      { label: 'Размеры', value: '12 см X 8 см X 5 см' },
      { label: 'Вес', value: '12.1 г.' },
    ],
  },
  {
    id: '4',
    slug: 'rose-glass',
    title: 'Роза из стекла',
    category: ['Фигурки', 'Растения', 'Цветы'],
    images: [
      '/images/rose1.jpg',
      '/images/rose2.jpg',
    ],
    variants: [
      { name: 'красная', images: ['/images/rose1.jpg'] },
      { name: 'жёлтая', images: ['/images/rose2.jpg'] },
    ],
    sizes: [
      { label: '18', dimensions: '18 см X 5 см X 5 см' },
    ],
    price: 1100,
    oldPrice: 1400,
    stock: 5,
    rating: 4.7,
    reviewsCount: 54,
    article: '1232130548',
    composition: 'Стекло, цветной пигмент',
    dimensions: '18 см X 5 см X 5 см',
    weight: '9.8 г.',
    description: 'Изящная роза из стекла, символ любви и красоты.',
    characteristics: [
      { label: 'Артикул', value: '1232130548' },
      { label: 'Состав', value: 'Стекло, цветной пигмент' },
      { label: 'Размеры', value: '18 см X 5 см X 5 см' },
      { label: 'Вес', value: '9.8 г.' },
    ],
  },
  {
    id: '5',
    slug: 'bracelet-glass',
    title: 'Браслет из стекла',
    category: ['Украшения', 'Браслеты'],
    images: [
      '/images/bracelet1.jpg',
      '/images/bracelet2.jpg',
    ],
    variants: [
      { name: 'синий', images: ['/images/bracelet1.jpg'] },
      { name: 'зелёный', images: ['/images/bracelet2.jpg'] },
    ],
    sizes: [
      { label: '7', dimensions: '7 см X 7 см X 1 см' },
    ],
    price: 600,
    oldPrice: 900,
    stock: 20,
    rating: 4.6,
    reviewsCount: 41,
    article: '1232130549',
    composition: 'Стекло, металл',
    dimensions: '7 см X 7 см X 1 см',
    weight: '4.2 г.',
    description: 'Яркий браслет из стекла, стильный аксессуар для любого образа.',
    characteristics: [
      { label: 'Артикул', value: '1232130549' },
      { label: 'Состав', value: 'Стекло, металл' },
      { label: 'Размеры', value: '7 см X 7 см X 1 см' },
      { label: 'Вес', value: '4.2 г.' },
    ],
  },
  {
    id: '6',
    slug: 'vase-glass',
    title: 'Ваза из стекла',
    category: ['Прочее', 'Вазы'],
    images: [
      '/images/vase1.jpg',
      '/images/vase2.jpg',
    ],
    variants: [
      { name: 'прозрачная', images: ['/images/vase1.jpg'] },
      { name: 'синяя', images: ['/images/vase2.jpg'] },
    ],
    sizes: [
      { label: '30', dimensions: '30 см X 12 см X 12 см' },
    ],
    price: 2100,
    oldPrice: 2500,
    stock: 3,
    rating: 4.5,
    reviewsCount: 22,
    article: '1232130550',
    composition: 'Стекло',
    dimensions: '30 см X 12 см X 12 см',
    weight: '32.0 г.',
    description: 'Элегантная ваза из стекла для цветов и декора.',
    characteristics: [
      { label: 'Артикул', value: '1232130550' },
      { label: 'Состав', value: 'Стекло' },
      { label: 'Размеры', value: '30 см X 12 см X 12 см' },
      { label: 'Вес', value: '32.0 г.' },
    ],
  },
];

// Генерация дополнительных товаров для теста
const extraProducts: Product[] = [];
const categories = [
  ['Фигурки', 'Животные', 'Слоны'],
  ['Фигурки', 'Животные', 'Собаки'],
  ['Фигурки', 'Животные', 'Птицы'],
  ['Фигурки', 'Фэнтези', 'Гномы'],
  ['Фигурки', 'Фэнтези', 'Фениксы'],
  ['Украшения', 'Кулоны'],
  ['Украшения', 'Серьги'],
  ['Украшения', 'Броши'],
  ['Растения', 'Цветы', 'Тюльпаны'],
  ['Растения', 'Деревья'],
  ['Прочее', 'Вазы'],
  ['Прочее', 'Статуэтки'],
];
const names = [
  'Слон', 'Собака', 'Птица', 'Гном', 'Феникс', 'Кулон', 'Серьги', 'Брошь', 'Тюльпан', 'Дерево', 'Ваза', 'Статуэтка',
];
const variants = [
  ['оригинал', 'золотой', 'серебряный'],
  ['малый', 'средний', 'большой'],
  ['красный', 'синий', 'зелёный'],
  ['ночь', 'день', 'утро'],
];
for (let i = 0; i < 30; i++) {
  const catIdx = i % categories.length;
  const name = names[catIdx];
  const slug = `${name.toLowerCase()}-${i+10}`.replace(/[^a-z0-9-]/gi, '');
  const variantList = variants[i % variants.length];
  extraProducts.push({
    id: `${i+10}`,
    slug,
    title: `${name} из стекла #${i+1}`,
    category: categories[catIdx],
    images: variantList.map((v, idx) => `/images/${slug}-v${idx+1}.jpg`),
    variants: variantList.map((v, idx) => ({ name: v, images: [`/images/${slug}-v${idx+1}.jpg`] })),
    sizes: [
      { label: '10', dimensions: '10 см X 5 см X 5 см' },
      { label: '20', dimensions: '20 см X 10 см X 10 см' },
    ],
    price: 800 + (i * 37) % 2000,
    oldPrice: i % 3 === 0 ? 1000 + (i * 41) % 2500 : undefined,
    stock: (i * 2) % 13 + 1,
    rating: 4.5 + (i % 5) * 0.1,
    reviewsCount: 20 + (i * 7) % 200,
    article: `ART${i+1000}`,
    composition: 'Стекло, ручная работа',
    dimensions: '10-20 см',
    weight: `${8 + i} г.`,
    description: `Уникальный ${name.toLowerCase()} из стекла, выполненный вручную. Отличный подарок и украшение интерьера.`,
    characteristics: [
      { label: 'Артикул', value: `ART${i+1000}` },
      { label: 'Состав', value: 'Стекло, ручная работа' },
      { label: 'Размеры', value: '10-20 см' },
      { label: 'Вес', value: `${8 + i} г.` },
    ],
  });
}
products.push(...extraProducts);