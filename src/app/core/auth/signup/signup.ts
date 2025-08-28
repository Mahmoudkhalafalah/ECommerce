import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  registerForm = new FormGroup({
    name: new FormControl({Validators: [Validators.required, Validators.minLength(10), Validators.maxLength(20)]}),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  });
}
