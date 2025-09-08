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
  myHeaders = { headers: { token: this.cookieService.get('token') } };
  addProductToCart(productId: string): Observable<Response> {
    return this.httpClient.post<Response>(
      `${environment.baseUrl}cart`,
      { productId: productId },
      this.myHeaders
    );
  }
  getCartProducts(): Observable<Response> {
    return this.httpClient.get<Response>(`${environment.baseUrl}cart`, this.myHeaders);
  }
}
