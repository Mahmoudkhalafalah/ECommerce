import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
}
