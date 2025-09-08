import { CartService } from './../../../features/cart/services/cart-service';
import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faSignOut,
  faCartFlatbed,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() isLoggedIn: boolean = false;
  private readonly authService = inject(AuthService);
  private readonly CartService = inject(CartService);
  itemCount: number = 0;
  ngOnInit() {
    if (this.isLoggedIn) this.getCartItemCount();
  }
  getCartItemCount() {
    this.CartService.getCartProducts().subscribe({
      next: (response) => {
        this.itemCount = response.numOfCartItems;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  faUser = faUser;
  faSignOut = faSignOut;
  faCartFlatbed = faCartFlatbed;
  logout() {
    this.authService.signOut();
    // Implement logout functionality here
  }
}
