import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "印刷料金 見積シミュレーター",
  description: "部数と配送先を入力するだけで、簡単にお見積りいただけます。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-slate-50 text-slate-800 antialiased">{children}</body>
    </html>
  );
}
