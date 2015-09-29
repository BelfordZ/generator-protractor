'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('helix-protractor:app', function () {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        featureName: 'Foo Bar Baz',
        featureContext: 'Person writing a test',
        featureContents: 'do a bunch of x,y,z',
        featureGoals: 'Do amazing things',
        runTests: false
      })
      .on('end', done);
  });

  it('Creates the feature file and the step definitions folder', function () {
    assert.file([
      'test/protractor/features/foo-bar-baz.feature',
      'test/protractor/features/stepDefinitions/foo-bar-baz/foo-bar-baz.js'
    ]);
  });
});

describe('helix-protractor:helper', function () {
  it('creates a single helper when a single name is provided', function(done) {
    helpers.run(path.join(__dirname, '../generators/helper'))
      .withPrompts({
        helpers: 'Foo'
      })
      .on('end', function() {
        assert.file([
          'test/protractor/helpers/foo.js'
        ]);

        done();
      });
  });

  it('creates multiple helpers when a comma seperated list is provided', function(done) {
    helpers.run(path.join(__dirname, '../generators/helper'))
      .withPrompts({
        helpers: 'foo, bar boom, Baz, bar-foo'
      })
      .on('end', function() {
        assert.file([
          'test/protractor/helpers/foo.js',
          'test/protractor/helpers/barBoom.js',
          'test/protractor/helpers/baz.js',
          'test/protractor/helpers/barFoo.js'
        ]);

        done();
      });
  });
});


describe('helix-protractor:pages', function () {
  it('creates a single pages when a single name is provided', function(done) {
    helpers.run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        pages: 'foo'
      })
      .on('end', function() {
        assert.file([
          'test/protractor/pages/Foo.js'
        ]);

        done();
      });
  });

  it('creates multiple pages when a comma seperated list is provided', function(done) {
    helpers.run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        pages: 'foo, barBaz, baz-foo, Foo Bar'
      })
      .on('end', function() {
        assert.file([
          'test/protractor/pages/foo.js',
          'test/protractor/pages/BarBaz.js',
          'test/protractor/pages/BazFoo.js',
          'test/protractor/pages/FooBar.js'
        ]);

        done();
      });
  });
});
