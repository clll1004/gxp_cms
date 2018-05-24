import { Component } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'transcording',
    templateUrl: './transcording.component.html'
})
export class TranscordingComponent {

  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }
}
