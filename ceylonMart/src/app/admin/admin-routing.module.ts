import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ProductsComponent } from './component/products/products.component';
import { SettingsComponent } from './component/settings/settings.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { DashBoradComponent } from './dash-borad/dash-borad.component';

const routes: Routes = [
  {path:'admin',component:DashBoradComponent,children:[
    {path:'welcome',component:WelcomeComponent},
    {path:'product',component:ProductsComponent},
    {path:'order',component:OrdersComponent},
    {path:'customer',component:CustomerComponent},
    {path:'setting',component:SettingsComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
