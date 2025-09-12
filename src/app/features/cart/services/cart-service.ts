import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Response } from '../../../core/models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  addProductToCart(productId: string): Observable<Response> {
    return this.httpClient.post<Response>(
      `${environment.baseUrl}cart`,
      { productId: productId }
    );
  }
  getCartProducts(): Observable<Response> {
    return this.httpClient.get<Response>(`${environment.baseUrl}cart`);
  }
  removeProductFromCart(productId: string): Observable<Response> {
    return this.httpClient.delete<Response>(
      `${environment.baseUrl}cart/${productId}`
    );
  }
  updateProductQuantity(productId: string, count: number): Observable<Response> {
    let res = this.httpClient.put<Response>(
      `${environment.baseUrl}cart/${productId}`,
      { count: count }
    );

    return res;
  }
}
