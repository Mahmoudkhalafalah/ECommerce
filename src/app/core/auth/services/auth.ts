import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import e from 'express';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerUser(user: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', user);
  }

  loginUser(user: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', user);
  }
  signOut() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  updateUser(name?: string, email?: string, phone?: number): Observable<any> {
    const body: any = {};

    if (name) {
      body.name = name;
    }
    if (email) {
      body.email = email;
    }
    if (phone) {
      body.phone = phone;
    }
    return this.httpClient.put(environment.baseUrl + `users/updateMe`, body, {
      headers: {
        token: this.cookieService.get('token'),
      },
    });
  }
  changePassword(passwords: any): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `users/changeMyPassword`,
      passwords,
      {
        headers: {
          token: this.cookieService.get('token'),
        },
      }
    );
  }
  resetPassword(email: string , pass: string): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `auth/resetPassword`,
      {
        email : email,
        newPassword: pass
      }
    );
  }
  sendCode(email: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/forgotPasswords`, {
      email: email,
    });
  }
  verifyCode(code: number): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/verifyResetCode`, {
      resetCode: code,
    });
  }

}
