import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'filter-component',  // <filter-component></filter-component>
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './filter.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './filter.component.html'
})

export class FilterComponent {
  constructor(
  ) {}
}
