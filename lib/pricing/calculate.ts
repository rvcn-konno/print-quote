import {
  DELIVERY_FEE_PER_LOCATION, MAX_QUOTABLE_QUANTITY, type PrintType, pricingTable,
} from "./table";

export const INQUIRY_MESSAGE = `${(MAX_QUOTABLE_QUANTITY + 1).toLocaleString("ja-JP")}部以上のお見積りについてはお問い合わせください。`;

export type LineItem = { id: string; label: string; amount: number };

export type QuoteInput = { printType: PrintType; quantity: number; locations: number };

export type QuoteResult =
  | { status: "ok"; items: LineItem[]; total: number }
  | { status: "inquiry" };

/** 部数から料金表の該当行を返す。該当なしは undefined（外挿しない）。 */
export function findPrintPrice(printType: PrintType, quantity: number): number | undefined {
  const row = pricingTable.find((r) => quantity >= r.min && quantity <= r.max);
  return row?.[printType];
}

/**
 * 明細(LineItem)の配列を積み上げて合計する構造。
 * サイズ/ラミネート/特急/消費税などは items に追加するだけで拡張できる。
 */
export function calculateQuote(input: QuoteInput): QuoteResult {
  const printPrice = findPrintPrice(input.printType, input.quantity);
  if (printPrice === undefined) return { status: "inquiry" };

  const items: LineItem[] = [
    { id: "print", label: "印刷料金", amount: printPrice },
    { id: "delivery", label: "配送料金", amount: input.locations * DELIVERY_FEE_PER_LOCATION },
  ];
  return { status: "ok", items, total: items.reduce((s, i) => s + i.amount, 0) };
}

export type ParsedInt = { value: number | null; error: string | null };

/** 整数入力の検証。label は「部数」「配送箇所」。 */
export function parsePositiveInt(raw: string, label: string): ParsedInt {
  const s = raw.trim();
  const n = Number(s);
  if (s === "" || Number.isNaN(n)) return { value: null, error: `${label}は1以上で入力してください。` };
  if (!Number.isInteger(n)) return { value: null, error: `${label}は整数で入力してください。` };
  if (n < 1) return { value: null, error: `${label}は1以上で入力してください。` };
  return { value: n, error: null };
}

export const formatYen = (n: number) => `${n.toLocaleString("ja-JP")}円`;
