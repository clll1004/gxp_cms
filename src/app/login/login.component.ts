import { Component } from '@angular/core';
import { userData } from "./login-interface.component";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private router: Router) { }

    userData: userData = {
        userId: '',
        userPassword: ''
    };

    login() {
        const cookieData = this.userData.userId + "/" + this.userData.userPassword ;

        this.setCookie("userInfo", cookieData, 7, true);
        console.log(this.getCookie('userInfo', true));

        if(this.userData.userId && this.userData.userPassword) {
            this.router.navigate(['/', 'home']);
        }
    }

    setCookie(name:string, value:string, exp:number, isEncoding:boolean = false) {
        const date = new Date();
        date.setTime(date.getTime() + exp*1000*60*60*24);

        document.cookie = name + "=" + (isEncoding ? btoa(value) : value) + "; expires=" + date.toUTCString() + "; path=/";
    }

    getCookie(name:string, isDecoding:boolean = false) {
        const data = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        const value = data? data[2] : null;

        return isDecoding ? atob(value) : value;
    }
}


