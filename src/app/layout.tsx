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
  title: "Andrii Liebiha // Senior Product Designer & Digital Architect",
  description: "Portfolio of Andrii Liebiha. Scalable digital products, enterprise AI interfaces, and design systems.",
  openGraph: {
    title: "Andrii Liebiha // Senior Product Designer & Digital Architect",
    description: "Scalable digital products, enterprise AI interfaces, and design systems.",
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
        className={`${geistSans.variable} ${geistMono.variable} bg-[#08080b] text-[#f4f4f6] antialiased selection:bg-orange-500/30 selection:text-white`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
