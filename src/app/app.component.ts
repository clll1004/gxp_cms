import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { LoginService } from "./login/login.service";
import '../assets/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    public data: any;
    public isLayoutShow: boolean = false;

    constructor(private router: Router, private loginService: LoginService) { }

    ngOnInit() {
        this.loginService.checkUserInfo();

        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.isLayoutShow = this.loginService.getLoginStatus();
                console.log(this.loginService.getLoginStatus());
            }
        });
    }
}

