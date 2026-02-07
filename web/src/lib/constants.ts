interface Lang {
  name: string;
  code: string;
  loader: () => Promise<{ default: object }>;
  rtl?: boolean;
  weblateCode?: string;
}

export const defaultLang: Lang = { name: 'English', code: 'en', loader: () => import('$i18n/en.json') };

export const langs: Lang[] = [defaultLang];

// should be the same values as the ones in the app.html
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
