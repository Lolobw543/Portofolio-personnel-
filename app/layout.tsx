import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_CONTENT } from "@/content/site";
import SmoothScroll from "@/components/common/SmoothScroll";
import CustomCursor from "@/components/common/CustomCursor";
import BackgroundMesh from "@/components/common/BackgroundMesh";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITE_CONTENT.meta.author} — ${SITE_CONTENT.meta.role}`,
  description: SITE_CONTENT.meta.description,
  keywords: [
    "Laurentin",
    "Télépilote Drone",
    "SaaS",
    "CertiDron",
    "Automatisation IA",
    "n8n",
    "Make",
    "E-commerce",
    "Lunor",
    "Next.js",
  ],
  authors: [{ name: SITE_CONTENT.meta.author }],
  creator: SITE_CONTENT.meta.author,
  openGraph: {
    title: `${SITE_CONTENT.meta.author} — Portfolio`,
    description: SITE_CONTENT.meta.description,
    url: SITE_CONTENT.meta.siteUrl,
    siteName: SITE_CONTENT.meta.siteName,
    locale: SITE_CONTENT.meta.locale,
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} font-sans scroll-smooth`}>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-[#F43F6E] selection:text-white relative">
        <BackgroundMesh />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
