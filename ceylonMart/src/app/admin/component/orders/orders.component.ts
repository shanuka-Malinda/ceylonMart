import { Component, OnInit } from '@angular/core';
import { CustomizationService } from 'src/app/services/customization.service';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  customList: any[] = [];
  normalOrders:any[]=[];
  custProductStatus:string|null=null;

  displayOrder: boolean = true;
  displayCus: boolean = false;
  clickedButton: number = 0;
  statusAccept = 'ACCEPT';
  statusReject = 'REJECT';
  // --------------------view Data------
  cId: number=0;
  cUserId: String | null = null;
  cDate: String | null = null;
  cEmail: String | null = null;
  cTel: String | null = null;
  cDes: String | null = null;
  cImg: String | null = null;

  constructor(private cutomization: CustomizationService,private orderService:OrderService) { }
  ngOnInit(): void {
    this.fetchCustomizatios();
    this.fetchOrders();
    console.log("Data set" + this.customList);
  }

  fetchOrders():void{
    this.orderService.getAllCustomer().subscribe(
      (response)=>{
        this.normalOrders=response.payload;
        console.log(this.normalOrders);
      },(error)=>{
        console.log("ERROR FETCHING"+this.normalOrders);
      }
      )
  }

  fetchCustomizatios(): void {
    this.cutomization.getAllCustomization().subscribe(
      (response) => {
        this.customList = response.payload;
        console.log(this.customList);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateCustomizationStatusAccept() {
    this.cutomization.updateStatus(this.cId, this.statusAccept)
      .subscribe(response => {
        Swal.fire('Accepted','Customization order is Accepted');
        console.log('Update Status Response:', response);
      }, error => {
        console.error('Error Updating Status:', error);
      });
  }

  updateCustomizationStatusReject() {
    this.cutomization.updateStatus(this.cId, this.statusReject)
      .subscribe(response => {
        Swal.fire('Rejected','Customization order is rejected');
        console.log('Update Status Response:', response);
      }, error => {
        console.error('Error Updating Status:', error);
      });
  }

  displayDiv(signal: number) {
    this.clickedButton = signal;
    if (signal == 1) {
      this.displayOrder = true;
      this.displayCus = false;

    } else {
      this.displayCus = true;
      this.displayOrder = false;
    }
  }

  sedView(det: any) {
    this.cId = det.id;
    this.cUserId = det.userId;
    this.cDate = det.date;
    this.cEmail = det.email;
    this.cTel = det.contactNo;
    this.cDes = det.description;
    this.cImg = det.imageUrl;
  }
}
