/**
 * Created by GRE511 on 2018-08-21.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html'})

export class StatisticsComponent implements OnInit {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
    });
  }

  showSubLnb(e) {
    const target = e.currentTarget;
    const id = target.getAttribute('id');
    const temp:any[] = target.parentNode.children;
    const length = temp.length;

    for (let i = 0 ; i < length ; i += 1) {
      if (temp[i].getAttribute('class') === 'has-sub on') {
        temp[i].setAttribute('class', 'has-sub');
        temp[i].children[0].setAttribute('class', 'fas fa-angle-down');
      } else if (temp[i].getAttribute('id') === id && id !== 'visitor' && id !== 'dashboard') {
        target.setAttribute('class', 'has-sub on');
        target.children[0].setAttribute('class', 'fas fa-angle-up');
      }
    }
  }
}

