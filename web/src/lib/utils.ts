import { browser } from '$app/environment';
import { defaultLang, langs } from '$lib/constants';
import { getPreferredLocale } from '$lib/utils/i18n';
import { init, register, t } from 'svelte-i18n';
import { persisted } from 'svelte-persisted-store';
import { get } from 'svelte/store';

// Locale to use for formatting dates, numbers, etc.
export const locale = persisted<string | undefined>('locale', 'default', {
  serializer: {
    parse: (text) => text || 'default',
    stringify: (object) => object ?? '',
  },
});

const preferredLocale = browser ? getPreferredLocale() : undefined;
export const lang = persisted<string>('lang', preferredLocale || defaultLang.code, {
  serializer: {
    parse: (text) => text,
    stringify: (object) => object ?? '',
  },
});

export const initLanguage = async () => {
  const preferenceLang = get(lang);
  for (const { code, loader } of langs) {
    register(code, loader);
  }

  await init({ fallbackLocale: preferenceLang === 'dev' ? 'dev' : defaultLang.code, initialLocale: preferenceLang });
};

export const copyToClipboard = async (secret: string) => {
  const $t = get(t);

  try {
    await navigator.clipboard.writeText(secret);
  } catch (error) {}
};
