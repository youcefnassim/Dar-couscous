import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://darcouscous.fr"),
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
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "DAR COUSCOUS — La tradition dans chaque boîte",
    description: "Couscous traditionnel frais en barquettes individuelles livrées à Paris.",
    url: "https://darcouscous.fr",
    siteName: "DAR COUSCOUS",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "DAR COUSCOUS Logo",
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
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className="flex flex-col min-h-screen text-darkbrown bg-white antialiased selection:bg-terracotta selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

