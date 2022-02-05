import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  getBooks(filters): Observable<any> {
    return this.httpClient.post(environment.localBase_host +'api/Books/GetBooksByFilters',filters)
  }

  loadDataBooks(): Observable<any> {
    return this.httpClient.get(environment.localBase_host +'api/LoadData/LoadDataBooks')
  }

  getForLoadBooks(): Observable<any> {
    return this.httpClient.get(environment.urlBase_host +'api/v1/Books')
  }


}
