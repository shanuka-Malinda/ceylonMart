import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomizationService } from 'src/app/services/customization.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  productCount: any;
  customerCount: any;
  customization:any;
  orderCount:any;
  ngOnInit(): void {

  }
  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private customizationService:CustomizationService,
    private orderService:OrderService,
  ) {
    this.getProductCount();
    this.getCustomerCount();
    this.getCustomizationCount();
    this.getOrderCount();
  }

  getProductCount(): void {
    this.productService.getProductCount().subscribe(
      (response) => {
        this.productCount = response.payload;
      }
    )
  }
  getCustomerCount(): void {
    this.customerService.getCustomerCount().subscribe(
      (response) => {
        this.customerCount = response;
        console.log('CustomerCount'+this.customerCount);
      }
    )
  }

  getCustomizationCount():void{
    this.customizationService.getCustomizationCount().subscribe(
      (response)=>{
        this.customization=response;
        console.log(response);
      }
    )
  }

  getOrderCount():void{
    this.orderService.getOrderCount().subscribe(
      (response)=>{
        this.orderCount=response;
      }
    )
  }

}
