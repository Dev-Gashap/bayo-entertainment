"use client";

import { I18nProvider } from "@/lib/i18n/context";
import { EmailPopup } from "@/components/email-popup";
import { ChatFab } from "@/components/chat-fab";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      {children}
      <EmailPopup />
      <ChatFab />
    </I18nProvider>
  );
}
