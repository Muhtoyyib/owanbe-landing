import {m} from "../paraglide/messages.js";
import {getLocale as paraglideGetLocale, setLocale as paraglideSetLocale} from "../paraglide/runtime.js";
import type {UntrustedRecord} from "./untrusted.ts";

export type Locale = ReturnType<typeof paraglideGetLocale>;

export function getLocale(): Locale {
  return paraglideGetLocale();
}

export function setLocale(next: Locale): void {
  void paraglideSetLocale(next, {reload: false});
}

type MessageFunction = (inputs?: UntrustedRecord, options?: {locale?: string}) => string;

export function t(key: string, params?: UntrustedRecord, locale: Locale = getLocale()): string {
  const message = m[key as keyof typeof m] as MessageFunction | undefined;
  if (typeof message !== "function") {
    console.warn(`Missing translation for ${key}`);
    return key;
  }
  return message(params, {locale});
}
