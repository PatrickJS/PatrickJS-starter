import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {RouterLink} from '@angular/router-deprecated';

@Component({
    selector: 'zas-header',
    pipes: [TranslatePipe],
    directives: [RouterLink],
    styles: [require('./header.component.scss')],
    template: require('./header.component.html')
})
export class HeaderComponent {

    @Input()
    currentLang: string;

    @Output()
    langChanged: EventEmitter<string> = new EventEmitter<string>();

    changeLang(lang: string): void {
        this.currentLang = lang;
        this.langChanged.emit(lang);
    }
}
