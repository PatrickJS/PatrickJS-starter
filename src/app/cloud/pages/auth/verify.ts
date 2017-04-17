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
  email: string = "";

  constructor(protected router: Router,
              protected authService: AuthService,
              private activeRoute: ActivatedRoute,
              protected toast: ToastsManager) {}

  ngOnInit() {
    if (Meteor.user().emails[0].verified){
      this.router.navigate(['']);
    }
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

    if(!this.token){
      this.email = this.authService.getCurrentUser().emails[0].address;
      this.initPageJs();
    }
  }

  private initPageJs() {
    let vm                  = this;
    // Init Login Form Validation, for more examples you can check out https://github.com/jzaefferer/jquery-validation
    let initValidationLogin = function () {
      jQuery('.js-validation-verify').validate({
                                                errorClass    : 'help-block text-right animated fadeInDown',
                                                errorElement  : 'div',
                                                errorPlacement: function (error, e) {
                                                  jQuery(e).parents('.form-group > div').append(error);
                                                },
                                                highlight     : function (e) {
                                                  jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
                                                  jQuery(e).closest('.help-block').remove();
                                                },
                                                success       : function (e) {
                                                  jQuery(e).closest('.form-group').removeClass('has-error');
                                                  jQuery(e).closest('.help-block').remove();
                                                },
                                                rules         : {
                                                },
                                                messages      : {
                                                },
                                                submitHandler : function (form) {
                                                  vm.authService.sendVerifyEmailLink()
                                                    .then(() => {
                                                      vm.router.navigate(['']);
                                                    }).catch((err) => {
                                                      vm.toast.error(err);
                                                    });
                                                }
                                              });
    };
    initValidationLogin();
  }



}
