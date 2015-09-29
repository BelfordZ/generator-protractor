'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');
var _s = require('underscore.string');

var baseDir = 'test/protractor/';
var featureDir = baseDir + 'features/';
var stepDefinitionsDir = featureDir + 'stepDefinitions/';


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the transcendent ' + chalk.red('HelixProtractor') + ' generator!'
    ));

    var prompts = [
      {
        name: 'featureName',
        message: 'What is the name of your feature? (ex: super cool thing, Awesome Wicked thing)'
      },
      {
        name: 'featureContext',
        message: 'As a... (Ex: user of battlefy)'
      },
      {
        name: 'featureContents',
        message: 'I want to... (Ex: join, unjoin, checkin)'
      },
      {
        name: 'featureGoals',
        message: 'So I can... (Ex: Be superly awesome at life)'
      },
      {
        type: 'confirm',
        name: 'runTests',
        message: 'would you like to run the tests to generate the gerkin?'
      }
    ];

    this.prompt(prompts, function (props) {
      props.featureName = _.map(props.featureName.split(' '), function(featureNameFragment) {
        return _s.capitalize(featureNameFragment);
      }).join(' ');
      props.featureDefinitionName = _s.decapitalize(
        _s.camelize(props.featureName.replace(' ', ''))
      );
      props.featureFileName = _s.dasherize(props.featureName.toLowerCase()).replace(' ', '');

      if (props.featureContents.indexOf(', ') !== -1) {
        props.featureContentsArray = props.featureContents.split(', ');
        props.featureContentsArray = props.featureContentsArray.map(function(featureContent) {
          return {
            content: featureContent[0].toUpperCase() + featureContent.slice(1),
            contentTag: _s.dasherize(featureContent)
          };
        });
      } else {
        if (props.featureContents === '') {
          props.featureContentsArray = [];
        } else {
          props.featureContentsArray = [
            {
              content: props.featureContents[0].toUpperCase() + props.featureContents.slice(1),
              contentTag: _s.dasherize(props.featureContents[0])
            }
          ];
        }
      }

      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    feature: function () {
      var _this = this;

      this.fs.copyTpl(
        this.templatePath('_feature.feature'),
        this.destinationPath(featureDir + this.props.featureFileName + '.feature'),
        this.props
      );
    },

    stepDefinitions: function () {
      var _this = this;

      var newDir = stepDefinitionsDir + this.props.featureFileName + '/';

      this.fs.copyTpl(
        this.templatePath('_stepDefinition.js'),
        this.destinationPath(newDir + this.props.featureFileName + '.js'),
        this.props
      );
    }
  },
  end: function() {
    var _this = this;

    if (!this.props.runTests) {
      return;
    }

    var spawn = require('child_process').spawn;

    var cmd = 'protractor';
    var opts = [
      '',

    ];

    var ls = spawn(
      './node_modules/.bin/protractor',
      [
        'e2e.conf.js',
        '--cucumberOpts.tags=@' + this.props.featureName
      ]
    );

    ls.stdout.on('data', function (data) {
      _this.console.log('' + data);
    });

    ls.stderr.on('data', function (data) {
      _this.console.log('ERROR!! ' + data);
    });
  }
});
