import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CarService } from './shared/services/Car.service';
import { CarsComponent } from './cars/cars.component';
import { CarTypesService } from './shared/services/CarTypesService';
import { BranchService } from './shared/services/Branch.service';
import { CarInfoComponent } from './car-info/car-info.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchInfoComponent } from './branch-info/branch-info.component';
import { CartypeInfoComponent } from './cartype-info/cartype-info.component';
import { CartypesComponent } from './cartypes/cartypes.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { UserService } from './shared/services/User.service';
import { OrderService } from './shared/services/Order.service';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { UploadImageService } from './shared/services/UploadImage.service';
import { SigninComponent } from './signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './iterceptors/http.interceptor';
import { OrderInfoNewComponent } from './order-info-new/order-info-new.component';
import { CarInfoPublicComponent } from './car-info-public/car-info-public.component';
import { OrderCloseComponent } from './order-close/order-close.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { FilterNumberPipe } from './pipes/filter-number.pipe';
import { FilterTextPipe } from './pipes/filter-text.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/components/dialog/dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarInfoComponent,
    BranchesComponent,
    BranchInfoComponent,
    CartypeInfoComponent,
    CartypesComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    HomeComponent,
    OrdersComponent,
    SigninComponent,
    SignupComponent,
    OrderInfoNewComponent,
    CarInfoPublicComponent,
    OrderCloseComponent,
    FilterNumberPipe,
    FilterTextPipe,
    UserOrdersComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogComponent,
  ],
  providers: [
    CarService,
    BranchService,
    CarTypesService,
    UserService,
    OrderService,
    UploadImageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
