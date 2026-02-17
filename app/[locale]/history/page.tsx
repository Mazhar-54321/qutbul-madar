"use client";

import { useTranslations } from "next-intl";

interface SectionProps {
  title: string;
  content: string | { fatherSide?: string; motherSide?: string };
}

export default function QutbulMadarPage({ locale }: { locale: string }) {
  const t = useTranslations("history");

  const sections: SectionProps[] = [
    {
      title: t("identity.title"),
      content: `${t("identity.birthName")} - ${t("identity.titles")}\n${t("identity.amongSufis")}`,
    },
    { title: t("birth.title"), content: t("birth.content") },
    {
      title: t("dreamsBeforeBirth.title"),
      content: t("dreamsBeforeBirth.content"),
    },
    {
      title: t("miraclesAtBirth.title"),
      content: t("miraclesAtBirth.content"),
    },
    {
      title: t("genealogy.title"),
      content: {
        fatherSide: t("genealogy.fatherSide"),
        motherSide: t("genealogy.motherSide"),
      },
    },
    { title: t("education.title"), content: t("education.content") },
    {
      title: t("spiritualTraining.title"),
      content: t("spiritualTraining.content"),
    },
    { title: t("meetingProphet.title"), content: t("meetingProphet.content") },
    { title: t("missionToIndia.title"), content: t("missionToIndia.content") },
    { title: t("journeyToIndia.title"), content: t("journeyToIndia.content") },
    { title: t("arrivalKhambat.title"), content: t("arrivalKhambat.content") },
    { title: t("maqam.title"), content: t("maqam.content") },
  ];

  return (
    <main
      className="min-h-screen px-6 py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 text-gray-900"
      dir={locale === "ur" || locale === "ur-latn" ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            {t("heroTitle")}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground">
            {t("heroSubtitle")}
          </h2>
          <div className="mt-6 text-lg leading-relaxed text-justify md:text-center space-y-3">
            <p>{t("introduction.p1")}</p>
            <p>{t("introduction.p2")}</p>
          </div>
        </section>

        {/* Timeline Sections */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 left-1/2 w-1 -translate-x-1/2 h-full bg-primary/20"></div>

          <div className="space-y-16">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className={`relative md:flex md:items-center ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute md:relative left-1/2 -translate-x-1/2 md:translate-x-0 md:top-0 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg z-10"></div>

                {/* Card */}
                <div className="md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200">
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-2 text-justify text-muted-foreground leading-relaxed">
                    {typeof section.content === "string" ? (
                      section.content
                        .split("\n")
                        .map((line, i) => <p key={i}>{line}</p>)
                    ) : (
                      <>
                        {section.content.fatherSide && (
                          <p>
                            <strong>Father's Side:</strong>{" "}
                            {section.content.fatherSide}
                          </p>
                        )}
                        {section.content.motherSide && (
                          <p>
                            <strong>Mother's Side:</strong>{" "}
                            {section.content.motherSide}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
