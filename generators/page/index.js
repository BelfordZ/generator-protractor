'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore');
var _s = require('underscore.string');

var baseDir = 'test/protractor/';
var pagesDir = baseDir + 'pages/';

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to bfy ' + chalk.red('HelixProtractor: ') + chalk.blue('page')+ ' generator!'
    ));

    var prompts = [
      {
        name: 'pages',
        message: 'Name of the page(s)? (ie: "Cool, AwesomeWicked")'
      }
    ];

    this.prompt(prompts, function (props) {
      if (props.pages === '') {
        throw new Error('no pages defined');
      }

      if (props.pages.indexOf(', ') !== -1) {
        props.pages = props.pages.split(', ');
      } else {
        props.pages = [ props.pages ];
      }

      props.pages = _.map(props.pages, function(page) {
        return _s.capitalize(_s.camelize(page)).replace(' ', '');
      });

      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    helpers: function () {
      var _this = this;

      this.props.pages.forEach(function(page) {
        _this.fs.copyTpl(
          _this.templatePath('_page.js'),
          _this.destinationPath(pagesDir + page + '.js'),
          { name: page }
        );
      });
    }
  }
});
