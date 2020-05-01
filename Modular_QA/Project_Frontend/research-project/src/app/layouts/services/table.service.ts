import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TablesMap} from '../interface/tables.map';


@Injectable()
export class TableService {
  //getdataurl="./assets/table_data.json";
  getdataurl="http://localhost:3000/table_attributes";
 
 // postDataUrl="http://httpbin.org/post"
  postDataUrl="http://localhost:3000/get_data"
  postDataServer={
    test:'test'
  }
 constructor(private http: HttpClient) { }
  fetchData = (): Observable<TablesMap[]> => {
    return this.http.get<TablesMap[]>(this.getdataurl);
  }

 
  sendPostRequest(data: any): Observable<any> {
    return this.http.post<any>(this.postDataUrl, data);
}
}
