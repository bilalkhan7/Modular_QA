import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs'
@Injectable()
export class TableService {

  constructor(private http: HttpClient) { }

  fetchData(): Observable<Object> {
    console.log('Test Table Service');
    return this.http.get('http://localhost:3000/table_attributes');
  }
}