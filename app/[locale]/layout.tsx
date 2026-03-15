import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import {
  Sora,
  DM_Sans,
  Noto_Nastaliq_Urdu,
  Scheherazade_New,
} from "next/font/google";
import AppBar from "@/components/layout/Appbar";
import { routing } from "@/i18n/routing";
import "../globals.css";

// ─── fonts ────────────────────────────────────────────────────────────────────
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
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

// ─── locale config ────────────────────────────────────────────────────────────
const SUPPORTED_LOCALES = routing.locales;
const RTL_LOCALES = ["ur", "ar"] as const;

function isRTLLocale(locale: string): boolean {
  return RTL_LOCALES.includes(locale as any);
}

// ─── static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

// ─── viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Qutbul Madar - Islamic Heritage & Services",
    ur: "قطب المدار - اسلامی ورثہ اور خدمات",
    "ur-Latn": "Qutbul Madar - Islami Wirsa aur Khidmat",
    hi: "क़ुतुबुल मदार - इस्लामी विरासत और सेवाएं",
  };

  const descriptions: Record<string, string> = {
    en: "Qutbul Madar - Preserving Islamic heritage and serving the community",
    ur: "قطب المدار - اسلامی ورثہ کا تحفظ اور کمیونٹی کی خدمت",
    "ur-Latn":
      "Qutbul Madar - Islami wirsa ka tahaffuz aur community ki khidmat",
    hi: "क़ुतुबुल मदार - इस्लामी विरासत का संरक्षण और समुदाय की सेवा",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "Qutbul Madar",
      "Islamic Heritage",
      "Dargah",
      "Makanpur",
      "Sufi",
      "Services",
    ],
    authors: [{ name: "Qutbul Madar Team" }],
    openGraph: {
      type: "website",
      locale: locale,
      siteName: "Qutbul Madar",
      url: "https://qutbul-madar.in",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [
        {
          url: "https://qutbul-madar.in/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Qutbul Madar - Sacred Heritage of the Subcontinent",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ["https://qutbul-madar.in/opengraph-image.png"],
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
  };
}

// ─── layout ───────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  const dir = isRTLLocale(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`
        ${sora.variable}
        ${dmSans.variable}
        ${notoUrdu.variable}
        ${scheherazade.variable}
      `}
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
