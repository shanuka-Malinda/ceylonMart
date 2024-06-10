import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselComponent } from './component/carousel/carousel.component';
import { ChatBotComponent } from './component/chat-bot/chat-bot.component';
import { FooterComponent } from './component/footer/footer.component';
import { ImageCarouselComponent } from './component/image-carousel/image-carousel.component';
import { ItemCardComponent } from './component/item-card/item-card.component';
import { LoginComponent } from './component/login/login.component';
import { NavComponent } from './component/nav/nav.component';
import { RatingComponent } from './component/rating/rating.component';
import { RegisterComponent } from './component/register/register.component';
import { TermConditionTempComponent } from './component/term-condition-temp/term-condition-temp.component';
import { TermsAndConditionComponent } from './component/terms-and-condition/terms-and-condition.component';
import { TmpLoginComponent } from './component/tmp-login/tmp-login.component';
import { TmpRegisterComponent } from './component/tmp-register/tmp-register.component';
import { WelcomeCardComponent } from './component/welcome-card/welcome-card.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreComponent } from './pages/store/store.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    UserLayoutComponent,
    FooterComponent,
    StoreComponent,
    AboutUsComponent,
    WelcomeCardComponent,
    ItemCardComponent,
    RatingComponent,
    LoginComponent,
    TmpLoginComponent,
    RegisterComponent,
    TmpRegisterComponent,
    TermsAndConditionComponent,
    TermConditionTempComponent,
    ImageCarouselComponent,
    CarouselComponent,
    ChatBotComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    FormsModule,A11yModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class UserModule {
}
