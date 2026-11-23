import type { Metadata } from "next";
import { Geist_Mono, Nunito_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
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
  ],
  variable: "--font-apparel",
  display: "swap",
});

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/ppneuemontreal-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Sonkar - Portfolio",
  description: "Personal Portfolio of Aditya Sonkar - Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${nunitoSans.variable} ${apparelFont.variable} ${neueMontreal.variable} antialiased`}
    >
      <body className="flex flex-col font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
