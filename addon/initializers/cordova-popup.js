import CordovaPopup from 'torii-cordova/services/cordova-popup';

export function initialize(application) {
  application.register('torii-service:cordova-popup', CordovaPopup);
}

export default {
  name: 'cordova-popup',
  initialize
};
