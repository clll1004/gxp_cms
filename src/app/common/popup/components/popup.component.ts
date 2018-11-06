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
  @Output() isShow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  public show:boolean = true;

  constructor() {}

  confirm(check:boolean) {
    this.isConfirm.emit(check);
    this.closePopup();
  }

  closePopup() {
    this.show = false;
    this.isShow.emit(this.show);
  }

}
