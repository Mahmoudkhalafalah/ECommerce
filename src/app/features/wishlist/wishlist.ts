import { Component, inject } from '@angular/core';
import { WishListService } from '../../core/services/wishlist';
import { ProductCard } from "../../shared/components/product-card/product-card";

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css'
})
export class Wishlist {
  private readonly wishListService = inject(WishListService);
  wishListProducts: any = [];

  ngOnInit() {
    this.getWishlistProducts();
  }
  getWishlistProducts() {
    return this.wishListService.getAllWishlist().subscribe({
      next: (res) => {
        this.wishListProducts = res.data;
      }
    })
  }
  updateWishList(event : any) {
    console.log(event);
    this.wishListProducts = event;
  }
}
