import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  customerList: any[]= [];
  filteredCustomerList: any;
  errorMessage: string = '';
  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer(): void {
    this.customerService.getAllCustomer().subscribe(
      (reponse:any[]) => {
        this.customerList = reponse;
        console.log("customerList" + this.customerList)
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
      }
    );
    
  }

}
