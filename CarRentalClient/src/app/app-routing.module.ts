import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchInfoComponent } from './branch-info/branch-info.component';
import { CartypesComponent } from './cartypes/cartypes.component';
import { CartypeInfoComponent } from './cartype-info/cartype-info.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { OrderInfoNewComponent } from './order-info-new/order-info-new.component';
import { CarInfoPublicComponent } from './car-info-public/car-info-public.component';
import { OrderCloseComponent } from './order-close/order-close.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';




export const appRouting: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Cars', component: CarsComponent },
  { path: 'Add Car', component: CarInfoComponent },
  { path: 'insertCar', component: CarInfoComponent },
  { path: 'EditCar/:cid', component: CarInfoComponent },
  { path: 'Branches', component: BranchesComponent },
  { path: 'Add Branch', component: BranchInfoComponent },
  { path: 'insertBranch', component: BranchInfoComponent },
  { path: 'EditBranch/:bid', component: BranchInfoComponent },
  { path: 'CarTypes', component: CartypesComponent },
  { path: 'Add CarType', component: CartypeInfoComponent },
  { path: 'insertCarType', component: CartypeInfoComponent },
  { path: 'EditCarType/:ctid', component: CartypeInfoComponent },
  { path: 'Users', component: UsersComponent },  
  { path: 'Orders', component: OrdersComponent }, 
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup/:uid', component: SignupComponent },  
  { path: 'OrderInfo', component: OrderInfoNewComponent },
  { path: 'OrderInfo/:cid', component: OrderInfoNewComponent },
  { path: 'OrderClose/:cid', component: OrderCloseComponent },
  { path: 'Carinfopublic', component: CarInfoPublicComponent },
  { path: 'Carinfopublic/:cid', component: CarInfoPublicComponent },
  { path: 'Userinfo', component:UserOrdersComponent},
  { path: 'Userinfo/:uid', component:UserOrdersComponent},
  
  


  //default path - will redirect the current path to 'Home'
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  // ** is an angular placeholder for any path that does not exist
  { path: '**', component: AppComponent }
];


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }