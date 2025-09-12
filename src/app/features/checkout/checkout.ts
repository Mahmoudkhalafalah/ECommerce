import { CheckoutService } from './services/checkout-service';
import { Component, inject, OnInit } from '@angular/core';
import { InputField } from '../../shared/components/input/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../cart/services/cart-service';
import { ProductElement, Response } from '../../core/models/cart';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [InputField, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly CheckoutService = inject(CheckoutService);
  private readonly router = inject(Router);
  cartItems: ProductElement[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  cartId: string = '';
  checkoutForm!: FormGroup;
  paymentMethod!: FormControl;
  ngOnInit(): void {
    this.loadCartItems();
    this.initForm();
    console.log(this.cartItems);
  }

  initForm() {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
    this.paymentMethod = this.fb.control([null, [Validators.required]]);
  }
  CalculateTotal(price: number, quantity: number): number {
    return price * quantity;
  }
  loadCartItems() {
    this.cartService.getCartProducts().subscribe({
      next: (response) => {
        this.totalItems = response.numOfCartItems;
        this.totalPrice = response.data.totalCartPrice;
        this.cartItems = response.data.products;
        this.cartId = response.cartId;
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  checkout() {
    this.checkoutForm.markAllAsTouched();
    console.log();
    if (this.checkoutForm.valid) {
      if (this.paymentMethod.value == 'Cash') {
        this.CheckoutService.checkoutWithCash(
          this.checkoutForm.value,
          this.cartId
        ).subscribe({
          next: (response) => {
            console.log(response);
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else if (this.paymentMethod.value == 'Visa') {
        this.CheckoutService.checkoutWithVisa(
          this.checkoutForm.value,
          this.cartId
        ).subscribe({
          next: (response) => {
            console.log(response);
            window.open(response.session.url, '_self');
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }
}
