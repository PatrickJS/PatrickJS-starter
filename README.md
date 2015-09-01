[![GitHub version](https://badge.fury.io/gh/angular-class%2Fangular2-webpack-starter.svg)](http://badge.fury.io/gh/angular-class%2Fangular2-webpack-starter)
[![Dependency Status](https://david-dm.org/angular-class/angular2-webpack-starter.svg)](https://david-dm.org/angular-class/angular2-webpack-starter)
[![Issue Stats](http://issuestats.com/github/angular-class/angular2-webpack-starter/badge/pr?style=flat)](http://issuestats.com/github/angular-class/angular2-webpack-starter)
[![Issue Stats](http://issuestats.com/github/angular-class/angular2-webpack-starter/badge/issue?style=flat)](http://issuestats.com/github/angular-class/angular2-webpack-starter)

<p align="center">
  <img src="https://res.cloudinary.com/angularclass/image/upload/v1431925418/webpackAndangular2_dwhus9.png" alt="Webpack and Angular 2" width="500" height="320"/>
</p>

# Angular2 Webpack Starter [![Join the chat at https://gitter.im/angular-class/angular2-webpack-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular-class/angular2-webpack-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


> A starter kit featuring [Angular 2](https://angular.io) ([Router](https://angular.io/docs/js/latest/api/router/), [Forms](https://angular.io/docs/js/latest/api/forms/),
[Http](https://angular.io/docs/js/latest/api/http/),
[Services](https://gist.github.com/gdi2290/634101fec1671ee12b3e#_follow_@AngularClass_on_twitter),
[Tests](https://angular.io/docs/js/latest/api/test/), [E2E](https://angular.github.io/protractor/#/faq#what-s-the-difference-between-karma-and-protractor-when-do-i-use-which-)), [Karma](https://karma-runner.github.io/), [Protractor](https://angular.github.io/protractor/), [Jasmine](https://github.com/jasmine/jasmine), [TypeScript](http://www.typescriptlang.org/), and [Webpack](http://webpack.github.io/) by [AngularClass](https://angularclass.com).

> If you're looking for Angular 1.x please use [NG6-starter](https://github.com/angular-class/NG6-starter)

This repo serves as a starter for anyone looking to get up and running with Angular 2 and TypeScript fast. Using a [Webpack](http://webpack.github.io/) for building our files and assisting with boilerplate. We're also using Protractor for our end-to-end story and Karma for our unit tests.
* Best practice in file and application organization for Angular 2.
* Ready to go build system using Webpack for working with TypeScript.
* Test and end-to-end system using Karma and Protractor.


```coffeescript
Warning: Angular 2.0 is not production ready yet!
```
[Is Angular 2 Ready Yet?](http://splintercode.github.io/is-angular-2-ready/)

### Quick start
> Clone/Download the repo then edit `app.ts` inside [`/src/app/app.ts`](/src/app/app.ts)

```bash
# clone our repo
git clone https://github.com/angular-class/angular2-webpack-starter.git 

# change directory to our repo
cd angular2-webpack-starter

# then open your browser and go to http://localhost:3000
npm start 
```

# Table of Contents
* [File Structure](#file-structure)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
* [Contributing](#contributing)
* [TypeScript](#typescript)
* [Frequently asked questions](#frequently-asked-questions)
* [Support, Questions, or Feedback](#support-questions-or-feedback)
* [License](#license)


## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
angular2-webpack-starter/
 ├──src/                                   * our source files that will be compiled to javascript
 │   │
 │   ├──app/                               * WebApp: folder
 │   │   ├──app.ts                         * App.ts: a simple version of our App component components
 │   │   └──bootstrap.ts                   * entry file for app
 │   │
 │   ├──bindings/                          * where common files used throughout our app
 │   │   ├──location_bindings.ts           * injectables to change the Router location Strategy
 │   │   └──change_detection_bindings.ts   * injectables to change Angular's Change Detection Strategy
 │   │
 │   ├──public/                            * static assets are served here
 │   │   ├──lib/                           * static libraries
 │   │   │   └──es6-shim.js                * ignore this file. This is needed to polyfill the browser to for ES6 features to similarly
 │   │   │
 │   │   ├──favicon.ico                    * replace me with your own favicon.ico
 │   │   ├──service-worker.js              * ignore this. Web App service worker that's not complete yet
 │   │   ├──robots.txt                     * for search engines to crawl your website
 │   │   ├──human.txt                      * for humans to know who the developers are
 │   │   │
 │   │   └──index.html                     * Index.html: where we place our script tags
 │   │
 │   └──typings/                           * where we define our custom types
 │       ├──ng2.d.ts                       * where we patch angular2 types with our own types until it's fixed
 │       └──_custom.d.ts                   * we include all of our custom types here
 │
 ├──tsd_typings/                           * ignore this auto generated file from tsd
 │   └──tsd.d.ts                           * ignore this our main file for all of our type definitions
 │
 ├──test/                                  * this is our global unit tests and end-to-end tests
 │
 ├──spec.bundle.js                         * ignore this magic that sets up our angular 2 testing environment
 ├──karma.config.js                        * karam config for our unit tests
 ├──protractor.config.js                   * protractor config for our end-to-end tests
 ├──tsconfig.json                          * config that webpack uses for typescript
 ├──tsd.json                               * config that tsd uses for managing it's definitions
 ├──package.json                           * what npm uses to manage it's dependencies
 └──webpack.config.js                      * our webpack config
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v0.12.2`+ and NPM `2.10.0`+

Once you have those, you should install these globals with `npm install --global`:
* `webpack` (`npm install --global webpack`)
* `webpack-dev-server` (`npm install -global webpack-dev-server`)
* `karma` (`npm install --global karma-cli`)
* `protractor` (`npm install --global protractor`)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `npm run server` to start the dev server in another tab

## Running the app
After you have installed all dependencies you can now run the app. Run `npm run server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:3000` (or if you prefer IPv6, if you're using `express` server, then it's `http://[::1]:3000/`).
 
### server
```bash
$ npm run server # or either webpack-dev-server or npm run express
```

## Other commands 

### build files
```bash
$ npm run build  # or webpack
```

### watch and build files
```bash
$ npm run watch  # or webpack --watch
```

### run tests 
```bash
$ npm run test  # or karma start
```

### run webdriver (for end-to-end)
```bash
$ npm run webdriver-start  # or webdriver-manager start
```

### run end-to-end tests
```bash
# make sure you have webdriver running and a sever for the client app
$ npm run e2e  # or protractor
```

# Contributing
You can include more examples as components but they must introduce a new concept such as `Home` component (separate folders), and Todo (services). I'll accept pretty much everything so feel free to open a Pull-Request

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 1.5 includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

    $ npm install --global typescript

## .d.ts Typings
The TSD typings in `tsd_typings/` are autogenerated.

    $ npm install --global tsd
 > You may need to require `reference path` for your editor to autocomplete correctly
 ```
 /// <reference path="/src/typings/_custom.d.ts" />
 ```
 
 If your editor only works with reference path here's the convention I'm using
 
`/src/typings/` hand written typings for when you need to create/update one for a library 

`/src/typings/_custom.d.s` main file to require everything (reference path this file)

`/src/typings/tsd.d.ts` requires tsd_typings

`/tsd_typings/` tsd typings (like node_modules these files live and generates at root level)

 Otherwise including them in `tsd.json` is much prefered 

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

# Frequently asked questions
* Why we are using traceur-runtime?
  * This for the ES6 polyfills.
* If TypeScript compiles to ES5 why do we need traceur-runtime?
  * Angular 2 framework itself expects these ES6 features.
* What's the current browser support for Angular 2 Alpha?
  * As of version 2.0.0-alpha.26: Chrome (43, 44, 45), Firefox (37, 39, 40), IE 11, Safari 8, iOS 8, Android 5.1 (Chrome Mobile 39).
* What is the `TypeScript warning "Value of type 'typeof Directive' is not callable. Did you mean to include 'new'?`"?
  * This is an error with the typings defined in DefinitelyTyped (please ignore until it's fixed)
* How do I use `moduleId` with `module.id` in webpack?
  * Please use `__filename` if you must use `templateUrl` and `styleUrls` rather than webpack's module system
* Why is my service not injecting parameter correctly?
  * Please use `@Injectable()` for your service for typescript to corrrectly attach the metadata (this is a typescript beta problem)
* Where do I write my tests? 
  * You can write your tests anywhere you like either next to your components or in the  `test/` folder
* Is Angular 2 production ready yet?
  * No, please visit [Is Angular 2 Ready Yet?](http://splintercode.github.io/is-angular-2-ready/) website.
* How do I start the app when I get `EACCES` and `EADDRINUSE` errors? 
  * The `EADDRINUSE` error means the port `3000` is currently being used and `EACCES` is lack of permission for webpack to build files to `./__build__/`


# Support, Questions, or Feedback
> Contact us anytime for anything about this repo or Angular 2

* [Gitter: angular-class/angular2-webpack-starter](https://gitter.im/angular-class/angular2-webpack-starter)
* [Twitter: @AngularClass](https://twitter.com/AngularClass)


# Other Seed/Starter/Example Repos
* [angular2-webpack-starter (AngularClass)](https://github.com/angular-class/angular2-webpack-starter)
  * Client/Server, Webpack, TypeScript, TSD, Protractor, Karma, Jasmine, Env Dev/Prod, Server API
* [ng2-play.ts (Pawel Kozlowski)](https://github.com/pkozlowski-opensource/ng2-play.ts)
  * Client only, Minimalist, SystemJS, Gulp, TypeScript
* [angular2-seed (Minko Gechev)](https://github.com/mgechev/angular2-seed)
  * Client only, SystemJS, Gulp, TypeScript, TSD, Versioned, Env Dev/Prod
* [ng2-play (Roland Groza)](https://github.com/rolandjitsu/ng2-play)
  * Client only, ES6, TypeScript, Firebase, Gulp, Ci, TSD, TSLint
* [ng2-jspm-seed (Rob Wormald)](https://github.com/robwormald/ng2-jspm-seed)
  * Client only, TypeScript, TSD, Gulp, JSPM, Minimalist
* [babel-angular2-app (Shuhei Kagawa)](https://github.com/shuhei/babel-angular2-app)
  * Client only, Minimalist, Babel, ES6+, Webpack (outdated)
  
___

enjoy — **AngularClass** 

<br><br>

[![AngularClass](https://angularclass.com/images/ng-crown.svg  "Angular Class")](https://angularclass.com)
##[AngularClass](https://angularclass.com)
> Learn Angular in 2 days from the best

# License
 [MIT](/LICENSE)
