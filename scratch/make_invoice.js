const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, VerticalAlign,
} = require("docx");

const FONT = "Arial";
const W = { total: 9200, muj: 1700, thaman: 1700, naw: 4100, adad: 1700 }; // sum cols = 9200

function run(text, opts = {}) {
  return new TextRun({ text: String(text), rightToLeft: true, font: FONT, size: opts.size || 22, bold: opts.bold || false });
}
function para(text, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: opts.alignment || AlignmentType.CENTER,
    spacing: { before: 20, after: 20 },
    children: Array.isArray(text) ? text : [run(text, opts)],
  });
}
function cell(text, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    shading: opts.shading ? { type: ShadingType.CLEAR, fill: opts.shading, color: "auto" } : undefined,
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
    children: [para(text, opts)],
  });
}
// visual order left->right: المجموع | الثمن | نوع البضاعة | العدد
function row(muj, thaman, naw, adad, opts = {}) {
  return new TableRow({
    children: [
      cell(muj, W.muj, opts),
      cell(thaman, W.thaman, opts),
      cell(naw, W.naw, { ...opts, alignment: opts.headerRow ? AlignmentType.CENTER : AlignmentType.RIGHT }),
      cell(adad, W.adad, opts),
    ],
  });
}

const items = [
  // [المجموع, الثمن, نوع البضاعة, العدد]
  ["210,00", "105,00", "سردين (؟)", "2"],
  ["300,00", "300,00", "مسحوق ½ روتوس (؟)", "1"],
  ["192,00", "192,00", "كلينكس", "1"],
  ["1880,00", "470,00", "زيت", "4"],
  ["310,00", "62,00", "حليب", "5"],
  ["150,00", "25,00", "كاتشب Star", "6"],
  ["750,00", "375,00", "جميلة خشنة (؟)", "2"],
  ["45,00", "45,00", "قاني ديسك (؟)", "1"],
  ["96,00", "8,00", "خل أبيض", "12"],
  ["200,00", "200,00", "ندى حار (؟)", "1"],
  ["75,00", "2,50", "أنوار (؟)", "30"],
  ["112,50", "112,50", "فدري 25 (؟)", "1"],
  ["57,00", "19,00", "هاتيل (؟)", "3"],
  ["168,00", "168,00", "أذن (؟)", "1"],
  ["70,00", "70,00", "كوبلي فزة (؟)", "1"],
];

const border = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
const tableBorders = {
  top: border, bottom: border, left: border, right: border,
  insideHorizontal: border, insideVertical: border,
};

const rows = [
  row("المجموع", "الثمن", "نوع البضاعة", "العدد", { bold: true, headerRow: true, shading: "E6E6E6" }),
  ...items.map((it) => row(it[0], it[1], it[2], it[3])),
];

// summary rows spanning
function sumRow(label, value, bold) {
  return new TableRow({
    children: [
      cell(value, W.muj, { bold }),
      new TableCell({
        width: { size: W.thaman + W.naw + W.adad, type: WidthType.DXA },
        columnSpan: 3,
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 40, bottom: 40, left: 60, right: 60 },
        children: [para(label, { bold, alignment: AlignmentType.RIGHT })],
      }),
    ],
  });
}
rows.push(sumRow("المجموع الفرعي", "4615,50", true));
rows.push(sumRow("زيادة", "+ 42,00", false));
rows.push(sumRow("سرفيت (Serviette)", "+ 105,00", false));
rows.push(sumRow("المجموع الإجمالي", "4762,50", true));

const table = new Table({
  columnWidths: [W.muj, W.thaman, W.naw, W.adad],
  width: { size: W.total, type: WidthType.DXA },
  borders: tableBorders,
  rows,
});

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  sections: [
    {
      properties: { page: { margin: { top: 900, bottom: 900, left: 800, right: 800 } } },
      children: [
        para([run("فاتورة", { bold: true, size: 34 })], { alignment: AlignmentType.CENTER }),
        new Paragraph({ spacing: { after: 120 }, children: [] }),
        new Paragraph({
          bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 60 },
          children: [run("فاتورة رقم : ", { bold: true }), run("11")],
        }),
        new Paragraph({
          bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 60 },
          children: [run("السيد : ", { bold: true }), run("أبطال السلام")],
        }),
        new Paragraph({
          bidirectional: true, alignment: AlignmentType.RIGHT, spacing: { after: 200 },
          children: [run("التاريخ : ", { bold: true }), run("04/08/2026")],
        }),
        table,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/home/user/webcite-create/scratch/فاتورة_رقم_11.docx", buf);
  console.log("written");
});
