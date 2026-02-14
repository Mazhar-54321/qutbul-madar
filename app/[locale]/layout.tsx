// app/[locale]/layout.tsx

import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import AppBar from "@/components/layout/Appbar";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
// Generate params for static rendering / build
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Optional: Metadata with translations (also needs await)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // You can load messages and use getTranslations here if needed
  return {
    title: "MyBrand", // or dynamic
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; // ← Type it as Promise!
}) {
  // Await params here – this is the key fix
  const { locale } = await params;

  // Validate locale (prevents invalid routes)
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for this locale
  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  // RTL detection
  const isRtl = ["ur", "fa", "ar", "he"].includes(locale); // Add your RTL languages
  const dir = isRtl ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppBar />
          <main className="pt-16">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
