import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { LoginService } from "./login/login.service";


import '../assets/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ LoginService ]
})

@HostListener('window:onbeforeunload', ['$event'])

export class AppComponent implements OnInit {
    public data: any;
    public isShow: boolean = false;

    constructor(private router: Router, private loginService: LoginService) {
        this.onBeforeUnload();
    }

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
                this.isShow = !!this.loginService.getCookie('userInfo');
            }
        });
    }

    onBeforeUnload() {
        this.loginService.deleteCookie('userInfo');
        this.loginService.deleteCookie('usr_seq');
        this.loginService.deleteCookie('grp_seq');
    }
}

