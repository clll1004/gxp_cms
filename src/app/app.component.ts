import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { LoginService } from "./login/login.service";


import '../assets/css/styles.css';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ LoginService ]
})

@Injectable()
export class AppComponent implements OnInit {
    public data: any;
    public isShow: boolean = true;

    constructor(private router: Router, private http: Http, private loginService: LoginService) {}

    ngOnInit() {
        this.loginService.checkUserInfo();
        this.initLayoutStatus();
        this.loadData();
    }

    loadData() {
        this.data = this.http.get('http://183.110.11.49/adm/customer/list')
            .map(response => response.json());
    }

    initLayoutStatus() {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                this.isShow = this.loginService.getLoginStatus();
            }
        });
    }
}

