export type PrintType = "double" | "single";

export type PricingRow = { min: number; max: number; double: number; single: number };

/** 印刷料金表（税別）。行の追加・変更はここだけ。 */
export const pricingTable: PricingRow[] = [
  { min: 1, max: 100, double: 5700, single: 4700 },
  { min: 101, max: 200, double: 6400, single: 5400 },
  { min: 201, max: 300, double: 7900, single: 6900 },
  { min: 301, max: 400, double: 8500, single: 7500 },
  { min: 401, max: 500, double: 9200, single: 8200 },
  { min: 501, max: 600, double: 9600, single: 8600 },
  { min: 601, max: 700, double: 10000, single: 9000 },
  { min: 701, max: 800, double: 10400, single: 9400 },
  { min: 801, max: 900, double: 10900, single: 9900 },
  { min: 901, max: 1000, double: 11300, single: 10300 },
  { min: 1001, max: 1100, double: 11800, single: 10800 },
  { min: 1101, max: 1200, double: 12300, single: 11300 },
  { min: 1201, max: 1300, double: 12800, single: 11800 },
  { min: 1301, max: 1400, double: 13300, single: 12300 },
  { min: 1401, max: 1500, double: 13800, single: 12800 },
];

export const MAX_QUOTABLE_QUANTITY = pricingTable[pricingTable.length - 1].max;
export const DELIVERY_FEE_PER_LOCATION = 2000;

export const printTypeLabels: Record<PrintType, string> = { double: "両面", single: "片面" };
