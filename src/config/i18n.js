export const fallback = "en";
export const supportedLocales = {
  en: {
    name: "English",
    translationFileLoader: () => require('../lang/en.json'),
    // en is default locale in Moment
    momentLocaleLoader: () => Promise.resolve(),
  },
  it: {
    name: "Italiano",
    translationFileLoader: () => require('../lang/it.json'),
    momentLocaleLoader: () => import('moment/locale/it'),
  },
};
export const defaultNamespace = "common";
export const namespaces = [
  "AuthScreen",
  "LoginScreen",
  "RegisterScreen",
  "ForgotPasswordScreen",
  "form",
  "errors"
];
