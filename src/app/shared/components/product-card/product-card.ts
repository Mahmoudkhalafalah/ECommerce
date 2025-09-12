import { CartService } from './../../../features/cart/services/cart-service';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { product } from '../../../core/models/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faStar,faEye , faHeart as fas } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wishlist';
@Component({
  selector: 'app-product-card',
  imports: [FontAwesomeModule, CarouselModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly wishListService = inject(WishListService);
  faHeart = faHeart;
  faStar = faStar;
  faEye = faEye;
  faHS = fas;
  faTrashCan = faTrashCan;
  @Input()Wishlist : any = [];
  @Input({required: true}) product: product | undefined;
  @Input() wishList: boolean = false;
  @Output() emitWishList = new EventEmitter();


  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Product added to cart successfully!', 'Success');
      },
    });
  }
  addProductToWishList(id: string){
    console.log(id);
    this.wishListService.addProductToWishlist(id).subscribe(
      (response) => {
        this.toastr.success('Product added to wishlist successfully!', 'Success');
      }
    );
  }
  removeProductFromWishList(id: string){
    this.wishListService.removeProductFromWishlist(id).subscribe(
      (response) => {
        console.log (response);
        this.emitWishList.emit(response.data);
        this.toastr.success('Product removed from wishlist successfully!', 'Success');
      }
    );
  }

  isInWishList(id: string): boolean {
    let state = this.Wishlist.some((item: any) => item.productId === id);
    console.log(state);
    return (state);
  }

}
