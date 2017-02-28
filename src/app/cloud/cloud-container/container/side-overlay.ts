import {
  Component,
  OnInit
} from '@angular/core';
import {AuthService} from "../../services/ddp/auth.service";

@Component({
             selector: 'z-side-overlay',
             templateUrl: 'side-overlay.html'
           })
export class SideOverlayComponent implements OnInit {
  constructor(protected authService: AuthService) { }
  
  ngOnInit() { }
  
}
