import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly HttpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  checkoutWithCash(shippingData: Object, cartID: string): Observable<any> {
    return this.HttpClient.post(
      environment.baseUrl + `orders/${cartID}`,
      shippingData
    );
  }
  checkoutWithVisa(shippingData: Object, cartID: string): Observable<any> {
    const url = `${environment.baseUrl}orders/checkout-session/${cartID}/?url=${encodeURIComponent(window.location.origin)}`;
    return this.HttpClient.post(
      url,
      shippingData
    );
  }
}
