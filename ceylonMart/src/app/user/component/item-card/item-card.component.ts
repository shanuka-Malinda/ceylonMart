import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  productList: any[] = [];// Array to store product list
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: number | null = null;

  ngOnInit(): void {
    this.fetchAllProduct();
    this.getCategories();
  }
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) { }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response) => {
        this.categories = response.payload[0];
        console.log(this.categories);
      }
    );
  }
  onCategoryChange(): void {
    if (this.selectedCategory) {
      this.getProductsByCategory(this.selectedCategory);
    }
  }

  getProductsByCategory(categoryId: number): void {
    if (categoryId == 0) {
      window.location.reload();
    } else {
      this.productService.getProductsByCategory(categoryId)
        .subscribe(response => {
          if (response.status) {
            this.products = response.payload[0];
          } else {
            console.error('Failed to fetch products by category:', response.errorMessages);
          }
        });
    }

  }

  fetchAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      (response) => {
        this.productList = response.payload[0];
      },
      (error) => {
        console.log(this.productList);
      }
    )
  }

  openProductDetail(product: any): void {
    // Store the product data in sessionStorage
    sessionStorage.setItem('product', JSON.stringify(product));
    const url = this.router.createUrlTree(['/viewItem']).toString();
    window.open(url, '_blank');
  }
}
