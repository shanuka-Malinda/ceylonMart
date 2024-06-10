import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/UserModule.1';
import { CustomizationComponent } from './user/pages/customization/customization.component';
import { ViewItemComponent } from './user/pages/view-item/view-item.component';
import { TmpmyOrderComponent } from './user/component/tmpmy-order/tmpmy-order.component';
 





@NgModule({
  declarations: [
    AppComponent,
    CustomizationComponent,
    ViewItemComponent,
    TmpmyOrderComponent,
    




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    BrowserAnimationsModule,
    AdminModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
