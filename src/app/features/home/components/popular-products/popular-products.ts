import { Products,product } from './../../../../core/models/product';
import { Component } from '@angular/core';
import { ProductsService } from '../../../../core/services/products';
import { ProductCard } from "../../../../shared/components/product-card/product-card";
@Component({
  selector: 'app-popular-products',
  imports: [ ProductCard],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts {
  private readonly productService = new ProductsService();
  products : product[] = [];
  ngOnInit(){
    this.getProducts();
  }
  getProducts(){
    this.productService.getAllProducts().subscribe(
      {
        next: (response : Products)=> {
          this.products = response.data;
        },
        error: (error) =>{
          console.log(error);
        }
      }
    )
  }
}
