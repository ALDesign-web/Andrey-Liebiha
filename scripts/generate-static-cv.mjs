import fs from "node:fs";
import path from "node:path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  convertInchesToTwip
} from "docx";

async function buildDocx() {
  const doc = new Document({
    creator: "Andrii Liebiha",
    title: "Andrii Liebiha - Senior Product Designer & Mobile Systems Architect CV",
    description: "Curriculum Vitae of Andrii Liebiha - Senior Product Designer, Mobile App UX, Systems Architect",
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: 22,
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
          new Paragraph({
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "ANDRII LIEBIHA",
                bold: true,
                size: 36,
                color: "111827"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Senior Product Designer & Mobile Systems Architect",
                bold: true,
                size: 24,
                color: "2563EB"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Available for Senior / Lead Product Design & Mobile Roles | Remote / Hybrid (Worldwide) | English: Fluent (C1/C2)",
                size: 18,
                color: "4B5563"
              })
            ]
          }),
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
                text: "Senior / Lead Product Designer & Systems Architect with formal academic qualification (Higher Degree in Product Design) and 7+ years of commercial craft. Leading 0-to-1 mobile applications (iOS & Android), spatial 3D experiences, and web platforms at Vortex Lab, with past contracts at Aircall (AI Call Center SaaS), Fintech, and E-Commerce. Active Creative Developer engineering personal Fintech software with Python and React to quantitatively validate product hypotheses with data.",
                size: 21,
                color: "374151"
              })
            ]
          }),
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
          // Vortex Lab
          new Paragraph({
            spacing: { before: 180, after: 40 },
            children: [
              new TextRun({
                text: "Senior / Lead Product Designer & Mobile Systems Architect",
                bold: true,
                size: 22,
                color: "111827"
              }),
              new TextRun({
                text: " — Vortex Lab (Mobile Apps, Spatial 3D & Web)",
                bold: true,
                size: 22,
                color: "2563EB"
              }),
              new TextRun({
                text: "  (2023 - Present)",
                italics: true,
                size: 20,
                color: "6B7280"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Leading 0-to-1 mobile application architecture (iOS & Android), spatial 3D systems, and cross-platform web platforms. Active Creative Developer building personal Fintech software with Python and React.",
                size: 21,
                color: "4B5563"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Architecting 0-to-1 mobile applications (iOS & Android), spatial 3D interfaces, and thumb-zone ergonomic systems compliant with iOS 18+ HIG and Material 3.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Engineered tactile mobile gaming & utility interfaces featuring physical PBR shaders, dynamic elevation lighting, and sensory audio-haptic feedback.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Built unified Figma token pipelines syncing mobile squads (SwiftUI & Jetpack Compose design tokens) and web squads with 100% token consistency.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Developing personal Fintech software with Python and React, writing automated data-validation tests to backtest and quantitatively validate UX/UI product hypotheses.",
                size: 20,
                color: "374151"
              })
            ]
          }),

          // Aircall
          new Paragraph({
            spacing: { before: 180, after: 40 },
            children: [
              new TextRun({
                text: "Senior Product & UX/UI Designer",
                bold: true,
                size: 22,
                color: "111827"
              }),
              new TextRun({
                text: " — Aircall (AI Call Center SaaS) • Fintech & Mobile E-Commerce",
                bold: true,
                size: 22,
                color: "2563EB"
              }),
              new TextRun({
                text: "  (2021 - 2023)",
                italics: true,
                size: 20,
                color: "6B7280"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Designed customer communication workflows, mobile-responsive interaction tooling, and B2B SaaS dashboards for Aircall, alongside high-impact contracts in Fintech and E-Commerce.",
                size: 21,
                color: "4B5563"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Designed call-handling workflows, AI voice transcription dashboards, and companion mobile interaction patterns for enterprise teams.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Engineered high-converting mobile-first purchase funnels for e-commerce brands, cutting checkout velocity to 45s (-58.3% time-to-buy) and lifting CVR by +141.6%.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Architected data-dense dashboards for fintech platforms with keyboard-first navigation and dark-mode ergonomics.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Partnered directly with mobile and frontend engineering squads to maintain 100% fidelity between design tokens and production code.",
                size: 20,
                color: "374151"
              })
            ]
          }),

          // Freelance / Commercial
          new Paragraph({
            spacing: { before: 180, after: 40 },
            children: [
              new TextRun({
                text: "Product & Digital Designer",
                bold: true,
                size: 22,
                color: "111827"
              }),
              new TextRun({
                text: " — Commercial Products & Venture Studios",
                bold: true,
                size: 22,
                color: "2563EB"
              }),
              new TextRun({
                text: "  (2018 - 2021)",
                italics: true,
                size: 20,
                color: "6B7280"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "Delivered mobile application concepts, brand identity systems, and conversion-focused web layouts for international commercial clients.",
                size: 21,
                color: "4B5563"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Crafted comprehensive brand packages, vector asset systems, and responsive digital interfaces for international commercial clients.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Engineered early interactive mobile app prototypes and design guidelines for consumer products.",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({
                text: "Applied formal academic training (Higher Degree in Product Design) to establish spatial balance, ergonomic grids, and typography hierarchy.",
                size: 20,
                color: "374151"
              })
            ]
          }),

          // Core Skills
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
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "Mobile & UI Design: ", bold: true, size: 20 }),
              new TextRun({
                text: "Mobile App UX (iOS HIG & Material 3), Figma (Variables, Tokens, AutoLayout), Design System Token Pipelines, Thumb-Zone Ergonomics & WCAG AAA",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "3D, Motion & Media: ", bold: true, size: 20 }),
              new TextRun({
                text: "3D PBR Materials & Spatial UI, Mobile Haptics & Micro-Interactions, Adobe After Effects (Kinetic Motion), Adobe CC (Photoshop & Illustrator)",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "Engineering, AI & Code: ", bold: true, size: 20 }),
              new TextRun({
                text: "Python (Data Analysis & UX Testing), React / Next.js / TypeScript, AI Generative & Streaming UX (LLMs), Tailwind CSS & Radix UI Primitives",
                size: 20,
                color: "374151"
              })
            ]
          }),

          // Education
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
                text: "Higher Degree in Product Design — Product & Industrial Design",
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
                text: "Formal Academic Qualification. Foundational academic training in ergonomics, physical & digital product design, spatial balance, and user perception.",
                size: 20,
                color: "4B5563"
              })
            ]
          }),

          // Languages
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
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "English: ", bold: true, size: 20 }),
              new TextRun({
                text: "Full Professional Proficiency (C1 / C2 • Advanced Working & Executive Communication)",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "Ukrainian: ", bold: true, size: 20 }),
              new TextRun({
                text: "Native (Native / Bilingual Proficiency)",
                size: 20,
                color: "374151"
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.resolve(process.cwd(), "public/cv/Andrii_Liebiha_Senior_Product_Designer_CV.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Successfully written CV docx to:", outPath);
}

buildDocx();
