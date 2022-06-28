import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(filters): Observable<any> {
    return this.httpClient.post(environment.localBase_host +'api/Products/GetProducts',filters)
  }

  createProduct(dataProduct): Observable<any> {
    return this.httpClient.put(environment.localBase_host +'/api/Products/AddNewProduct', dataProduct)
  }

  updateProduct(dataProduct): Observable<any> {
    return this.httpClient.put(environment.localBase_host +'api/Products/UpdateProduct', dataProduct)
  }

  deleteProduct(idProducts): Observable<any> {
    return this.httpClient.delete(environment.localBase_host +`api/Products/Delete/${idProducts}`, idProducts)
  }

}
