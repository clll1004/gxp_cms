import { Component } from '@angular/core';
import { ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'transcoding',
    templateUrl: './transcoding.component.html',
    styleUrls: ['./transcoding.component.css']
})
export class TranscodingComponent {

  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;

      //console.log(this.params.id);
    });
  }
}
