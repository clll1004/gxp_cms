import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Http } from "@angular/http";

@Component({
    selector: 'path',
    templateUrl: './path.component.html',
    styleUrls: ['./path.component.css']
})
export class PathComponent {

    public path: string = '';

    constructor(private router: Router, http:Http) {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationEnd) {
                console.log(event.url);

            }
        });
    }
}
