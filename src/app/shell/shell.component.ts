/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-shell',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['shell.component.scss', 'shell.theme.scss'],
  templateUrl: 'shell.component.html',
})

export class ShellComponent {
  title: 'hello'

  constructor() {

  }

  ngOnInit() {
  }

}
