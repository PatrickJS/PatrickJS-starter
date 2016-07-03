import {Component} from "@angular/core";
import {TranslatePipe} from "ng2-translate/ng2-translate";

@Component({
  selector: 'zas-footer',
  pipes: [ TranslatePipe ],
  styles: [require('./footer.component.scss')],
  template: require('./footer.component.html')
})
export class FooterComponent {
  copyrightYear: number = 2016;


  constructor() {
    this.copyrightYear = new Date().getFullYear();
  }
}
