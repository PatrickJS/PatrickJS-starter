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

  private profile = {
    first_name: "",
    last_name: ""
  };
  private _data = {};

  constructor(protected authService:AuthService) { }
  
  ngOnInit() {

    if (this.authService.getCurrentUser()){
      this._data = this.authService.getCurrentUser();
      if (!this._data.hasOwnProperty('profile')){
        this._data['profile'] = this.profile;
      }
    }
    this.initPageJs();
  }

  private initPageJs() {
    let vm                            = this;
    let initProfileValidationMaterial = function () {
      jQuery('.js-validation-profile-form').validate({
                                                       errorClass: 'help-block text-right animated fadeInDown',
                                                       errorElement: 'div',
                                                       errorPlacement: function (error, e) {
                                                         jQuery(e).parents('.form-group > div').append(error);
                                                       },
                                                       highlight: function (e) {
                                                         var elem = jQuery(e);

                                                         elem.closest('.form-group').removeClass('has-error').addClass('has-error');
                                                         elem.closest('.help-block').remove();
                                                       },
                                                       success: function (e) {
                                                         var elem = jQuery(e);

                                                         elem.closest('.form-group').removeClass('has-error');
                                                         elem.closest('.help-block').remove();
                                                       },
                                                       rules: {
                                                       },
                                                       messages: {
                                                       },
                                                       submitHandler: function (form) {
                                                         vm.authService.updateProfile(vm._data);
                                                       }
                                                     });
    };
    initProfileValidationMaterial();
  }
  
}
