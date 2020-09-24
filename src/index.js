import init from './init';
import './locales/i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init();
