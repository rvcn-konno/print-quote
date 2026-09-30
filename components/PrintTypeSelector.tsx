"use client";
import { PrintType, printTypeLabels } from "@/lib/pricing/table";

const options: PrintType[] = ["double", "single"];

export default function PrintTypeSelector({
  value, onChange,
}: { value: PrintType; onChange: (v: PrintType) => void }) {
  return (
    <div role="radiogroup" aria-label="印刷種別" className="grid grid-cols-2 gap-3">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <label
            key={opt}
            className={`cursor-pointer rounded-xl border-2 px-4 py-4 text-center text-lg font-semibold transition
              ${active ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300"}`}
          >
            <input
              type="radio" name="printType" value={opt} checked={active}
              onChange={() => onChange(opt)} className="sr-only"
            />
            {printTypeLabels[opt]}
          </label>
        );
      })}
    </div>
  );
}
