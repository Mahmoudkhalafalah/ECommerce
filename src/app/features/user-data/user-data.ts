import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../core/auth/services/auth';
import { Component, inject } from '@angular/core';
import { InputField } from '../../shared/components/input/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-data',
  imports: [ReactiveFormsModule, InputField],
  templateUrl: './user-data.html',
  styleUrl: './user-data.css',
})
export class UserData {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);

  userName = jwtDecode<any>(
    inject(CookieService).get('token')
  ).name;
  personalInfoForm = this.fb.group({
    name: [null],
    email: [null],
    phone: [null],
  });
  passForm = this.fb.group({
    currentPassword: [null, Validators.required],
    password: [null, Validators.required],
    rePassword: [null, Validators.required],
  });

  submit() {
    console.log("submit");
    this.authService
      .updateUser(
        this.personalInfoForm.value.name || '',
        this.personalInfoForm.value.email || '',
        this.personalInfoForm.value.phone || 0
      )
      .subscribe({
        next: (res) => {
          if (res.message === 'success') {

            this.toastrService.success(
              'User data updated successfully!',
              'Success'
            );
            this.personalInfoForm.reset();
          }
        },
        error: (err) => {
          this.toastrService.error('Failed to update user data.', 'Error');
          console.log(err);
        },
      });
  }
  changePassword() {
    if (this.passForm.valid) {
      this.authService.changePassword(this.passForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.toastrService.success(
              'Password changed successfully!',
              'Success'
            );
            this.passForm.reset();
            setTimeout(() => {
              this.authService.signOut();
            }, 1000);
          }
        },
        error: (err) => {
          this.toastrService.error('Failed to change password.', 'Error');
          console.log(err);
        },
      });
    }
  }
}
