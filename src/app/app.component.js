"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Angular 2 decorators and services
 */
var core_1 = require("@angular/core");
/**
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(appState) {
        this.appState = appState;
        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
        this.name = 'Angular 2 Webpack Starter';
        this.url = 'https://twitter.com/AngularClass';
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('Initial App State', this.appState.state);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        encapsulation: core_1.ViewEncapsulation.None,
        styleUrls: [
            './app.component.css'
        ],
        template: "\n    <nav>\n      <a [routerLink]=\" ['./'] \"\n        routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n        Index\n      </a>\n      <a [routerLink]=\" ['./home'] \"\n        routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n        Home\n      </a>\n      <a [routerLink]=\" ['./detail'] \"\n        routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n        Detail\n      </a>\n      <a [routerLink]=\" ['./barrel'] \"\n        routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n        Barrel\n      </a>\n      <a [routerLink]=\" ['./about'] \"\n        routerLinkActive=\"active\" [routerLinkActiveOptions]= \"{exact: true}\">\n        About\n      </a>\n    </nav>\n\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n\n    <pre class=\"app-state\">this.appState.state = {{ appState.state | json }}</pre>\n\n    <footer>\n      <span>WebPack Angular 2 Starter by <a [href]=\"url\">@AngularClass</a></span>\n      <div>\n        <a [href]=\"url\">\n          <img [src]=\"angularclassLogo\" width=\"25%\">\n        </a>\n      </div>\n    </footer>\n  "
    })
], AppComponent);
exports.AppComponent = AppComponent;
/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
