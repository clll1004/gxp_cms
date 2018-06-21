import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";

@Injectable()
export class ListService {
    private _items: any[] = [];
    private listSubject: BehaviorSubject<any[]>;
    public items: Observable<any[]>;

    constructor() {
      this.listSubject = new BehaviorSubject(this._items);
      this.items = this.listSubject.asObservable();
    }

    addItem(items:any[]) {
      this._items.push(items);
      this.listSubject.next(items);
    }
}