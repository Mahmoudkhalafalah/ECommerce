import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private loginSubscription: any = new Subscription();

  userEmail: string = localStorage.getItem('userEmail') || '';
  isLoading: boolean = false;
  errorMessage: string = '';
  loginForm = this.fb.group({
    email: [this.userEmail, [Validators.required, Validators.email]],
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
            console.log(res);
            if (res.message === 'success') {
              this.isLoading = false;
              this.errorMessage = '';
              this.loginForm.reset();
              this.loginForm.markAsUntouched();
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
}
