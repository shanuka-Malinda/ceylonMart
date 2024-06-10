import { Component, OnInit } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images = [
    // Add your image URLs here
    'https://picsum.photos/id/237/800/600',
    'https://picsum.photos/id/847/800/600',
    'https://picsum.photos/id/1025/800/600',
  ];
  currentSlide = 0;
  destroy$ = new Subject<void>();
  isHovering = false;

  ngOnInit() {
    interval(5000) // Adjust interval for desired slide transition time
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.nextSlide());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  handleHover(isHovering: boolean) {
    this.isHovering = isHovering;
  }
}






