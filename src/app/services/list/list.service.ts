import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";

@Injectable()
export class ListService {

    private listSubject: BehaviorSubject<any[]>;
    public items: Observable<any[]>;

    constructor() {
      this.listSubject = new BehaviorSubject([]);
      this.items = this.listSubject.asObservable();
    }

    syncItem(items:any[]) {

      this.listSubject.next(items);
    }
}