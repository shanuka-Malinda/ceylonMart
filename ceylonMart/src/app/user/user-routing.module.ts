import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CustomizationComponent } from './pages/customization/customization.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { ViewItemComponent } from './pages/view-item/view-item.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

const routes: Routes = [
  {path:"",component:UserLayoutComponent,children:[
    {path:"home",component:HomeComponent},
    {path:"store",component:StoreComponent},
    {path:"aboutus",component:AboutUsComponent},
    {path:"custom",component:CustomizationComponent},
    {path:"viewItem",component:ViewItemComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
