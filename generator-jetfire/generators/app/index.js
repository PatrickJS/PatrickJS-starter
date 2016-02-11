'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the excellent ' + chalk.red('generator-jetfire') + ' generator!'

            ));

        done();
            
        //     var prompts = [{
        //         type: 'confirm',
        //         name: 'someOption',
        //         message: 'Would you like to enable this option?',
        //         default: true
        //     }];
        // 
        //     this.prompt(prompts, function (props) {
        //         this.props = props;
        //         // To access props later use this.props.someOption;
        // 
        //         done();
        //     }.bind(this));
    },

    writing: function () {
        var tmpl = this.templatePath('src');
        var dest = this.destinationPath('src')

        this.log("the tmpl is " + tmpl);
        this.log("this is the dest " + dest);

        this.fs.copyTpl(tmpl, dest);
    },

    install: function () {
        this.installDependencies();
    }
});
