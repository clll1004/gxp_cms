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
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post(url, data, { headers: headers });
  }

  updateData(url:string, newData:any[]) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.put(url, newData, { headers: headers });
  }

  deleteData(url:string, data:any[]) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.delete(url, new RequestOptions({
      headers: headers,
      body: data
    }));
  }

  uploadFile(ownpath, pathString, authKey, formData:FormData) {
    let headers = new Headers();
    headers.append('authKey', authKey);
    headers.append('ownpath', ownpath);
    headers.append('lastpath', pathString);

    let options = new RequestOptions({headers: headers});
    return this.http.post('http://stg.gomgxp.com/gxp/upload', formData, options);//'http://stg.gomgxp.com/gxp/upload'
  }
}