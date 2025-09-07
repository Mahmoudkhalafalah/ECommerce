import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() isLoggedIn: boolean = false;
  private readonly authService = inject(AuthService);
  logout() {
    this.authService.signOut();
    // Implement logout functionality here
  }
}
