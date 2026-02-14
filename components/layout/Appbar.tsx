"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LanguageSwitcher from "../shared/LanguageSwitcher";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

// Remove: import { isRtlLocale } from "@/i18n";  ← no longer needed here

// Keep navItems as-is for now (you'll translate labels later with useTranslations)
const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Qutbul Madar", href: "/qutbul-madar" },
      { label: "Our Services", href: "/our-services" },
    ],
  },
  {
    label: "Books",
    children: [
      { label: "Urdu Books", href: "/urdu-books" },
      { label: "Farsi Books", href: "/farsi-books" },
      { label: "Hindi Books", href: "/hindi-books" },
    ],
  },
  {
    label: "Articles",
    children: [
      { label: "Urdu Articles", href: "/urdu-articles" },
      { label: "English Articles", href: "/english-articles" },
    ],
  },
  {
    label: "Gallery",
    children: [
      { label: "Image Gallery", href: "/image-gallery" },
      { label: "Dargah Gallery", href: "/dargah-gallery" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "Donate", href: "/donate" },
];

export default function AppBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const isRtl = ["ur"].includes(locale);
  const sheetVariants = {
    hidden: (isRtl: boolean) => ({
      x: isRtl ? "-100%" : "100%", // start off-screen (left in RTL, right in LTR)
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      },
    },
    exit: (isRtl: boolean) => ({
      x: isRtl ? "-100%" : "100%", // slide back out
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    }),
  } as const;
  const innerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-16 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo - stays left in LTR, right in RTL automatically via flex justify-between */}
        <Link href="/" className="text-xl font-bold">
          MyBrand
        </Link>

        {/* ================= DESKTOP NAV (HOVER) ================= */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {t(item.label)}
                </Link>
              );
            }

            return (
              <Popover
                key={item.label}
                open={openMenu === item.label}
                onOpenChange={(open) => setOpenMenu(open ? item.label : null)}
              >
                <PopoverTrigger asChild>
                  <span
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                    className="flex rtl:flex-row items-center gap-1 cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition"
                  >
                    <span>{t(item.label)}</span>
                    <ChevronDown
                      className={`h-3 w-3 mt-1 transition-transform ${
                        openMenu === item.label ? "rotate-180" : ""
                      } rtl:rotate-0 `} // flip behavior in RTL (down arrow often stays down or use mirror icon)
                    />
                  </span>
                </PopoverTrigger>

                <PopoverContent
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  side="bottom"
                  align="start"
                  className="w-48 p-2"
                >
                  <div className="flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-md px-2 py-1.5 text-sm hover:bg-accent transition"
                      >
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </nav>

        {/* Desktop Language - will move to right in RTL automatically */}
        <div className="hidden md:flex">
          <LanguageSwitcher />
        </div>

        {/* ================= MOBILE MENU ================= */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side={isRtl ? "left" : "right"}
            className="p-0 w-[280px] border-none bg-background/95 backdrop-blur-lg"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key="mobile-menu"
                custom={isRtl}
                variants={sheetVariants as any}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex h-full flex-col px-6 py-6"
              >
                {/* Inner content with stagger animation */}
                <motion.div
                  variants={innerVariants as any}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col h-full"
                >
                  {/* Mobile Nav */}
                  <Accordion type="single" collapsible className="w-full">
                    {navItems.map((item) =>
                      item.children ? (
                        <motion.div
                          key={item.label}
                          variants={innerVariants as any}
                        >
                          <AccordionItem
                            value={item.label}
                            className="border-none"
                          >
                            <AccordionTrigger className="py-3 text-base font-medium">
                              {t(item.label)}
                            </AccordionTrigger>
                            <AccordionContent className="ps-4">
                              <div className="flex flex-col gap-3 pt-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="text-sm text-muted-foreground hover:text-foreground"
                                  >
                                    {t(child.label)}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={item.label}
                          variants={innerVariants as any}
                        >
                          <Link
                            href={item.href!}
                            className="block py-3 text-base font-medium"
                          >
                            {t(item.label)}
                          </Link>
                        </motion.div>
                      ),
                    )}
                  </Accordion>

                  <div className="flex-1" />

                  {/* Mobile Language */}
                  <motion.div
                    variants={innerVariants as any}
                    className="pt-5 border-t"
                  >
                    <LanguageSwitcher />
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
