import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductElement } from '../../../../core/models/cart';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-cart-product',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.css',
  animations: [
    trigger('fade', [
      transition(':leave', [
        animate('300ms ease', style({ opacity: 0, transform: 'translateX(50px)' }))
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('300ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class CartProduct {
  @Input({ required: true }) product: ProductElement | undefined;
  private readonly cartService = inject(CartService);
  faTrash = faTrash;
  faAdd = faAdd;
  faMinus = faMinus;
  @Output() itemEvent: EventEmitter<ProductElement[]> = new EventEmitter<
    ProductElement[]
  >();
  @Output() totalEvent: EventEmitter<number> = new EventEmitter<number>();
  CalculateTotal(price: number, quantity: number): number {
    return price * quantity;
  }
  removeFromCart(id: string) {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.itemEvent.emit(response.data.products);
        this.totalEvent.emit(response.data.totalCartPrice);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  updateQuantity(id: string, quantity: number) {
    this.cartService.updateProductQuantity(id, quantity).subscribe({
      next: (response) => {
        console.log(response);
        this.itemEvent.emit(response.data.products);
        this.totalEvent.emit(response.data.totalCartPrice);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
