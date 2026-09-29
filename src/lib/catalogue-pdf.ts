
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CONTACT } from "@/lib/contact";
import { fmtPrice, type Product } from "@/data/products";

const BLUE: [number, number, number] = [21, 62, 138];
const BLUE_DARK: [number, number, number] = [15, 45, 100];
const RED: [number, number, number] = [204, 33, 40];

const DARK: [number, number, number] = [29, 29, 31];
const MUTED: [number, number, number] = [110, 110, 115];
const LIGHT_BG: [number, number, number] = [245, 245, 247];
const BORDER: [number, number, number] = [210, 210, 215];
const WHITE: [number, number, number] = [255, 255, 255];

const stockLabel = (s: Product["stock"]) =>
  s === "in"
    ? "In Stock"
    : s === "limited"
      ? "Limited Stock"
      : "Out of Stock";

const stockColor = (
  s: Product["stock"],
): [number, number, number] =>
  s === "in"
    ? BLUE
    : s === "limited"
      ? RED
      : MUTED;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Unable to load image: ${src}`));

    img.src = src;
  });
}

function drawFooter(
  doc: jsPDF,
  pageW: number,
  opts: { branch?: string },
) {
  const h = doc.internal.pageSize.getHeight();

  // Footer background
  doc.setFillColor(...LIGHT_BG);
  doc.rect(0, h - 70, pageW, 70, "F");

  // Brand accent line
  doc.setFillColor(...BLUE);
  doc.rect(40, h - 70, pageW - 80, 2, "F");

  // Small red accent
  doc.setFillColor(...RED);
  doc.rect(40, h - 68, 34, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...DARK);

  const loc = CONTACT.locations
    .map(
      (l) =>
        `${l.name}: ${l.line1}, ${l.city}`,
    )
    .join("   |   ");

  doc.text(loc, 40, h - 49);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);

  const contactLine =
    `WhatsApp: +${CONTACT.whatsappNumber}   |   ` +
    `${CONTACT.email}   |   ${CONTACT.website}` +
    (opts.branch
      ? `   |   Preferred branch: ${opts.branch}`
      : "");

  doc.setTextColor(...MUTED);
  doc.text(contactLine, 40, h - 36);

  // Page number
  const pageNumber =
    doc.getNumberOfPages();

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...BLUE);
  doc.text(
    `PAGE ${pageNumber}`,
    pageW - 40,
    h - 36,
    { align: "right" },
  );
}

export async function downloadCategoryPdf(
  categoryLabel: string,
  products: Product[],
  opts: {
    description?: string;
    branch?: string;
  } = {},
) {
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
  });

  const pageW =
    doc.internal.pageSize.getWidth();

  const pageH =
    doc.internal.pageSize.getHeight();

  const marginX = 40;

  /*
   * =========================================================
   * BRAND LOGO
   * /public/briteman-logo.png
   * =========================================================
   */
  let logo: HTMLImageElement | null = null;

  try {
    logo = await loadImage("/briteman-logo.png");
  } catch {
    // Continue without the logo if the image cannot be loaded.
    logo = null;
  }

  /*
   * =========================================================
   * PAGE BACKGROUND
   * =========================================================
   */

  doc.setFillColor(...LIGHT_BG);
  doc.rect(
    0,
    0,
    pageW,
    pageH,
    "F",
  );

  /*
   * =========================================================
   * HEADER
   * =========================================================
   */

  doc.setFillColor(...WHITE);
  doc.rect(
    0,
    0,
    pageW,
    112,
    "F",
  );

  // Blue brand line
  doc.setFillColor(...BLUE);
  doc.rect(
    0,
    0,
    pageW,
    4,
    "F",
  );

  // Red secondary accent
  doc.setFillColor(...RED);
  doc.rect(
    40,
    4,
    38,
    2,
    "F",
  );

  /*
   * Logo
   */
  if (logo) {
    const maxLogoW = 118;
    const maxLogoH = 48;

    const ratio =
      logo.width / logo.height;

    let logoW = maxLogoW;
    let logoH = logoW / ratio;

    if (logoH > maxLogoH) {
      logoH = maxLogoH;
      logoW = logoH * ratio;
    }

    doc.addImage(
      logo,
      "PNG",
      marginX,
      22,
      logoW,
      logoH,
      undefined,
      "FAST",
    );
  } else {
    // Fallback if logo is unavailable
    doc.setFont(
      "helvetica",
      "bold",
    );
    doc.setFontSize(18);
    doc.setTextColor(...DARK);

    doc.text(
      CONTACT.brandFull.toUpperCase(),
      marginX,
      48,
    );
  }

  /*
   * Header right information
   */
  doc.setFont(
    "helvetica",
    "normal",
  );
  doc.setFontSize(7.5);
  doc.setTextColor(...MUTED);

  doc.text(
    CONTACT.website,
    pageW - marginX,
    28,
    { align: "right" },
  );

  doc.text(
    `+${CONTACT.whatsappNumber}`,
    pageW - marginX,
    40,
    { align: "right" },
  );

  doc.text(
    CONTACT.email,
    pageW - marginX,
    52,
    { align: "right" },
  );

  /*
   * Category title
   */
  doc.setFont(
    "helvetica",
    "bold",
  );
  doc.setFontSize(20);
  doc.setTextColor(...DARK);

  doc.text(
    categoryLabel,
    marginX,
    82,
  );

  doc.setFont(
    "helvetica",
    "normal",
  );
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);

  doc.text(
    "PRODUCT CATALOGUE",
    marginX,
    98,
  );

  // Header separator
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(0.7);

  doc.line(
    marginX,
    108,
    pageW - marginX,
    108,
  );

  /*
   * =========================================================
   * INTRO / DESCRIPTION
   * =========================================================
   */

  let y = 132;

  if (opts.description) {
    doc.setFont(
      "helvetica",
      "normal",
    );
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);

    const descriptionLines =
      doc.splitTextToSize(
        opts.description,
        pageW - marginX * 2,
      );

    doc.text(
      descriptionLines,
      marginX,
      y,
    );

    y +=
      descriptionLines.length * 12 +
      12;
  }

  /*
   * Catalogue metadata
   */
  doc.setFont(
    "helvetica",
    "bold",
  );
  doc.setFontSize(7.5);
  doc.setTextColor(...BLUE);

  doc.text(
    `${products.length} PRODUCTS`,
    marginX,
    y,
  );

  doc.setFont(
    "helvetica",
    "normal",
  );
  doc.setTextColor(...MUTED);

  doc.text(
    `Generated ${new Date().toLocaleDateString()}  •  Prices in Emalangeni (E)`,
    marginX + 82,
    y,
  );

  doc.text(
    "Prices subject to change.",
    pageW - marginX,
    y,
    { align: "right" },
  );

  y += 14;

  /*
   * =========================================================
   * PRODUCT TABLE
   * =========================================================
   */

  autoTable(doc, {
    startY: y,

    head: [
      [
        "#",
        "PRODUCT",
        "SPECIFICATIONS",
        "AVAILABILITY",
        "PRICE",
      ],
    ],

    body: products.map(
      (p, i) => [
        String(i + 1),
        p.name,
        p.specs || "-",
        stockLabel(p.stock),
        fmtPrice(p.price),
      ],
    ),

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 8,
      textColor: DARK,
      fillColor: WHITE,
      cellPadding: 6,
      valign: "middle",
      lineColor: BORDER,
      lineWidth: 0.35,
    },

    headStyles: {
      fillColor: BLUE_DARK,
      textColor: WHITE,
      fontStyle: "bold",
      fontSize: 7.5,
      cellPadding: 7,
      halign: "left",
      lineColor: BLUE_DARK,
    },

    alternateRowStyles: {
      fillColor: [250, 250, 251],
    },

    columnStyles: {
      0: {
        cellWidth: 26,
        halign: "center",
        textColor: MUTED,
      },

      1: {
        cellWidth: 145,
        fontStyle: "bold",
        textColor: DARK,
      },

      2: {
        cellWidth: 185,
        textColor: MUTED,
      },

      3: {
        cellWidth: 82,
        fontSize: 7.5,
      },

      4: {
        cellWidth: 72,
        halign: "right",
        fontStyle: "bold",
        textColor: BLUE,
      },
    },

    margin: {
      left: marginX,
      right: marginX,
      top: 40,
      bottom: 82,
    },

    didParseCell: (data) => {
      /*
       * Availability gets a subtle brand treatment.
       */
      if (
        data.section === "body" &&
        data.column.index === 3
      ) {
        const row =
          products[data.row.index];

        if (row) {
          data.cell.styles.textColor =
            stockColor(row.stock);

          data.cell.styles.fontStyle =
            "bold";
        }
      }

      /*
       * Price remains the primary blue accent.
       */
      if (
        data.section === "body" &&
        data.column.index === 4
      ) {
        data.cell.styles.textColor =
          BLUE;
      }
    },

    didDrawPage: () => {
      drawFooter(
        doc,
        pageW,
        opts,
      );
    },
  });

  /*
   * =========================================================
   * FINAL BRAND ELEMENT
   * =========================================================
   */

  const finalPage =
    doc.getNumberOfPages();

  doc.setPage(finalPage);

  /*
   * Add a small catalogue note above footer
   * when there is available space.
   */
  const finalY =
    pageH - 91;

  doc.setFont(
    "helvetica",
    "normal",
  );
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);

  doc.text(
    "For current availability, pricing and orders, contact Briteman Services.",
    marginX,
    finalY,
  );

  /*
   * =========================================================
   * FILE NAME
   * =========================================================
   */

  const slug =
    categoryLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  doc.save(
    `briteman-${slug}-catalogue.pdf`,
  );
}

