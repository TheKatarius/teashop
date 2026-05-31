const plnFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats a złoty amount, e.g. 29.9 -> "29,90 zł". */
export function formatPrice(amount: number): string {
  return plnFormatter.format(amount);
}

/** e.g. 100 -> "100 g" */
export function formatGrams(grams: number): string {
  return `${grams} g`;
}

/** Price per 100g, derived from a weight option, e.g. "59,80 zł / 100g". */
export function formatPricePer100g(price: number, grams: number): string {
  const per100 = (price / grams) * 100;
  return `${plnFormatter.format(per100)} / 100g`;
}
