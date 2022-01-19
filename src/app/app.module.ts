import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './layout/components/button/button.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { CarouselComponent } from './layout/components/carousel/carousel.component';
import { ServicesComponent } from './layout/components/services/services.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { AboutLayoutComponent } from './layout/about-layout/about-layout.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { BackgroundImageComponent } from './layout/components/background-image/background-image.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InputComponent } from './layout/components/input/input.component';
import { FormArrayComponent } from './layout/components/form-array/form-array.component';
import { FormComponent } from './layout/form/form.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    FooterComponent,
    CarouselComponent,
    ServicesComponent,
    HomeComponent,
    HomeLayoutComponent,
    AboutComponent,
    AboutLayoutComponent,
    ServicesPageComponent,
    BackgroundImageComponent,
    ContactComponent,
    InputComponent,
    FormArrayComponent,
    FormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
