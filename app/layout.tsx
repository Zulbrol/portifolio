import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css"; // Esta linha injeta as regras do Tailwind e tira a parede preta

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Vortex — Cinematic Portfolio",
  description: "High-End Video Editing & Motion Design Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} font-sans bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
