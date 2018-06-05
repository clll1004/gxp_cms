import { Component } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent {

    public params:Params;

    constructor(private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe( (params) => {
            this.params = params;
        });
    }
}
