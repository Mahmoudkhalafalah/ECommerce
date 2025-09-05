import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../core/services/flow-bite';
import { PopularCategories } from "./components/popular-categories/popular-categories";
import { PopularProducts } from "./components/popular-products/popular-products";
import { MainCarousel } from "./components/main-carousel/main-carousel";
import { Details } from "../details/details";

@Component({
  selector: 'app-home',
  imports: [PopularCategories, PopularProducts, MainCarousel],
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

}


