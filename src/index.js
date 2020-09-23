import Rollbar from 'rollbar';
import init from './init';
import './locales/i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
} else {
  // eslint-disable-next-line no-unused-vars
  const rollbar = new Rollbar({
    accessToken: '48b7f0bfa52142aca2ca7effbf552ab9',
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
}

init();
