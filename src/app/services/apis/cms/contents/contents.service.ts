/**
 * Created by GRE511 on 2018-07-26.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ContentsService {
  constructor(private http: Http) {  }

  getLists(listUrl:any) {
    return this.http.get(listUrl);
  }

  postData(url:string, data:any) {
    const headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.post(url, data, { headers });
  }

  updateData(url:string, newData:any[]) {
    const headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.put(url, newData, { headers });
  }

  deleteData(url:string, data:any[]) {
    const headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.delete(url, new RequestOptions({
      headers,
      body: data}));
  }

  uploadFile(ownpath, pathString, authKey, formData:FormData) {
    const headers = new Headers();
    headers.append('authKey', authKey);
    headers.append('ownpath', ownpath);
    headers.append('lastpath', pathString);

    const options = new RequestOptions({ headers });
    return this.http.post('http://stg.gomgxp.com/gxp/upload', formData, options);
  }
}
