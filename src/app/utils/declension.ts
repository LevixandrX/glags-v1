export function declension(count: number, one: string, two: string, five: string): string {
  const n = Math.abs(count);
  const n10 = n % 10;
  const n100 = n % 100;

  if (n100 >= 11 && n100 <= 19) {
    return five;
  }

  if (n10 === 1) {
    return one;
  }

  if (n10 >= 2 && n10 <= 4) {
    return two;
  }

  return five;
}

export function getItemsCountText(count: number): string {
  return `${count} ${declension(count, 'товар', 'товара', 'товаров')}`;
} 