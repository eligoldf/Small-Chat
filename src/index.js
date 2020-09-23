import Rollbar from 'rollbar';
import init from './init';
import './locales/i18n';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
} else {
  // eslint-disable-next-line no-unused-vars
  const rollbar = new Rollbar({
    accessToken: '20f3491c65a54154897a139de3c41ebd',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  });
}

init();
