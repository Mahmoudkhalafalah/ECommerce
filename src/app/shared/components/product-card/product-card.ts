import { CartService } from './../../../features/cart/services/cart-service';
import { Component, inject, Input } from '@angular/core';
import { product } from '../../../core/models/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar,faEye } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-card',
  imports: [FontAwesomeModule, CarouselModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService)
  faHeart = faHeart;
  faStar = faStar;
  faEye = faEye;
  @Input({required: true}) product: product | undefined;
  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastrService.success('Product added to cart successfully!', 'Success');
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Failed to add product to cart.', 'Error');
      },
    });
  }
}
