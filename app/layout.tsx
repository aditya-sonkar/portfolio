import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Nunito_Sans, DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
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

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const woffFont = localFont({
  src: "./fonts/custom.woff2",
  variable: "--font-woff",
  display: "swap",
});

const formulaFont = localFont({
  src: "./fonts/PPFormula-CondensedBlack.otf",
  variable: "--font-formula",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif",
  subsets: ["latin"],
});

const apparelFont = localFont({
  src: [
    {
      path: "./fonts/ApparelDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ApparelDisplay-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/ApparelDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/ApparelDisplay-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/ApparelDisplay-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-apparel",
  display: "swap",
});

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/ppneuemontreal-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-semibolditalic.otf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Sonkar - Portfolio",
  description: "Personal Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${woffFont.variable} ${formulaFont.variable} ${interFont.variable} ${nunitoSans.variable} ${dmSerif.variable} ${apparelFont.variable} ${neueMontreal.variable} antialiased`}
    >
      <body className="flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
