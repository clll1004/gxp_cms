/**
 * Created by GRE511 on 2018-11-05.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html'})

export class PopupComponent {
  @Input() type: string;
  @Input() message: string;
  public show:boolean = true;
  @Output() isShow: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  closePopup() {
    this.show = false;
    this.isShow.emit(this.show);
  }
}
