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

// ─── constants ────────────────────────────────────────────────────────────────
const BASE_URL = "https://qutbul-madar.in";

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
    en: "Qutbul Madar - Sacred Sufi Shrine & Islamic Heritage of Makanpur",
    ur: "قطب المدار - مکانپور شریف کا مقدس روحانی مرکز اور اسلامی ورثہ",
    "ur-Latn": "Qutbul Madar - Makanpur Shareef ka Muqaddas Ruhani Markaz",
    hi: "क़ुतुबुल मदार - मकानपुर शरीफ़ की पवित्र दरगाह और इस्लामी विरासत",
  };

  const descriptions: Record<string, string> = {
    en: "Explore the life, legacy and sacred shrine of Hazrat Syed Badiuddin Zinda Shah Madar at Makanpur Shareef. Discover history, services, gallery and more — in 4 languages.",
    ur: "حضرت سید بدیع الدین زندہ شاہ مدار کی حیات، ورثہ اور مکانپور شریف کی مقدس درگاہ کے بارے میں جانیں۔ تاریخ، خدمات اور گیلری — چار زبانوں میں۔",
    "ur-Latn":
      "Hazrat Syed Badiuddin Zinda Shah Madar ki hayat, wirsa aur Makanpur Shareef ki Dargah ke baare mein jaanein. Tareekh, khidmat aur gallery — 4 zubanon mein.",
    hi: "हज़रत सैयद बदीउद्दीन ज़िंदा शाह मदार के जीवन, विरासत और मकानपुर शरीफ़ की दरगाह के बारे में जानें। इतिहास, सेवाएँ और गैलरी — 4 भाषाओं में।",
  };

  // ── OG image — points to locale route since next-intl routes everything
  // through [locale]. Static PNG in public/ is the most reliable approach.
  const ogImage = `${BASE_URL}/og-image.jpg`;

  return {
    metadataBase: new URL(BASE_URL),
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
      url: `${BASE_URL}/${locale}`,
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Qutbul Madar - Sacred Sufi Shrine at Makanpur Shareef",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [ogImage],
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
