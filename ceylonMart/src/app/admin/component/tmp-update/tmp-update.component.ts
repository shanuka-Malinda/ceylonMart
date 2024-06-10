import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tmp-update',
  templateUrl: './tmp-update.component.html',
  styleUrls: ['./tmp-update.component.css']
})
export class TmpUpdateComponent {
  id: string = this.data.product.id;
  name: string = this.data.product.name;
  description: string = this.data.product.description;
  price: number = this.data.product.price;
  qty: number = this.data.product.qty;
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
    @Inject(MAT_DIALOG_DATA) public data: { product: any }
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

  updateProduct(): void {
    console.log()
    if (this.image!=null) {
      this.isUploading = true;
      this.cloudinaryService.uploadImage(this.image).subscribe(
        (response) => {
          this.imageUrl = response.secure_url;
          const product = {
            id:this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            qty: this.qty,
            categoryDto: { categoryId: this.category },
            imageUrl: this.imageUrl,
            commonStatus: this.commonStatus
          };

          this.productService.updateProduct(product).subscribe(
            (response) => {
              console.log('Product added successfully', response);
              // Handle successful response
              this.isUploading = false;
              this.resetForm();
              Swal.fire('Product added successfully!');
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
      console.log("SAVING product while");
      //Swal.fire('Please fill in all fields', '', 'warning');
        const product = {
        id:this.id,
        name: this.name,
        description: this.description,
        price: this.price,
        qty: this.qty,
        categoryDto: { categoryId: this.category },
        imageUrl: this.data.product.imageUrl,
        commonStatus: 'ACTIVE'
      };
      this.productService.updateProduct(product).subscribe(
        (response) => {
          console.log('Product added successfully', response);
          // Handle successful response
          this.isUploading = false;
          this.resetForm();
          Swal.fire('Product added successfully!');
        },
        (error) => {
          console.error('Error adding product', error);
          this.isUploading = false;
          // Handle error response
          console.log("Err::::::::::::::"+product);
        }
      );




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

}
