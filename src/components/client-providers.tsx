"use client";

import { I18nProvider } from "@/lib/i18n/context";
import { EmailPopup } from "@/components/email-popup";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      {children}
      <EmailPopup />
    </I18nProvider>
  );
}
