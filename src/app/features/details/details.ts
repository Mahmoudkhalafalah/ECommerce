import { ProductsService } from './../../core/services/products';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product, SingleProduct } from '../../core/models/product';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  product : SingleProduct = {} as SingleProduct;
  ngOnInit(){
    this.getProductByTd();
  }
 getProductByTd(){
    const Pid = this.activatedRoute.snapshot.paramMap.get('Pid');
    if(Pid){
      this.productsService.getProductById(Pid).subscribe({
        next: (response : SingleProduct) =>{
          this.product = response;
        },
        error: (error) =>{
          console.log(error);
        }
      })
    }
  }
}
