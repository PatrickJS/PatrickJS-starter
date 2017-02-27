import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/ddp/auth.service";
import {Router} from "@angular/router";

@Component({
             selector: 'z-header',
             templateUrl: 'header.html'
           })
export class HeaderComponent implements OnInit {
  constructor(protected authService:AuthService,protected router:Router) { }

  ngOnInit() { }

}
