import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TablesMap} from '../interface/tables.map';
import {ResponseData} from '../interface/Response'


@Injectable()
export class TableService {
  //getdataurl="http://localhost:5000/table_attributes";
  getdataurl="./assets/table_data.json";
  
  //postDataUrl="http://localhost:5000/sql_generate"
  postDataUrl="./assets/response.json"
  postDataServer={
    test:'test'
  }
 constructor(private httpClient: HttpClient) { }
  fetchData = (): Observable<TablesMap[]> => {
    return this.httpClient.get<TablesMap[]>(this.getdataurl);
  }

 
 /*  sendPostRequest(data: any): Observable<ResponseData> {
    return this.httpClient.post<ResponseData>(this.postDataUrl, data);
 */
    sendPostRequest(): Observable<ResponseData> {
      return this.httpClient.get<ResponseData>(this.postDataUrl);
}




}
