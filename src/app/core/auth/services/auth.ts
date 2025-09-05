import { Login } from './../login/login';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { UserModel } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  registerUser(user : object) : Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', user);
  }

  loginUser(user : object) : Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', user);
  }
}
