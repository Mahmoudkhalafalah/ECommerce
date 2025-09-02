import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../core/services/flow-bite';
import { PopularCategories } from "./popular-categories/popular-categories";
import { PopularProducts } from "./popular-products/popular-products";

@Component({
  selector: 'app-home',
  imports: [PopularCategories, PopularProducts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly flowbiteService = inject(FlowbiteService);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }
  sliderImages = [
    { url: '/1.jpg', alt: 'Slider Image 1' },
    { url: '/2.gif', alt: 'Slider Image 2' },
    { url: '/3.png', alt: 'Slider Image 3' },
    { url: '/4.png', alt: 'Slider Image 4' },
    { url: '/5.png', alt: 'Slider Image 5' },
  ];
}


