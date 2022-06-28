import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  constructor(private httpClient: HttpClient) { }

  getCategorys(): Observable<any> {
    return this.httpClient.get(environment.localBase_host +'api/GetCategorys')
  }
}
