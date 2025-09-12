import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsServices {
  private readonly httpClient = inject(HttpClient);
  getAllBrands(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'brands');
  }
}
