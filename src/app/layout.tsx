import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrii Liebiha | Senior Mobile UX/UI & Product Designer",
  description:
    "Portfolio of Andrii Liebiha. Designing tactile iOS & Android apps, interactive Rive motion systems, and high-converting commerce products.",
  openGraph: {
    title: "Andrii Liebiha | Senior Mobile UX/UI & Product Designer",
    description:
      "Designing tactile iOS & Android apps, interactive Rive motion systems, and high-converting commerce products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#08090a] text-[#f2f5f1] antialiased selection:bg-[#ff7235]/30 selection:text-[#f2f5f1]`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
