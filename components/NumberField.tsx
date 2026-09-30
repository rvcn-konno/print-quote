"use client";

type Props = {
  id: string; label: string; unit: string; value: string;
  onChange: (v: string) => void; error?: string | null; placeholder?: string;
};

export default function NumberField({ id, label, unit, value, onChange, error, placeholder }: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <div className="flex items-center gap-3">
        <input
          id={id} type="number" inputMode="numeric" min={1} step={1}
          value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault(); }}
          aria-invalid={!!error}
          className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-right text-xl outline-none transition
            focus:ring-4 focus:ring-blue-100 ${error ? "border-red-400" : "border-slate-200 focus:border-blue-500"}`}
        />
        <span className="w-10 shrink-0 text-slate-600">{unit}</span>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
