import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { LoginService } from "./login/login.service";


import '../assets/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ LoginService ]
})

export class AppComponent implements OnInit {
    public data: any;
    public isShow: boolean = true;

    constructor(private router: Router, private loginService: LoginService) {}

    ngOnInit() {
        this.loginService.checkUserInfo();
        this.initLayoutStatus();
    }

    initLayoutStatus() {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.isShow = this.loginService.getLoginStatus();
            }
        });
    }
}

