import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-borad',
  templateUrl: './dash-borad.component.html',
  styleUrls: ['./dash-borad.component.css']
})
export class DashBoradComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(private router: Router) {

  }

  logout() {
   this.router.navigate(['/home']);
   localStorage.clear();
  }
}
