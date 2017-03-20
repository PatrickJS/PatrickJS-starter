import {
  Component,
  OnInit
} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/ddp/auth.service";
import {ToastsManager} from "ng2-toastr";

@Component({
             selector   : 'verify-email',
             templateUrl: 'verify.html'
           })
export class VerifyEmailComponent implements OnInit {
  token: string = "";

  constructor(protected router: Router,
              protected authService: AuthService,
              private activeRoute: ActivatedRoute,
              protected toast: ToastsManager) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((p) => {
      this.token = p['token'];
      if (!!this.token){
        this.authService.verifyEmail(this.token)
          .then(() => {
            Meteor.user().emails[0].verified = true;
            this.toast.success('Verify Successful');
          }).catch((err) => {
            this.toast.error(err);
          });
      }
    });

  }



}
