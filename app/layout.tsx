import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";

// Fraunces variável: opsz ajusta o desenho ao tamanho, SOFT arredonda as
// serifas e WONK entorta letras no itálico da palavra de destaque.
const fraunces = Fraunces({
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = "https://doutorespalhacos.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SOS Bom Humor Doutores Palhaços — Um Sorriso que Cura",
    template: "%s | SOS Bom Humor Doutores Palhaços",
  },
  description:
    "ONG voluntária de Ibirubá/RS que leva alegria, acolhimento e descontração a pacientes, acompanhantes e equipes de saúde por meio da arte da palhaçaria hospitalar, em hospitais, postos de saúde e asilos.",
  keywords: [
    "doutores palhaços",
    "palhaçaria hospitalar",
    "SOS Bom Humor",
    "ONG Ibirubá",
    "voluntariado hospital RS",
    "risoterapia",
    "humanização hospitalar",
    "Rio Grande do Sul",
  ],
  authors: [{ name: "SOS Bom Humor Doutores Palhaços" }],
  creator: "SOS Bom Humor Doutores Palhaços",
  publisher: "SOS Bom Humor Doutores Palhaços",
  applicationName: "SOS Bom Humor Doutores Palhaços",
  category: "nonprofit",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "SOS Bom Humor Doutores Palhaços",
    title: "SOS Bom Humor Doutores Palhaços — Um Sorriso que Cura",
    description:
      "Levando alegria, acolhimento e descontração a pacientes, acompanhantes e equipes de saúde em Ibirubá, Tapera e região.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SOS Bom Humor Doutores Palhaços",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOS Bom Humor Doutores Palhaços — Um Sorriso que Cura",
    description:
      "ONG voluntária que leva alegria a hospitais, postos de saúde e asilos em Ibirubá/RS.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
