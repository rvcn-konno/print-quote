import { QuoteResult, formatYen } from "@/lib/pricing/calculate";
import { PrintType, printTypeLabels } from "@/lib/pricing/table";

type Props = {
  printType: PrintType; quantity: number | null; locations: number | null; result: QuoteResult | null;
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between py-1.5">
    <dt className="text-slate-500">{label}</dt>
    <dd className="font-medium">{value}</dd>
  </div>
);

export default function QuoteResultCard({ printType, quantity, locations, result }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:sticky md:top-6">
      <h2 className="mb-4 text-lg font-bold text-blue-900">お見積り結果</h2>
      <dl>
        <Row label="印刷種別" value={printTypeLabels[printType]} />
        <Row label="合計部数" value={quantity !== null ? `${quantity.toLocaleString("ja-JP")}部` : "―"} />
        <Row label="配送箇所" value={locations !== null ? `${locations.toLocaleString("ja-JP")}箇所` : "―"} />
      </dl>
      <hr className="my-4 border-slate-200" />
      {result?.status === "ok" ? (
        <dl>{result.items.map((i) => <Row key={i.id} label={i.label} value={formatYen(i.amount)} />)}</dl>
      ) : (
        <dl>
          <Row label="印刷料金" value="―" />
          <Row label="配送料金" value="―" />
        </dl>
      )}
      <div className="mt-4 rounded-xl bg-blue-600 p-5 text-white">
        <p className="text-sm opacity-90">合計金額</p>
        <p className="mt-1 text-right text-4xl font-bold tabular-nums sm:text-5xl" aria-live="polite">
          {result?.status === "ok" ? formatYen(result.total)
            : result?.status === "inquiry" ? <span className="text-2xl">お問い合わせください</span> : "―"}
        </p>
      </div>
      <p className="mt-3 text-xs text-slate-500">※表示価格は税別です。</p>
    </section>
  );
}
