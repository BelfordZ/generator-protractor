'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');
var _s = require('underscore.string');

var baseDir = 'test/protractor/';
var helpersDir = baseDir + 'helpers/';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to bfy ' + chalk.red('HelixProtractor: ') + chalk.blue('helper')+ ' generator!'
    ));

    var prompts = [
      {
        name: 'helpers',
        message: 'Name of the helper(s)? (ie: "cool, awesomeWicked")'
      }
    ];

    this.prompt(prompts, function(props) {
      if (props.helpers === '') {
        throw new Error('no helpers defined');
      }

      if (props.helpers.indexOf(', ') !== -1) {
        props.helpers = props.helpers.split(', ');
      } else {
        props.helpers = [ props.helpers ];
      }

      props.helpers = _.map(props.helpers, function(helper) {
        return _s.camelize(helper);
      });

      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    helpers: function () {
      var _this = this;

      this.props.helpers.forEach(function(helper) {
        _this.fs.copyTpl(
          _this.templatePath('_helper.js'),
          _this.destinationPath(helpersDir + helper + '.js'),
          { name: helper }
        );
      });
    }
  }
});
