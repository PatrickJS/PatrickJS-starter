import { Component, ViewEncapsulation } from '@angular/core';
import { FsUsersService } from '../fs-users/fs-users.service';

@Component({
  selector: 'about',
  providers: [FsUsersService],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})

export class AboutComponent {
  dataUsers;
  private usersService: FsUsersService;

  constructor() {
    // console.log(usersService);
  }

  ngOnInit() {
    this.usersService
    .search()
    .subscribe(
      data => {
        console.log('datos usuarios', data);
        this.dataUsers = data;
    });
  }

}
