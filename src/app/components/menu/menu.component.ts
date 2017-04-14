import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'menu-component',  // <menu-component></menu-component>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './menu.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './menu.component.html'
})

export class MenuComponent {
  constructor(
  ) {}
}
