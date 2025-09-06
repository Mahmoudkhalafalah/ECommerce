import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputField {
  @Input() control: any;
  @Input() label!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() id!: string;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword: boolean = false
}
