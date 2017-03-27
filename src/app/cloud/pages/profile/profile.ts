import {
  Component,
  OnInit
} from '@angular/core';
import {AuthService} from "../../services/ddp/auth.service";

@Component({
             selector: 'user-profile',
             templateUrl: 'profile.html'
           })
export class UserProfileComponent implements OnInit {
  constructor(protected authService:AuthService) { }
  
  ngOnInit() { }
  
}
