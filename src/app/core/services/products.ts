import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { product, Products, SingleProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(pageNumber : number = 1) :Observable<Products>{
    return this.httpClient.get<Products>(`${environment.baseUrl}products?page=${pageNumber}`);
  }
  getProductById(Pid : string) :Observable<SingleProduct>{
    return this.httpClient.get<SingleProduct>(`${environment.baseUrl}products/${Pid}`);
  }
}
