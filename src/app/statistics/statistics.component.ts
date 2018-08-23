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
    const length = target.parentNode.children.length;

    for (let i = 0 ; i < length ; i += 1) {
      if (target.parentElement.children[i].localName === 'li') {
        if (target.parentElement.children[i].getAttribute('class') === 'has-sub on') {
          target.parentElement.children[i].setAttribute('class', 'has-sub');
          target.parentElement.children[i].children[0].setAttribute('class', 'fas fa-angle-down');
        }
      }
    }

    if (target.getAttribute('class')) {
      target.setAttribute('class', 'has-sub on');
      target.children[0].setAttribute('class', 'fas fa-angle-up');
    }
  }
}

