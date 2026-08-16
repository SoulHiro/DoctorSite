import type { Metadata } from "next";
import { Fraunces, Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-accent",
  weight: "400",
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
      className={`${fraunces.variable} ${inter.variable} ${permanentMarker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
