import { Component, inject, OnInit } from '@angular/core';
import { BrandsServices } from './services/brands-services';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands implements OnInit {
  private readonly brandsService = inject(BrandsServices);

  brands: any[] = [];

  ngOnInit(): void {
    this.getAllBrands();
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
}
