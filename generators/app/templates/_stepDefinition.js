function <%= featureDefinitionName %>Definition() {
  this.World = require('../../support/world').World;

  this.Given(/^I am on some page$/, function() {
    browser.get(this.config.helixUrl);
  });

  this.When(/^I add a new thing$/, function() {
    browser.get(this.config.helixUrl);
  });

  this.Then(/^I should see a thing inside the thingy box$/, function() {
    browser.get(this.config.helixUrl);
  });
};

module.exports = <%= featureDefinitionName %>Definition;
