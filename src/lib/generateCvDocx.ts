import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip
} from "docx";
import { PORTFOLIO_HERO, EXPERIENCE_TIMELINE, CV_METADATA, TOOLS_MATRIX } from "@/data/portfolioData";

export async function createCvDocxBlob(): Promise<Blob> {
  const doc = new Document({
    creator: "Andrii Liebiha",
    title: "Andrii Liebiha - Senior Product Designer & Mobile Systems Architect CV",
    description: "Curriculum Vitae of Andrii Liebiha - Senior Product Designer, Mobile App UX, Systems Architect",
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 22, // 11pt
            color: "222222"
          },
          paragraph: {
            spacing: {
              line: 276,
              before: 80,
              after: 80
            }
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.75),
              right: convertInchesToTwip(0.75),
              bottom: convertInchesToTwip(0.75),
              left: convertInchesToTwip(0.75)
            }
          }
        },
        children: [
          // Header: Name
          new Paragraph({
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: PORTFOLIO_HERO.name,
                bold: true,
                size: 36, // 18pt
                color: "111827"
              })
            ]
          }),

          // Role Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Senior Product Designer & Mobile Systems Architect",
                bold: true,
                size: 24, // 12pt
                color: "2563EB"
              })
            ]
          }),

          // Metadata & Availability
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `${CV_METADATA.availability} | ${CV_METADATA.location} | English: Fluent (C1/C2)`,
                size: 18, // 9pt
                color: "4B5563"
              })
            ]
          }),

          // Contact Links Line
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "Portfolio: andriiliebiha.com  •  Behance: behance.net/ALMotion3D  •  Direct inquiries upon request",
                size: 18,
                color: "6B7280"
              })
            ]
          }),

          // Professional Summary
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({
                text: "PROFESSIONAL SUMMARY",
                bold: true,
                size: 24,
                color: "111827"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: PORTFOLIO_HERO.bio,
                size: 21,
                color: "374151"
              })
            ]
          }),

          // Work Experience Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 140 },
            children: [
              new TextRun({
                text: "COMMERCIAL EXPERIENCE",
                bold: true,
                size: 24,
                color: "111827"
              })
            ]
          }),

          // Timeline entries
          ...EXPERIENCE_TIMELINE.flatMap((exp) => [
            new Paragraph({
              spacing: { before: 180, after: 40 },
              children: [
                new TextRun({
                  text: exp.role,
                  bold: true,
                  size: 22,
                  color: "111827"
                }),
                new TextRun({
                  text: ` — ${exp.company}`,
                  bold: true,
                  size: 22,
                  color: "2563EB"
                }),
                new TextRun({
                  text: `  (${exp.period})`,
                  italics: true,
                  size: 20,
                  color: "6B7280"
                })
              ]
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: exp.description,
                  size: 21,
                  color: "4B5563"
                })
              ]
            }),
            ...exp.highlights.map(
              (highlight) =>
                new Paragraph({
                  bullet: { level: 0 },
                  spacing: { before: 40, after: 40 },
                  children: [
                    new TextRun({
                      text: highlight,
                      size: 20,
                      color: "374151"
                    })
                  ]
                })
            )
          ]),

          // Core Skills & Toolset Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 140 },
            children: [
              new TextRun({
                text: "CORE SKILLS & TECHNICAL PROFICIENCY",
                bold: true,
                size: 24,
                color: "111827"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({ text: "Mobile & UI Design: ", bold: true, size: 20 }),
              new TextRun({
                text: TOOLS_MATRIX.design.map((t) => t.name).join(", "),
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({ text: "3D, Motion & Media: ", bold: true, size: 20 }),
              new TextRun({
                text: TOOLS_MATRIX.motionAndMedia.map((t) => t.name).join(", "),
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({ text: "Engineering, AI & Code: ", bold: true, size: 20 }),
              new TextRun({
                text: TOOLS_MATRIX.engineeringAndAI.map((t) => t.name).join(", "),
                size: 20,
                color: "374151"
              })
            ]
          }),

          // Education Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 140 },
            children: [
              new TextRun({
                text: "EDUCATION & QUALIFICATIONS",
                bold: true,
                size: 24,
                color: "111827"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `${CV_METADATA.education.degree} — ${CV_METADATA.education.field}`,
                bold: true,
                size: 21,
                color: "111827"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 180 },
            children: [
              new TextRun({
                text: `${CV_METADATA.education.type}. ${CV_METADATA.education.details}`,
                size: 20,
                color: "4B5563"
              })
            ]
          }),

          // Languages Section
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({
                text: "LANGUAGES",
                bold: true,
                size: 24,
                color: "111827"
              })
            ]
          }),
          ...CV_METADATA.languages.map(
            (lang) =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { before: 40, after: 40 },
                children: [
                  new TextRun({ text: `${lang.language}: `, bold: true, size: 20 }),
                  new TextRun({
                    text: `${lang.level} (${lang.details})`,
                    size: 20,
                    color: "374151"
                  })
                ]
              })
          )
        ]
      }
    ]
  });

  return await Packer.toBlob(doc);
}

export function downloadCvDocx(filename = "Andrii_Liebiha_Senior_Product_Designer_CV.docx") {
  createCvDocxBlob().then((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
