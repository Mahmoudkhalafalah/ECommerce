import { Component, inject } from '@angular/core';
import { CartProduct } from './components/cart-product/cart-product';
import { CartService } from './services/cart-service';
import { ProductElement } from '../../core/models/cart';

@Component({
  selector: 'app-cart',
  imports: [CartProduct],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private readonly cartService = inject(CartService);

  cartItems :ProductElement[] = [] ;
  totalItems: number = 0;
  totalPrice: number = 0;
  ngOnInit() {
    this.loadCartItems();
  }
  update(items: ProductElement[]) {
    console.log(items);
    this.cartItems = items;
    this.totalItems = items.length;
  }
  updatePrice(price: number) {
    this.totalPrice = price;
  }
  loadCartItems() {
    this.cartService.getCartProducts().subscribe({
      next: (response) => {
        this.totalItems = response.numOfCartItems;
        this.totalPrice = response.data.totalCartPrice
        this.cartItems = response.data.products;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
