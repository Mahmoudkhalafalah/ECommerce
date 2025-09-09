import { AuthService } from './../../../services/auth';
import { Component, inject } from '@angular/core';
import { InputField } from '../../../../../shared/components/input/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-reset-form',
  imports: [InputField, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './reset-form.html',
  styleUrl: './reset-form.css',
})
export class ResetForm {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly matDialog = inject(MatDialog);
  isLoading = false;
  resetCodeSent = false;
  resetCodeVerified = false;
  faClose = faClose;
  resetForm = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    resetCode: [null, [Validators.required]],
    newPassword: [null, [Validators.required]],
  });

  resetPassword() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.authService
        .resetPassword(
          this.resetForm.value.email!,
          this.resetForm.value.newPassword!
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            this.matDialog.closeAll();
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    }
  }
  sendCode() {
    if (this.resetForm.get('email')?.valid) {
      this.isLoading = true;
      this.authService.sendCode(this.resetForm.value.email!).subscribe({
        next: (res) => {
          console.log(res);
          this.resetCodeSent = true;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
  verifyCode() {
    if (this.resetForm.get('resetCode')?.valid) {
      this.isLoading = true;
      this.authService.verifyCode(this.resetForm.value.resetCode!).subscribe({
        next: (res) => {
          console.log(res);
          this.resetCodeSent = false;
          this.resetCodeVerified = true;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    }
  }
  close() {
    this.matDialog.closeAll();
  }
}
