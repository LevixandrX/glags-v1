export type Product = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  size: string;
  count: number;
  category?: string;
}; 