import { Component, Input } from '@angular/core';
import { product } from '../../../../core/models/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-card',
  imports: [FontAwesomeModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  faHeart = faHeart;
  faStar = faStar;
  @Input({required: true}) product: product | undefined;
}
