import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ProductElement } from '../../../../core/models/cart';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart-product',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './cart-product.html',
  styleUrl: './cart-product.css',
})
export class CartProduct {
  @Input({ required: true }) product: ProductElement | undefined;
  faTrash = faTrash;
  faAdd = faAdd;
  faMinus = faMinus;
  CalculateTotal(price: number, quantity: number): number {
    return price * quantity;
  }
}
