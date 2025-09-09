import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { InputField } from '../../../shared/components/input/input';
import { ResetForm } from './components/reset-form/reset-form';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);
  private readonly matdialog = inject(MatDialog);
  private loginSubscription: any = new Subscription();

  isLoading: boolean = false;
  errorMessage: string = '';

  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });
  submit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginSubscription.unsubscribe();
      this.loginSubscription = this.authService
        .loginUser(this.loginForm.value)
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.isLoading = false;
              this.errorMessage = '';
              this.loginForm.reset();
              this.loginForm.markAsUntouched();
              this.cookieService.set('token', res.token);
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = err.error.message;
            this.isLoading = false;
          },
        });
    }
  }
  resetPassword() {
    console.log('resetPassword');
  }
  onClick(){
    this.matdialog.open(ResetForm , {disableClose: true})
  }
}
