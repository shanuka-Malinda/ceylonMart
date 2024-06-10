import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MailService } from 'src/app/services/mail.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  product: any;
  quantity: number = 1;
  amount: number = 0;
  handler: any = null;

  userName: String | null = null;
  address: String | null = null;
  userId: String | null = null;
  userEmail: String | null = null;
  constructor(private router: Router, private orderService: OrderService, private mailService: MailService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('email');
    this.userId = localStorage.getItem('id');
    this.address = localStorage.getItem('address');

    console.log(this.userEmail);
    const productData = sessionStorage.getItem('product');
    if (productData) {
      this.product = JSON.parse(productData);
    }
    this.loadStripe();
  }

  currentDate: string | null = null;
  transactionToken: any;


  pay(quantity: number, price: number) {
    if (this.userName != null) { 
    const date = new Date();
    this.currentDate = date.toISOString();
    this.amount = quantity * price;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: function (token: any) {
        console.log(token.id)
        this.transactionToken = token.id;
        const trId=token.id;
        this.sendMail(token);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Order is procceed now",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

    handler.open({
      name: 'CeylonMart Payment',
      description: 'Secure Payement',
      amount: this.amount * 100
    });
    const OrderData = {
      quantity: quantity,
      amount: this.amount,
      transactionId: this.transactionToken,
      userId: this.userId,
      userName: this.userName,
      userAddress: this.address,
      userEmail: this.userEmail,
      productId: this.product.id,
      productUrl: this.product.imageUrl,
      orderDate: this.currentDate
    }

    this.orderService.createOrder(OrderData).subscribe(
      (response) => {
        console.log(response);
        console.log(OrderData);
      },
      (error) => {
        Swal.fire(error);
        console.log(OrderData);
      }
    );

  }else{
    Swal.fire('Please register with system');
  }
}
  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51PLHbLP9YTJ2hH7Cv5oLodCJ6CvigWOuKDfCWS7SGSHW5DiucVYTUr4uATHYK34WJtJnQx9Lpg7LJcEa2IvIPs9F00MmDsYZBy',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            Swal.fire('Payment Success!!');
            // this.sendMail();
          }
        });
      }
      window.document.body.appendChild(s);

    }
  }

  mailData: any = { sendMail: this.userEmail, orderId: '0011' };
  errorMessage: string = '';
  successMessage: string = '';

  sendMail(data: any) {
    const or = {
      saleId: data.token.id,
      sendMail: localStorage.getItem('email')
    }

    this.mailService.sendMail(or).subscribe(
      data => {
        Swal.fire(
          '',
          'Order Placed!',
          'success'
        )
      },
      error => {
        Swal.fire(
          '',
          'Mail Send Error!',
          'error'
        )
      }
    );
  }

}
