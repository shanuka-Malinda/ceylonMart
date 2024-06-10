import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userName:any;
 xxxx(){
  this.userName = sessionStorage.getItem('userName');
  console.log("uername:::::::::"+this.userName);
 }
}
