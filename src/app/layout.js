import { Inter, Outfit } from "next/font/google"; // Import Outfit for headers
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "900"], // bold weights for the title
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}