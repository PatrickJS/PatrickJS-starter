<p align="center">
  <img src="https://res.cloudinary.com/angularclass/image/upload/v1431925418/webpackAndangular2_dwhus9.png" alt="Webpack and Angular 2" width="500" height="320"/>
</p>

# Angular2 Webpack Starter [![Join the chat at https://gitter.im/angular-class/angular2-webpack-starter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular-class/angular2-webpack-starter?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> A starter kit featuring [Angular 2](https://angular.io) ([Router](https://angular.io/docs/js/latest/api/router/), [Forms](https://angular.io/docs/js/latest/api/forms/), [Services](https://gist.github.com/gdi2290/634101fec1671ee12b3e#_follow_@AngularClass_on_twitter)), [TypeScript](http://www.typescriptlang.org/), and [Webpack](http://webpack.github.io/) by [AngularClass](https://angularclass.com).

> If you're looking for Angular 1.x please use [NG6-starter](https://github.com/angular-class/NG6-starter)

This repo serves as an extremely minimal starter for anyone looking to get up and running with Angular 2 and TypeScript. Using a [Webpack](http://webpack.github.io/) for building our files and assisting with boilerplate.
* Best practice in file organization for Angular 2.
* Ready to go build system using Webpack for working with TypeScript.

### Quick start
> Clone/Download the repo then edit `app.ts` inside [`/src/app/components/app.ts`](/src/app/components/app.ts)

```bash
$ npm start # then open your browser and go to http://localhost:8080
```


## File Structure
We use the component approach in our starter. This is the new standard for developing Angular apps and a great way to ensure maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
angular2-webpack-starter/
 ├──public/                           * static assets are served here
 │   ├──lib/                          * static libraries
 │   │   └──traceur-runtime.min.js    * ignore this file. This is needed to polyfill the browser to for ES6 features to similarly
 │   │
 │   ├──favicon.ico                   * replace me with your own favicon.ico
 │   ├──service-worker.js             * ignore this. Web App service worker that's not complete yet
 │   ├──robots.txt                    * for search engines to crawl your website
 │   ├──human.txt                     * for humans to know who the developers are
 │   │
 │   └──index.html                    * Index.html: where we place our script tags
 │
 ├──src/                              * our source files that will be compiled to javascript
 │   ├──app/                          * WebApp folder
 │   │   ├──bootstrap.ts              * entry file for app
 │   │   │
 │   │   ├──components/               * where most of components live
 │   │   │   ├──todo.ts               * an example of a component using a service and forms
 │   │   │   ├──dashboard.ts          * a simple Component with a simple Directive example
 │   │   │   │
 │   │   │   ├──home/                 * example component as a folder
 │   │   │   │   ├──home.ts           * how you would require your template and style files
 │   │   │   │   ├──home.css          * simple css file for home styles
 │   │   │   │   └──home.html         * simple html file for home template
 │   │   │   │
 │   │   │   └──app.ts                * App.ts: entry file for components
 │   │   │
 │   │   ├──services/                 * where we keep our services used throughout our app
 │   │   │   ├──TodoService.ts        * an example of a simple service 
 │   │   │   └──services.ts           * where we gather our injectables from our services
 │   │   │
 │   │   └──directives/               * where we keep our directives used throughout our app
 │   │       ├──Autofocus.ts          * another simple directive to fix a problem with the router
 │   │       └──directives.ts         * where we gather our directives from our directives
 │   │
 │   └──common/                       * where common files used throughout our app
 │       ├──shadowDomInjectables.ts   * determind if the user is on chrome and use ShadowDom
 │       ├──jitInjectables.ts         * turn on Just-In-Time Change Detection
 │       ├──formInjectables.ts        * services exported by angular/forms which is the FormBuilder
 │       └──BrowserDomAdapter.ts      * ignore this. we need to set the DomAdapter to the browser
 │
 ├──typings/                          * where tsd defines it's types definitions
 │   ├──_custom/                      * where we define our custom types
 │   │   ├──ng2.d.ts                  * where we patch angular2 types with our own types until it's fixed
 │   │   └──custom.d.ts               * we include all of our custom types here
 │   │
 │   ├──angular2/
 │   │   └──angular2.d.ts             * our Angular 2 type definitions
 │   │
 │   ├──es6-promise/
 │   │   └──es6-promise.d.ts          * ES6 promises type definitions
 │   │
 │   ├──rx/
 │   │   ├──rx-lite.d.ts              * rx-lite type definitions
 │   │   └──rx.d.ts                   * rx type definitions
 │   │
 │   └──tsd.d.ts.ts                   * our main file for all of our type definitions
 │
 ├──tsconfig.json                     * config that webpack uses for typescript
 ├──tsd.json                          * config that tsd uses for managing it's definitions
 ├──package.json                      * what npm uses to manage it's dependencies
 └──webpack.config.js                 * our webpack config
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v0.12.2`+ and NPM `2.10.0`+

Once you have those, you should install these globals with `npm install -global`:
* `webpack` (`npm install -global webpack`)
* `webpack-dev-server` (`npm install -global webpack-dev-server`)

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies
* `npm run server` to start the server

## Running the app
After you have installed all dependencies you can now run the app. Run `npm server` to start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.
 
### server
```bash
$ npm run server
```

### build files
```bash
$ npm run build
```

### watch and build files
```bash
$ npm run watch
```

### Contributing
You can include more examples as components but they must introduce a new concept such as `Home` component (separate folders), and Todo (services). I'll accept pretty much everything so feel free to open a Pull-Request

# TypeScript
> To take full advantage of TypeScript with autocomplete you would have to install it globally and use an editor with the correct TypeScript plugins.

## Use latest TypeScript compiler
TypeScript 1.5 beta includes everything you need. Make sure to upgrade, even if you installed TypeScript previously.

    $ npm install -global typescript@^1.5.0-beta

## .d.ts Typings
The typings in `typings/` are partially autogenerated, partially hand
written. All the symbols should be present, but probably have wrong paramaters
and missing members. Modify them as you go.

    $ npm install -global tsd
 > You may need to require `reference path` for your editor to autocomplete correctly
 ```
 /// <reference path="../../typings/tsd.d.ts" />
 ```
 Otherwise including them in `tsd.json` is prefered 

## Use a TypeScript-aware editor
We have good experience using these editors:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Webstorm 10](https://www.jetbrains.com/webstorm/download/)
* [Atom](https://atom.io/) with [TypeScript plugin](https://atom.io/packages/atom-typescript)
* [Sublime Text](http://www.sublimetext.com/3) with [Typescript-Sublime-Plugin](https://github.com/Microsoft/Typescript-Sublime-plugin#installation)

## Frequently asked questions
* Why we are using traceur? This is due to Angular 2 not being fully migrated to TypeScript and will be removed soon.
* What's the current browser support for Angular 2 Alpha? as of version 2.0.0-alpha.26: Chrome (43, 44, 45), Firefox (37, 39, 40), IE 11, Safari 8, iOS 8, Android 5.1 (Chrome Mobile 39).
* What is the TypeScript warning "Value of type 'typeof Directive' is not callable. Did you mean to include 'new'?"? This is an error with the typings defined in DefinitelyTyped (please ignore until it's fixed)

### Todo
- [ ] production/development environments
- [ ] testing
- [ ] e2e
- [ ] production services examples
- [ ] hot-component-reloading

# Starter Kit Support and Questions
> Contact us anytime for anything about this repo

* [Gitter: angular-class/angular2-webpack-starter](https://gitter.im/angular-class/angular2-webpack-starter)
* [Twitter: @AngularClass](https://twitter.com/AngularClass)

___

enjoy — **AngularClass** 

<br><br>

[![AngularClass](https://angularclass.com/images/ng-crown.svg  "Angular Class")](https://angularclass.com)
##[AngularClass](https://angularclass.com)
> Learn Angular in 2 days from the best
