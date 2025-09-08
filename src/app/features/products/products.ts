import { Page } from './../../../../node_modules/ngx-pagination/lib/pagination-controls.directive.d';
import { product } from './../../core/models/product';
import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products';
import { ProductCard } from '../../shared/components/product-card/product-card';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [ProductCard , NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private readonly productService = new ProductsService();
  pageSize!: number;
  p!: number;
  total!: number;
  products: product[] = [];
  searchTerm: string = '';
  ngOnInit() {
    this.getProducts();
  }
  getProducts(PageNumber : number = 1) {
    this.productService.getAllProducts(PageNumber).subscribe({
      next: (response) => {
        this.products = response.data;
        this.total = response.results;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
