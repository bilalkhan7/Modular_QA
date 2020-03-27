import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TablesMap} from '../interface/tables.map';


@Injectable()

export class TableService {
 constructor(private http: HttpClient) { }
  fetchData = (): Observable<TablesMap[]> => {
    return this.http.get<TablesMap[]>('http://localhost:3000/table_attributes');
  }
}
