import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-tmpmy-order',
  templateUrl: './tmpmy-order.component.html',
  styleUrls: ['./tmpmy-order.component.css']
})
export class TmpmyOrderComponent implements OnInit {
  orders: any[] = [];
  userId: any;
constructor(private dialogRef: MatDialogRef<NavComponent>,private orderService:OrderService){

}
  ngOnInit(): void {
    this.userId = localStorage.getItem('userID');
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrdersByUserId(this.userId).subscribe({
      next: (response) => {
        if (response.status) {
          this.orders = response.payload[0];
        } else {
          console.error(response.errorMessages);
        }
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      }
    });
  }


}
