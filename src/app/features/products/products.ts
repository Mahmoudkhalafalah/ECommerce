import { Wishlist } from './../wishlist/wishlist';
import { WishListService } from './../../core/services/wishlist';
import { Page } from './../../../../node_modules/ngx-pagination/lib/pagination-controls.directive.d';
import { product } from './../../core/models/product';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { FlowbiteService } from '../../core/services/flow-bite';
import { Category } from '../../core/models/category';
import { BrandsServices } from '../brands/services/brands-services';
import { CategoriesService } from '../../core/services/categories';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [ProductCard, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private readonly productService = new ProductsService();
  private readonly brandsService = inject(BrandsServices);
  private readonly categoriesService = inject(CategoriesService);
  private readonly wishListService = inject(WishListService);
  pageSize!: number;
  p!: number;
  total!: number;
  products: product[] = [];
  searchTerm: string = '';
  filteredProducts: product[] = [];
  selectedCategory: string = '';
  categories: Category[] = [];
  selectedBrand: string = '';
  brands: any[] = [];
  Wishlist: any = [];
  ngOnInit() {
    this.getProducts();
    this.getAllCategories();
    this.getAllBrands();
    this.getWishList();
  }
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getProducts(PageNumber: number = 1) {
    this.productService.getAllProducts(PageNumber).subscribe({
      next: (response) => {
        this.products = response.data;
        this.total = response.results;
        this.pageSize = response.metadata.limit;
        this.p = response.metadata.currentPage;
        this.applyFilters();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      return (
        (this.selectedCategory === '' ||
          product.category._id === this.selectedCategory) &&
        (this.selectedBrand === '' || product.brand._id === this.selectedBrand)
      );
    });
    console.log(this.filteredProducts);
  }
  getWishList() {
    this.wishListService.getAllWishlist().subscribe({
      next: (response) => {
        this.Wishlist = response.data;
        console.log(this.Wishlist);
      },
    });
  }
}
