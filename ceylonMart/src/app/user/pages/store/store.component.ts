import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  // products: any[] = [];
  // categories: any[] = [];
  // selectedCategory: number|null=null;

  // constructor(
  //   private productService: ProductService,
  //   private categoryService: CategoryService
  // ) { }

  ngOnInit(): void {
  //  this.getCategories();
  }

  // getCategories(): void {
  //   this.categoryService.getAllCategories().subscribe(
  //     (response) => {
  //         this.categories = response.payload[0];
  //         console.log(this.categories);
  //       }
  //   );
  // }

  // onCategoryChange(): void {
  //   if (this.selectedCategory) {
  //     this.getProductsByCategory(this.selectedCategory);
  //   }
  // }

  // getProductsByCategory(categoryId: number): void {
  //   this.productService.getProductsByCategory(categoryId)
  //     .subscribe(response => {
  //       if (response.status) {
  //         this.products = response.payload[0];
  //       } else {
  //         console.error('Failed to fetch products by category:', response.errorMessages);
  //       }
  //     });
  // }

}
