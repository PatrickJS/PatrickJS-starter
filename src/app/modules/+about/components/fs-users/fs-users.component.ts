import { Component, Input } from '@angular/core';

@Component({
  selector: 'fs-users',
  templateUrl: './fs-users.component.html',
  styleUrls: [ './fs-users.component.scss' ]
})
export class FsUsersComponent {

  @Input() users;
  @Input() title;
  @Input() rowHeight;

  constructor() {}

  ngOnInit() {
    console.log('asfasf', this.users);

  }

}
