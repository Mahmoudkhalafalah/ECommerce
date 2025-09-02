import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: 'app-main-carousel',
  imports: [CarouselModule],
  templateUrl: './main-carousel.html',
  styleUrl: './main-carousel.css'
})
export class MainCarousel {
  sliderImages = [
    { url: '/1.jpg', alt: 'Slider Image 1' },
    { url: '/2.gif', alt: 'Slider Image 2' },
    { url: '/3.png', alt: 'Slider Image 3' },
    { url: '/4.png', alt: 'Slider Image 4' },
    { url: '/5.png', alt: 'Slider Image 5' },
  ];

mainCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      }
    },
    nav: false,
  };
}
