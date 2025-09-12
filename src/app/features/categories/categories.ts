
import { CategoriesService } from './../../core/services/categories';
import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../core/models/category';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categories! : Category[];
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe(
      {
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (error: any) => {
          console.log(error);
        }
      }
    );
  }
}
