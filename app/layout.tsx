import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goa Gajah – Discover Bali's Ancient Elephant Cave",
  description:
    "Explore Goa Gajah, the ancient Elephant Cave in Bali. Discover its rich history, cultural significance, and stunning architecture.",
  openGraph: {
    title: "Goa Gajah – Discover Bali's Ancient Elephant Cave",
    images: [
      {
        url: "/image/goa-gajah-thumbnail.jpg",
        width: 1200,
        height: 630,
        alt: "Goa Gajah Temple in Bali",
      },
    ],
    type: "article",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
