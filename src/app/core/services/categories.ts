import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Categories } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);

  getAllCategories() : Observable<Categories> {
    return this.httpClient.get<Categories>(environment.baseUrl + 'categories');
  }
}
