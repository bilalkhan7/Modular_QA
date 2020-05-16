import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TablesMap, IUserResponse} from '../interface/tables.map';
import { tap } from 'rxjs/operators';


@Injectable()
export class TableService {
  //getdataurl="./assets/table_data.json";
  getdataurl="http://localhost:5000/table_attributes";
 
 
 // postDataUrl="http://httpbin.org/post"
  postDataUrl="http://localhost:5000/sql_generate"
  postDataServer={
    test:'test'
  }
 constructor(private httpClient: HttpClient) { }
  fetchData = (): Observable<TablesMap[]> => {
    console.log(this.httpClient.get<TablesMap[]>(this.getdataurl))
    return this.httpClient.get<TablesMap[]>(this.getdataurl);
  }

 
  sendPostRequest(data: any): Observable<any> {
    return this.httpClient.post<any>(this.postDataUrl, data);
}

doWork() {
  // Make a get request
 return this.httpClient.get<any>('http://dummy.restapiexample.com/api/v1/employees');
  
}



}
