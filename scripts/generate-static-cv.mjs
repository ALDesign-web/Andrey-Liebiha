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
    title: "Andrii Liebiha - Senior Mobile UX/UI Designer CV",
    description: "Curriculum Vitae of Andrii Liebiha - Senior Mobile UX/UI Designer, iOS & Android Product Design, Interactive Motion & 3D UI",
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
                text: "Senior Mobile UX/UI Designer",
                bold: true,
                size: 24,
                color: "C2410C"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 160 },
            children: [
              new TextRun({
                text: "Open to Senior Mobile UX/UI & Product Design Roles | Remote / Hybrid (Worldwide) | English: Fluent (C1/C2)",
                size: 18,
                color: "4B5563"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 280 },
            children: [
              new TextRun({
                text: "Email: liebihadesign@gmail.com  ·  Behance: behance.net/ALMotion3D  ·  Telegram: t.me/ALMotion3D",
                size: 18,
                color: "6B7280"
              })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 180, after: 120 },
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
            spacing: { after: 220 },
            children: [
              new TextRun({
                text: "Senior Mobile UX/UI Designer with 7+ years of commercial experience and a Higher Degree in Product Design. Focused on native-feeling mobile experiences (iOS HIG & Material 3), interactive motion systems, and practical code prototypes built in React and Rive.",
                size: 21,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 220, after: 140 },
            children: [
              new TextRun({
                text: "COMMERCIAL EXPERIENCE",
                bold: true,
                size: 24,
                color: "111827"
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 160, after: 40 },
            children: [
              new TextRun({
                text: "Senior Mobile UX/UI Designer",
                bold: true,
                size: 22,
                color: "111827"
              }),
              new TextRun({
                text: " · Vortex Lab s.r.o. (Prague, CZ · Mobile Games & Apps)",
                bold: true,
                size: 22,
                color: "C2410C"
              }),
              new TextRun({
                text: "  (2025 - Present)",
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
                text: "Leading mobile product design, 3D visual craft, and cross-platform UI systems for Expedition Mahjong (200 hand-crafted levels, 43+ portrait screens) alongside interactive code prototypes in React and Rive.",
                size: 21,
                color: "4B5563"
              })
            ]
          }),
          ...[
            "Designed 43+ shipped mobile screens and 8 bespoke PBR tabletop/tile suites (Imperial Jade, Obsidian, Carrara Marble, Royal Velvet, Porcelain, Antique Ivory, Teak Wood & Terracotta) for Expedition Mahjong across 200 levels.",
            "Built portrait thumb-zone navigation, non-intrusive bottom-sheet recovery flows, and tactile audio-haptic preference systems synced with Apple & Google Play.",
            "Crafted fair-play monetization flows featuring the $1.99/mo Amethyst VIP subscription paywall, voluntary rewarded boosters, and daily login retention modals.",
            "Prototyped interactive mobile gestures, bottom sheets, and Rive state machines directly in React/TypeScript for realistic engineering handoff."
          ].map(
            (text) =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { before: 30, after: 30 },
                children: [new TextRun({ text, size: 20, color: "374151" })]
              })
          ),
          new Paragraph({
            spacing: { before: 180, after: 40 },
            children: [
              new TextRun({
                text: "Lead Product & Mobile UX/UI Designer",
                bold: true,
                size: 22,
                color: "111827"
              }),
              new TextRun({
                text: " · Bookify («Книгарня Небо») & Independent Product Studio",
                bold: true,
                size: 22,
                color: "C2410C"
              }),
              new TextRun({
                text: "  (2023 - 2025)",
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
                text: "Led the digital rebrand of Kyiv art bookstore «Книгарня Небо» into Bookify (bookify.com.ua) and independent mobile R&D (early prototyping leading into Vortex Lab s.r.o. incorporation + Kinetix AI dark-surface system studies).",
                size: 21,
                color: "4B5563"
              })
            ]
          }),
          ...[
            "Executed Bookify (bookify.com.ua / nebobookshop.com.ua) digital rebrand and inline Purchase Now checkout, lifting CVR to 5.8% (+141.6%), cutting checkout time to 45s (-58.3%), and growing store AOV to ₴1,595 (+28.5%).",
            "Designed dual-locale editorial storefront flows supporting both regional Ukrainian art books (₴400–₴600, Nova Poshta branch shipping) and collector editions ($260 Atlas Maior).",
            "Led early mobile R&D, shader prototyping, and dark-mode UI system studies (Kinetix AI Studio) on an 8pt tokenized component architecture."
          ].map(
            (text) =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { before: 30, after: 30 },
                children: [new TextRun({ text, size: 20, color: "374151" })]
              })
          ),
          new Paragraph({
            spacing: { before: 180, after: 40 },
            children: [
              new TextRun({
                text: "Product UI/UX Designer",
                bold: true,
                size: 22,
                color: "111827"
              }),
              new TextRun({
                text: " · Aircall · Fintech & SaaS Product Contracts",
                bold: true,
                size: 22,
                color: "C2410C"
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
                text: "Delivered communication workflows, mobile companion tools, and dense operational SaaS interfaces with a focus on keyboard speed, scannability, and reduced task friction.",
                size: 21,
                color: "4B5563"
              })
            ]
          }),
          ...[
            "Designed call-handling interfaces, AI call-summary workflows, and mobile companion views for enterprise communication teams.",
            "Created dense fintech operational screens with clear keyboard navigation, scannable tables, and verified contrast ratios.",
            "Standardized shared Figma variable libraries and component states across web and mobile surfaces."
          ].map(
            (text) =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { before: 30, after: 30 },
                children: [new TextRun({ text, size: 20, color: "374151" })]
              })
          ),
          new Paragraph({
            spacing: { before: 180, after: 40 },
            children: [
              new TextRun({
                text: "UI/UX & 3D Motion Designer",
                bold: true,
                size: 22,
                color: "111827"
              }),
              new TextRun({
                text: " · Digital Agencies & Production Studios",
                bold: true,
                size: 22,
                color: "C2410C"
              }),
              new TextRun({
                text: "  (2019 - 2021)",
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
                text: "Built clickable mobile application prototypes, brand identity systems, and 3D motion assets grounded in formal industrial and product design education.",
                size: 21,
                color: "4B5563"
              })
            ]
          }),
          ...[
            "Created clickable mobile app prototypes, component libraries, and user journey specs for consumer products.",
            "Delivered complete brand systems, custom iconography, 3D visual motion assets, and responsive storefronts.",
            "Applied academic training (Higher Degree in Product Design) to physical-to-digital hierarchy, ergonomics, and typography."
          ].map(
            (text) =>
              new Paragraph({
                bullet: { level: 0 },
                spacing: { before: 30, after: 30 },
                children: [new TextRun({ text, size: 20, color: "374151" })]
              })
          ),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 260, after: 140 },
            children: [
              new TextRun({
                text: "CORE SKILLS & TOOLING",
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
              new TextRun({ text: "Mobile & Product Design: ", bold: true, size: 20 }),
              new TextRun({
                text: "Mobile App UX (iOS HIG & Material 3), Figma (Variables, Tokens & AutoLayout), Interactive Bottom Sheets & Micro-Flows, Typography, Grid & WCAG AA Contrast",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "Motion & 3D Craft: ", bold: true, size: 20 }),
              new TextRun({
                text: "Rive (Interactive State Machines), Framer Motion & Spring Choreography, 3D PBR Materials & Tactile Shaders, Adobe After Effects & CC Suite",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "Engineering & Prototyping: ", bold: true, size: 20 }),
              new TextRun({
                text: "React / Next.js / TypeScript, Tailwind CSS & Accessible Primitives, Python (Data Scripts & Validation), AI-Assisted Prototyping",
                size: 20,
                color: "374151"
              })
            ]
          }),
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 260, after: 120 },
            children: [
              new TextRun({
                text: "EDUCATION & LANGUAGES",
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
                text: "Higher Degree in Product Design · Product & Industrial Design",
                bold: true,
                size: 21,
                color: "111827"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "Formal Academic Qualification. Foundational training in human ergonomics, spatial balance, tactile materials, and visual hierarchy.",
                size: 20,
                color: "4B5563"
              })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            children: [
              new TextRun({ text: "English: ", bold: true, size: 20 }),
              new TextRun({
                text: "Full Professional Proficiency (C1 / C2 · Product Critique, Documentation & Stakeholder Lead)",
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
                text: "Native Proficiency",
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
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buffer);
  console.log("Successfully written CV docx to:", outPath);
}

buildDocx();
