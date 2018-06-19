import { Component } from '@angular/core';
import { userData } from "./login-interface.component";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ LoginService ]
})

export class LoginComponent {
    constructor(private router: Router, private loginService: LoginService) { }

    userData: userData = {
        userId: '',
        userPassword: ''
    };

    login() {
        this.loginService.login(this.userData.userId, this.userData.userPassword);
    }
}


