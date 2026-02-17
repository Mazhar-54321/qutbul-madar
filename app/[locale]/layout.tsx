import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Inter, Noto_Nastaliq_Urdu, Scheherazade_New } from "next/font/google";
import AppBar from "@/components/layout/Appbar";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-urdu-display",
  display: "swap",
  preload: true,
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu-body",
  display: "swap",
  preload: true,
});

// Locale configuration
const SUPPORTED_LOCALES = routing.locales;
const RTL_LOCALES = ["ur", "ar"] as const;

// Type-safe locale check
function isRTLLocale(locale: string): boolean {
  console.log(RTL_LOCALES.includes(locale as any), "check");
  return RTL_LOCALES.includes(locale as any);
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

// Generate metadata with locale support
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // You can load translations here for dynamic metadata
  const titles: Record<string, string> = {
    en: "Qutbul Madar - Islamic Heritage & Services",
    ur: "قطب المدار - اسلامی ورثہ اور خدمات",
    "ur-Latn": "Qutbul Madar - Islami Wirsa aur Khidmat",
    hi: "क़ुतुबुल मदार - इस्लामी विरासत और सेवाएं",
  };

  return {
    title: titles[locale] || titles.en,
    description:
      "Qutbul Madar - Preserving Islamic heritage and serving the community",
    keywords: ["Qutbul Madar", "Islamic Heritage", "Dargah", "Services"],
    authors: [{ name: "Qutbul Madar Team" }],
    openGraph: {
      type: "website",
      locale: locale,
      siteName: "Qutbul Madar",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

// Root layout for locale-specific routes
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await and validate locale
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as any)) {
    notFound();
  }

  // Load locale-specific messages
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  // Determine text direction
  const dir = isRTLLocale(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${scheherazade.variable} ${notoUrdu.variable} `}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Asia/Kolkata"
        >
          <AppBar />
          <main className="pt-16 min-h-screen">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
