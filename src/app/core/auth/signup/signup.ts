import { AuthService } from './../services/auth';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  errorMessage: string = '';
  isLoading: boolean = false;
  private registerSubscription: any = new Subscription();

  registerForm = this.fb.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      rePassword: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword }
  );
  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  submit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerSubscription.unsubscribe();
      this.registerSubscription = this.authService
        .registerUser(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.errorMessage = '';
            localStorage.setItem(
              'userEmail',
              this.registerForm.value?.email || ''
            );
            this.registerForm.reset();
            this.registerForm.markAsUntouched();
            this.router.navigate(['/login']);
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
