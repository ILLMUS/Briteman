import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { useBranch } from "@/hooks/useBranch";
import type { Product } from "@/data/products";

type Props = {
  categoryLabel: string;
  products: Product[];
  description?: string;
  className?: string;
};

export function CatalogueDownloadButton({
  categoryLabel,
  products,
  description,
  className = "",
}: Props) {
  const [busy, setBusy] = useState(false);
  const { name: branch } = useBranch();

  const handleClick = async () => {
    if (busy || products.length === 0) return;
    setBusy(true);
    try {
      const { downloadCategoryPdf } = await import("@/lib/catalogue-pdf");
      downloadCategoryPdf(categoryLabel, products, { description, branch });
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy || products.length === 0}
      className={`inline-flex items-center gap-2 rounded-full bg-white text-brand-blue px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-sm hover:bg-brand-red hover:text-white transition-colors disabled:opacity-60 active:scale-[0.98] ${className}`}
    >
      {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {busy ? "Preparing PDF" : "Download PDF Catalogue"}
    </button>
  );
}
