/**
 * A class for defining <%= name %> Page Actions
 * @class
 */
function <%= name %>() {
  this.els = {};

  this.selectors = {};
};

/**
 * @return {!webdriver.promise.Promise} A promise that will resolve after
 * opening the auth panel.
 */
<%= name %>.prototype.method = function() {
  return;
};

module.exports = <%= name %>;
