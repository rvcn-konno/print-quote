"use client";
import { useMemo, useState } from "react";
import {
  INQUIRY_MESSAGE, QuoteResult, calculateQuote, parsePositiveInt,
} from "@/lib/pricing/calculate";
import { MAX_QUOTABLE_QUANTITY, PrintType } from "@/lib/pricing/table";
import NumberField from "./NumberField";
import PrintTypeSelector from "./PrintTypeSelector";
import QuoteResultCard from "./QuoteResultCard";

const Step = ({ n, title }: { n: string; title: string }) => (
  <h3 className="mb-3 flex items-center gap-2 font-bold text-slate-800">
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">{n}</span>
    {title}
  </h3>
);

export default function QuoteSimulator() {
  const [printType, setPrintType] = useState<PrintType>("double");
  const [quantityRaw, setQuantityRaw] = useState("100");
  const [locationsRaw, setLocationsRaw] = useState("1");

  const { quantity, quantityError, locations, locationsError, result } = useMemo(() => {
    const q = parsePositiveInt(quantityRaw, "部数");
    const l = parsePositiveInt(locationsRaw, "配送箇所");
    const overLimit = q.value !== null && q.value > MAX_QUOTABLE_QUANTITY;
    const res: QuoteResult | null = overLimit
      ? { status: "inquiry" }
      : q.value !== null && l.value !== null
        ? calculateQuote({ printType, quantity: q.value, locations: l.value })
        : null;
    return {
      quantity: q.value, quantityError: q.error ?? (overLimit ? INQUIRY_MESSAGE : null),
      locations: l.value, locationsError: l.error, result: res,
    };
  }, [printType, quantityRaw, locationsRaw]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">印刷料金 見積シミュレーター</h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">部数と配送先を入力するだけで、簡単にお見積りいただけます。</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <section className="space-y-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <Step n="1" title="印刷種別" />
            <PrintTypeSelector value={printType} onChange={setPrintType} />
          </div>
          <div>
            <Step n="2" title="合計部数" />
            <NumberField id="quantity" label="合計部数" unit="部" value={quantityRaw}
              onChange={setQuantityRaw} error={quantityError} placeholder="例：500" />
          </div>
          <div>
            <Step n="3" title="配送箇所" />
            <NumberField id="locations" label="配送箇所" unit="箇所" value={locationsRaw}
              onChange={setLocationsRaw} error={locationsError} placeholder="例：2" />
          </div>
        </section>

        <QuoteResultCard printType={printType} quantity={quantity} locations={locations} result={result} />
      </div>
    </main>
  );
}
