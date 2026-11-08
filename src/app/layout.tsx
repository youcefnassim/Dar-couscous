import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "DAR COUSCOUS — La tradition dans chaque boîte | Paris",
  description:
    "Couscous d'exception préparé selon les recettes ancestrales maghrébines. Barquettes individuelles réfrigérées prêtes à réchauffer. Livraison à Paris et proche banlieue.",
  keywords: [
    "couscous",
    "couscous livraison Paris",
    "DAR COUSCOUS",
    "couscous royal",
    "barquette individuelle",
    "couscous agneau",
    "repas prêt à réchauffer",
    "traiteur couscous Paris",
  ],
  authors: [{ name: "DAR COUSCOUS Paris" }],
  openGraph: {
    title: "DAR COUSCOUS — La tradition dans chaque boîte",
    description: "Couscous traditionnel frais en barquettes individuelles livrées à Paris.",
    url: "https://darcouscous.fr",
    siteName: "DAR COUSCOUS",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "DAR COUSCOUS Barquettes Fraîches Paris",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <meta name="theme-color" content="#B66B48" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex flex-col min-h-screen text-darkbrown bg-white antialiased selection:bg-terracotta selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

