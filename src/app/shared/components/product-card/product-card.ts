import { Component, Input } from '@angular/core';
import { product } from '../../../core/models/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar,faEye } from '@fortawesome/free-solid-svg-icons';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-card',
  imports: [FontAwesomeModule, CarouselModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  faHeart = faHeart;
  faStar = faStar;
  faEye = faEye;
  @Input({required: true}) product: product | undefined;
}
