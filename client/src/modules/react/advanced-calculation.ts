export function totalWithTax(prices: number[], rate: number) {
  const subtotal = prices.reduce((total, price) => total + price, 0);
  return Math.round(subtotal * (1 + rate) * 100) / 100;
}
