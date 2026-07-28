const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, AlignmentType } = require("docx");

const FONT = "Arial";

function p(children, opts = {}) {
  return new Paragraph({
    bidirectional: true,
    alignment: opts.alignment || AlignmentType.JUSTIFIED,
    spacing: { after: opts.after != null ? opts.after : 200, line: 320 },
    children,
  });
}
function r(text, opts = {}) {
  return new TextRun({
    text, rightToLeft: true, font: FONT,
    size: opts.size || 24, bold: opts.bold || false,
  });
}

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 24 } } } },
  sections: [
    {
      properties: { page: { margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 } } },
      children: [
        p([r("تصريح بالشرف", { bold: true, size: 36 })], { alignment: AlignmentType.CENTER, after: 400 }),

        p([r("أنا الممضي أسفله : .............................. ، الحامل(ة) للبطاقة الوطنية للتعريف رقم : ..............................")]),

        p([r("أصرّح وأشهد، وأنا بكامل أهليتي القانونية ووعيي التام، وبمحض إرادتي ودون أي ضغط أو إكراه، أنني أشتغل لدى مشغلي : ..............................")]),

        p([r("وذلك وفق عدد ساعات العمل المحددة بمقتضى تشريع مدونة الشغل المغربية الجاري به العمل.")]),

        p([r("كما أصرّح وأشهد على نفسي أن تاريخ مباشرتي للعمل بالمؤسسة المذكورة أعلاه هو ابتداء من تاريخ التوقيع والمصادقة على هذا التصريح، وأتحمل كامل المسؤولية القانونية والإدارية في حال ثبوت ما يخالف ذلك، مع علمي التام بأن أي تصريح كاذب يُعرّض صاحبه للمساءلة القانونية طبقًا للنصوص القانونية الجاري بها العمل.")]),

        p([r("وأؤكد أن جميع البيانات والتصريحات الواردة في هذا التصريح صحيحة ودقيقة، وقد تم الإدلاء بها عن علم وإرادة، ولا رجعة فيها، بعد اطلاعي الكامل على مضمونه وفهمي لكافة آثاره القانونية.")]),

        p([r("وقد حرر هذا التصريح للإدلاء به عند الاقتضاء أمام الإدارات العمومية أو الجهات القضائية المختصة، وللاحتجاج به عند اللزوم.")], { after: 500 }),

        p([r("حرر بتاريخ : ..............................")], { alignment: AlignmentType.RIGHT, after: 600 }),

        p([r("امضاء المعني بالأمر مع تصحيح الإمضاء :", { bold: true })], { alignment: AlignmentType.RIGHT, after: 300 }),
        p([r("..............................")], { alignment: AlignmentType.RIGHT }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("/home/user/webcite-create/scratch/تصريح_بالشرف.docx", buf);
  console.log("written");
});
