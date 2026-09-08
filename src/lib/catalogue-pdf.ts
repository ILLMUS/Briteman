import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CONTACT } from "@/lib/contact";
import { fmtPrice, type Product } from "@/data/products";

const BLUE: [number, number, number] = [21, 62, 138];
const RED: [number, number, number] = [204, 33, 40];

const stockLabel = (s: Product["stock"]) =>
  s === "in" ? "In stock" : s === "limited" ? "Limited stock" : "Out of stock";

export function downloadCategoryPdf(
  categoryLabel: string,
  products: Product[],
  opts: { description?: string; branch?: string } = {},
) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, pageW, 92, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(CONTACT.brandFull.toUpperCase(), 40, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(CONTACT.tagline, 40, 58);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`${categoryLabel} Catalogue`, 40, 78);

  let y = 116;
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  if (opts.description) {
    const lines = doc.splitTextToSize(opts.description, pageW - 80);
    doc.text(lines, 40, y);
    y += lines.length * 12 + 6;
  }
  doc.text(
    `Generated ${new Date().toLocaleDateString()}  |  Prices in Emalangeni (E), subject to change.`,
    40,
    y,
  );
  y += 16;

  autoTable(doc, {
    startY: y,
    head: [["#", "Product", "Specifications", "Availability", "Price"]],
    body: products.map((p, i) => [
      String(i + 1),
      p.name,
      p.specs || "-",
      stockLabel(p.stock),
      fmtPrice(p.price),
    ]),
    styles: { fontSize: 8.5, cellPadding: 5, valign: "middle" },
    headStyles: { fillColor: BLUE, textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: {
      0: { cellWidth: 24 },
      1: { cellWidth: 140, fontStyle: "bold" },
      3: { cellWidth: 70 },
      4: { cellWidth: 70, halign: "right" },
    },
    margin: { left: 40, right: 40, bottom: 70 },
    didDrawPage: () => {
      const h = doc.internal.pageSize.getHeight();
      doc.setDrawColor(...RED);
      doc.setLineWidth(2);
      doc.line(40, h - 56, pageW - 40, h - 56);
      doc.setFontSize(8);
      doc.setTextColor(90, 90, 90);
      doc.setFont("helvetica", "normal");
      const loc = CONTACT.locations
        .map((l) => `${l.name}: ${l.line1}, ${l.city}`)
        .join("   |   ");
      doc.text(loc, 40, h - 42);
      doc.text(
        `WhatsApp orders: +${CONTACT.whatsappNumber}   |   ${CONTACT.email}   |   ${CONTACT.website}` +
          (opts.branch ? `   |   Preferred branch: ${opts.branch}` : ""),
        40,
        h - 30,
      );
    },
  });

  const slug = categoryLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  doc.save(`briteman-${slug}-catalogue.pdf`);
}
