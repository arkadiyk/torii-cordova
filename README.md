# torii-cordova

Addon to use torii authentication in Cordova using `SafariViewController`
iOS component

The addon is based on a method described in the article here:
[Stop using InAppBrowser for your Cordova/Phonegap oAuth flow](https://medium.com/@jlchereau/stop-using-inappbrowser-for-your-cordova-phonegap-oauth-flow-a806b61a2dc5#.733iniq6n)

It depends on [Custom URL scheme](https://github.com/EddyVerbruggen/Custom-URL-scheme) and [SafariViewController](https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller) cordova plugins

## Installation

`ember install torii-cordova`

## Setup
1. Register a custom url scheme with your app, e.g. `mycoolapp://`
1. Confugure your Ember project to use `cordova-popup`
```js
    // config/environment.js
    module.exports = function(environment) {
      var ENV = {
        torii: {
          sessionServiceName: 'session',
          providers: {
            '<provider-name>': {
              remoteServiceName: 'cordova-popup',
              redirectUri: 'http://localhost:4000/fw' // static html with JS
                                                      // for custom url scheme
                                                      // redirect
            }
          }
        }
      };
    }  
```
1. You need a static web page hosted on your server in order to do redirect to your cordova app using custom url scheme.
```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none';script-src 'unsafe-inline';">
  </head>
  <body>
      <script>window.location.assign('mycoolapp://token' + window.location.hash);</script>
  </body>
</html>
```

Please read [Stop using InAppBrowser for your Cordova/Phonegap oAuth flow](https://medium.com/@jlchereau/stop-using-inappbrowser-for-your-cordova-phonegap-oauth-flow-a806b61a2dc5#.733iniq6n) article for details.
