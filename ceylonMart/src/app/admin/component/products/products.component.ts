import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { TmpUpdateComponent } from '../tmp-update/tmp-update.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  name: string = '';
  description: string = '';
  price: number = 0;
  qty: number = 0;
  category: string = '';
  commonStatus: string = 'ACTIVE';
  image: File | null = null;
  imageUrl: string = '';
  error: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  categories: any[] = []; // Array to store categories
  productList: any[] = [];// Array to store product list
  isUploading: boolean = false;
  updatePreview: boolean = true;
  constructor(
    private productService: ProductService,
    private cloudinaryService: CloudinaryService,
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchProduct();
    console.log("Category" + this.categories);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.image = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.image);
    }
  }

  fetchCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response) => {
        this.categories = response.payload[0]; // Adjust based on your API response structure
        console.log(this.categories);
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }
  fetchProduct(): void {
    this.productService.getAllProduct().subscribe(
      (response) => {
        this.productList = response.payload[0];
        console.log(this.categories);
      },
      (error) => {
        console.log(this.productList);
      }
    )
  }

  submitProduct(): void {

    if (this.image) {
      this.isUploading = true;
      this.cloudinaryService.uploadImage(this.image).subscribe(
        (response) => {
          this.imageUrl = response.secure_url;
          const product = {
            name: this.name,
            description: this.description,
            price: this.price,
            qty: this.qty,
            categoryDto: { categoryId: this.category },
            imageUrl: this.imageUrl,
            commonStatus: this.commonStatus
          };

          this.productService.saveProduct(product).subscribe(
            (response) => {
              console.log('Product added successfully', response);
              // Handle successful response
              this.isUploading = false;
              this.resetForm();
              Swal.fire('Product added successfully!');
              this.fetchProduct();
            },
            (error) => {
              console.error('Error adding product', error);
              this.isUploading = false;
              // Handle error response
              Swal.fire('Error adding product', '', 'error');
            }
          );
        },
        (err) => {
          this.error = err;
          this.isUploading = false;
          Swal.fire('Error uploading image', err, 'error');
        }
      );
    } else {
      Swal.fire('Please fill in all fields', '', 'warning');
    }
  }

  resetForm(): void {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.qty = 0;
    this.category = '';
    this.image = null;
    this.imageUrl = '';
    this.error = null;
    this.imagePreview = null;
  }

  openDialog(product: any): void {
    const dialogRef = this.dialog.open(TmpUpdateComponent, {
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteProduct(id: number): void {
    console.log("########################"+id);
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        Swal.fire('Product deleted successfully', response);
        this.fetchProduct();
      },
      error: (error) => {
        Swal.fire('Error deleting product', error);
      }
    });
  }



}