import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Categories, Category } from '../../../../core/models/category';
import { CategoriesService } from '../../../../core/services/categories';
import { Component } from '@angular/core';
@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.html',
  styleUrl: './popular-categories.css',
})
export class PopularCategories {
  private readonly categoriesService = new CategoriesService();

  categories: Category[] = [];

  ngOnInit(): void {
    this.getAllCategories();
    console.log('Done');
  }
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (response: Categories) => {
        this.categories = response.data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  categoriesCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
}
