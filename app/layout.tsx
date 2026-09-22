import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mahalaya26.vercel.app"),
  title: "Mahalaya '26 — A Bengali Festival Memory",
  description:
    "An immersive audiovisual journey through Mahalaya and Durga Puja in Bengal.",
  authors: [{ name: "Soumyadeep" }],
  creator: "Soumyadeep",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Mahalaya '26 — A Bengali Festival Memory",
    description:
      "An immersive audiovisual journey through Mahalaya and Durga Puja in Bengal.",
    type: "website",
    url: "https://mahalaya26.vercel.app",
    images: [
      {
        url: "/scenes/bg-mahalaya-1280.webp",
        width: 1280,
        height: 720,
        alt: "Mahalaya '26",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceMono.variable}`}>
      <body className="font-serif bg-black text-white antialiased overflow-hidden h-screen w-screen">
        {children}
      </body>
    </html>
  );
}
