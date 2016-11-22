/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-core',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['core.component.scss', 'core.theme.scss'],
  templateUrl: 'core.component.html'
})

export class CoreComponent {
  name = 'Angular 2 Basic';

  constructor() {

  }

  ngOnInit() {
  }

}
