import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hussen App Store - Islamic Apps & More | 150+ Free Android Apps",
  description:
    "Official app store by Dr. Hussen Oumer Amid - Medical Doctor turned Android App Developer. Browse 150+ free Islamic education apps, Quran recitations, Arabic & Amharic Islamic books, productivity tools, and more. Custom app development service available.",
  keywords: [
    "Hussen App Store",
    "Islamic apps",
    "Quran apps",
    "Amharic Islamic books",
    "Arabic Islamic books",
    "Android apps",
    "Ethiopia",
    "Hussen Oumer Amid",
    "free Islamic apps",
    "Quran recitation offline",
    "Tawhid",
    "Fiqh",
    "Aqida",
    "Hadith",
    "app development service",
    "custom Android app",
    "Islamic education",
    "Quran learning",
    "telebirr apps",
    "Ethiopian developer",
  ],
  authors: [{ name: "Dr. Hussen Oumer Amid" }],
  creator: "Hussen Oumer Amid",
  publisher: "Hussen App Store",
  metadataBase: new URL("https://hussenappstore.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "am": "/?lang=am",
      "ar": "/?lang=ar",
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Hussen App Store - 150+ Free Islamic & Productivity Apps",
    description:
      "Browse 150+ free Android apps - Quran recitations, Islamic books in Amharic & Arabic, productivity tools, and more by Dr. Hussen Oumer Amid. Custom app development available.",
    url: "https://hussenappstore.com",
    siteName: "Hussen App Store",
    type: "website",
    locale: "en_US",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Hussen App Store - Islamic Apps" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hussen App Store - 150+ Free Islamic & Productivity Apps",
    description:
      "Browse 150+ free Android apps - Quran recitations, Islamic books, productivity tools by Dr. Hussen Oumer Amid.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Hussen Apps",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://hussenappstore.com" />
        <link rel="alternate" hrefLang="en" href="https://hussenappstore.com" />
        <link rel="alternate" hrefLang="am" href="https://hussenappstore.com/?lang=am" />
        <link rel="alternate" hrefLang="ar" href="https://hussenappstore.com/?lang=ar" />
        <link rel="alternate" hrefLang="x-default" href="https://hussenappstore.com" />
        <link rel="alternate" type="application/rss+xml" title="Hussen App Store RSS" href="/rss.xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d6b3e" />
        <meta name="application-name" content="Hussen App Store" />
        <meta name="msapplication-TileColor" content="#0d6b3e" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        <meta name="google-site-verification" content="YpX63HMmw7sbqe2Kr65Ew6jcXk1BmPQsrF4u7qAsze4" />
      </head>
      <body className={`${geistSans.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
