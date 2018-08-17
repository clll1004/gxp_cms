import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FolderService {
  constructor(private http: Http) {  }

  getLists(listUrl:any) {
    return this.http.get(listUrl);
  }
}
