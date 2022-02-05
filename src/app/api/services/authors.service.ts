import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private httpClient: HttpClient) { }

  getForLoadAuthors(): Observable<any> {
    return this.httpClient.get(environment.urlBase_host +'api/v1/Authors')
  }

  loadDataAuthors(): Observable<any> {
    return this.httpClient.get(environment.localBase_host +'api/LoadData/LoadDataAuthors')
  }
}
