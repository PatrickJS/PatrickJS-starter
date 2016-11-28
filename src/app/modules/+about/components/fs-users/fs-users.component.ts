import { Component, Input } from '@angular/core';

@Component({
  selector: 'fs-users',
  templateUrl: './fs-users.component.html',
  styleUrls: [ './fs-users.component.scss' ]
})
export class FsUsersComponent {

  @Input() elements = [];
  @Input() title;
  @Input() rowHeight;

  constructor() {}

  ngOnInit() {

  }

}
