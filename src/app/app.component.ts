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
    public isShow: boolean = false;

    constructor(private router: Router, private loginService: LoginService) {}

    ngOnInit() {
        this.load();
        this.loginService.checkUserInfo();
        this.initLayoutStatus();
    }

    load() {
        this.isShow = false;
    }

    initLayoutStatus() {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.isShow = this.loginService.getLoginStatus();
            }
        });
    }
}

