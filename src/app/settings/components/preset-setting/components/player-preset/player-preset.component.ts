/**
 * Created by GRE511 on 2018-09-12.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'player-preset',
  templateUrl: './player-preset.component.html',
  styleUrls:['./player-preset.component.css']})

export class PlayerPresetComponent {
  constructor() { }

  setPlayerPreset(e) {
    const target = e.currentTarget;
    target.getAttribute('class') === 'on' ? target.setAttribute('class', '') : target.setAttribute('class', 'on');
  }
}
