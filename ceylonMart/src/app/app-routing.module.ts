import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoradComponent } from './admin/dash-borad/dash-borad.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';

const routes: Routes = [
  {path:"",component:UserLayoutComponent},
  {path:"admin",component:DashBoradComponent}
];''

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
