import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          errors: {
            network: 'There is a Network problem.',
            requiredMsg: 'You must enter message.',
            unremovable: 'You can remove only new channels.',
            unrenamable: 'You can rename only new channels.',
          },
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
