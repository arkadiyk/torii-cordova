/* global SafariViewController:false */

import Ember from 'ember';
import ParseQueryString from 'torii/lib/parse-query-string';

function parseMessage(url, keys){
  var parser = ParseQueryString.create({url: url, keys: keys});
  var data = parser.parse();
  return data;
}

export default Ember.Object.extend({
  open(url, keys, options) {
    return new Ember.RSVP.Promise(function(resolve, reject){
      SafariViewController.isAvailable(function (available) {
        if (available) {
          SafariViewController.show(
            {url, ...options},
            function (result) {
              if (result.event === 'loaded') {
                const _handleOpenURL = window.handleOpenURL;
                window.handleOpenURL = function handleOpenURL(url) {
                  Ember.run(function() {
                    SafariViewController.hide();
                    window.handleOpenURL = _handleOpenURL || function(){};
                    const data = parseMessage(url, keys);
                    resolve(data);
                  });
                }
              }
              if (result.event === 'closed') {
                window.handleOpenURL = function(){};
              }
            },
            function (error) {
              reject(`Error ${error}`);
            }
          );
        } else {
          reject("Safari View is not available");
        }
      });

    });
  }
});
