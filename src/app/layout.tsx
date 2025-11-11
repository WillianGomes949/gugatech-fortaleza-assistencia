import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geek Fortaleza | Assistência Técnica de Celulares e Notebooks",
  description:
    "Especialistas em reparo de iPhone, Samsung, notebooks e mais. Orçamento rápido e garantia de serviço em Fortaleza.",
  // Adicionar palavras-chave relevantes
  keywords: [
    "assistência técnica",
    "reparo de celular",
    "conserto de notebook",
    "Fortaleza",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.className} ${inter.className} scroll-smooth`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

