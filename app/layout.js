// app/layout.js
import "./globals.css";
import { Tiro_Devanagari_Marathi } from "next/font/google";

const tiroMarathi = Tiro_Devanagari_Marathi({
  weight: "400",
  subsets: ["devanagari"],
});

export const metadata = {
  title: "सगाई निमंत्रण",
  description: "Marathi engagement invitation generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="mr">
      <head>
        {/* Decorative fonts for headings/couple names */}
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={tiroMarathi.className}>
        {children}
      </body>
    </html>
  );
}
