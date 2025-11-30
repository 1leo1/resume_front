import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Merriweather,
  Playfair_Display,
  Lora,
  Roboto_Mono
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", weight: ["400", "500", "700"], subsets: ["latin"] });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", weight: ["400", "700"], subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const merriweather = Merriweather({ variable: "--font-merriweather", weight: ["400", "700"], subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClayCV - AI Resume Builder",
  description: "Build your professional resume with ClayCV.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          ${inter.variable} ${roboto.variable} ${openSans.variable} 
          ${lato.variable} ${montserrat.variable} 
          ${merriweather.variable} ${playfair.variable} ${lora.variable} 
          ${robotoMono.variable}
          antialiased
        `}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
