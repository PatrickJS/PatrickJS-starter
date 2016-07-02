/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {AppState} from './app.service';
import {HeaderComponent} from './shared-zas/components/header.component';
import {FooterComponent} from './shared-zas/components/footer.component';
import {ZasTranslationService} from './shared-zas/services/zas-translation.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    directives: [HeaderComponent, FooterComponent],
    styleUrls: [
        './app.style.css'
    ],
    template: `<div class="application application-scrolling">
    <zas-header (langChanged)="translate.setLang($event)" [currentLang]="translate.getLang()"></zas-header>

    <main>
        <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <zas-footer></zas-footer>
</div>
  `
})
export class App {
    angularclassLogo = 'img/angularclass-avatar.png';
    name = 'Angular 2 Webpack Starter';
    url = 'https://twitter.com/AngularClass';

    constructor(public appState: AppState, private translate: ZasTranslationService) {

    }

    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
