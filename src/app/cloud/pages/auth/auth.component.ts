import { Component, OnInit, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit {
    loginForm: FormGroup;
    user: Meteor.User;
    error: string;
    redirect: string = '';
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private titlePage: Title,
        private authService: AuthService,
        private ngZone: NgZone
    ) {
        super();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.error = '';
        this.titlePage.setTitle('Connectez-vous');
    }

    login(credentials) {
        if (this.loginForm.valid) {
            Meteor.loginWithPassword(this.loginForm.value.username, this.loginForm.value.password, (err) => {
                if (err) {
                    this.error = err;
                } else {
                    this.authService.testLogin().subscribe(() => {

                        if (!!this.authService.user) {

                            let redir = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
                            this.redirect = redir;

                            this.user = Meteor.user();
                            this.ngZone.run(() => {
                                this.router.navigate([redir]);
                            });

                        }
                    });

                }
            });
        }
    }


}