'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var metadata = {
    title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    ENV: 'development'
};

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

    writing:{
        src:function(){
            var tmpl = this.templatePath('src/*.*');
            var dest = this.destinationPath('src/');
            this.fs.copyTpl(tmpl, dest,metadata);
            tmpl=this.templatePath('src/app');
            dest=this.destinationPath('src/app');
            this.fs.copyTpl(tmpl, dest,metadata);
        },
        staticfiles:function(){
            var tmpl = this.templatePath('src/assets');
            var dest = this.destinationPath('src/assets');
            this.fs.copy(tmpl, dest);
        },
        typings:function(){
            var tmpl = this.templatePath('typings/');
            var dest = this.destinationPath('typings/');
            this.fs.copyTpl(tmpl, dest,metadata);
        },
        root:function(){
            var tmpl = this.templatePath('*.*');
            var dest = this.destinationPath('');
            this.fs.copyTpl(tmpl, dest,metadata);
        }
                        
    },

    install: function () {
        this.npmInstall()
    }
});
