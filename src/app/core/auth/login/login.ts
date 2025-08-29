import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required]),
  });
  printForm() {
    this.loginForm
    console.log(this.loginForm.get('email'));
  }
}
