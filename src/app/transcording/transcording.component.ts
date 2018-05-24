import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'transcording',
    templateUrl: './transcording.component.html'
})
export class TranscordingComponent {
    constructor(private router: Router) {
        console.log('!!');
        this.router.navigate( [ '', { outlets: { 'transcordingOutlet': '' } } ] );
    }
}
