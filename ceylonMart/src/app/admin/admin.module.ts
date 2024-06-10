import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { CustomerComponent } from './component/customer/customer.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ProductsComponent } from './component/products/products.component';
import { SettingsComponent } from './component/settings/settings.component';
import { TmpUpdateComponent } from './component/tmp-update/tmp-update.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { DashBoradComponent } from './dash-borad/dash-borad.component';
@NgModule({
  declarations: [
    DashBoradComponent,
    ProductsComponent,
    CustomerComponent,
    OrdersComponent,
    SettingsComponent,
    WelcomeComponent,
    TmpUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class AdminModule { }
