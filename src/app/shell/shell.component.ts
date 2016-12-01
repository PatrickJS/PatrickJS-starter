/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { TranslateService } from 'ng2-translate';

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
  title: string;

  constructor(translate: TranslateService) {

    this.title = 'Hello';
  }

  ngOnInit() {
  }

}
