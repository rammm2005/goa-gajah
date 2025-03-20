import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ThemeProviders from "@/components/theme-provider";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: "en" | "id" };
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  if (!routing.locales.includes(params.locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProviders
      >
        {children}
      </ThemeProviders>
    </NextIntlClientProvider>
  );
}
