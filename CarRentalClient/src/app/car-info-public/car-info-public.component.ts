import { Component, OnInit } from '@angular/core';
import { CarsModel } from '../shared/models/Cars.model';
import { CarModel } from '../shared/models/Car.Model';
import { environment } from '../../environments/environment';
import { CarService } from '../shared/services/Car.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService } from '../shared/services/User.service';
import { UsersModel } from '../shared/models/Users.model';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-car-info-public',
  templateUrl: './car-info-public.component.html',
  styleUrls: ['./car-info-public.component.css']
})
export class CarInfoPublicComponent implements OnInit {
  localenv: string = environment.endPoint; //enviroument
  localCarsManager: CarsModel;
  cid: number; //parameter to filter carslist
  localParam: string; //for the routing
  imageUrl: string = ""; //car pic url  
  localUser: UsersModel;
  localCar: CarModel = {
    CarID: undefined,
    LicenseNumber: undefined,
    CurrentKilometers: undefined,
    IsOperative: true,
    CarPic: undefined,
    IsDeleted: undefined,
    BranchLocation: {
      BranchID: undefined,
      BranchName: undefined,
      BranchTel: undefined,
      BranchAddress: undefined,
      BranchLatitude: undefined,
      BarnchLongitude: undefined,
      IsDeleted: undefined
    },
    CarInfo: {
      CarTypeID: undefined,
      Manufacturer: undefined,
      Model: undefined,
      CarYear: undefined,
      DailyRate: undefined,
      LateDailyRate: undefined,
      IsAutomatic: undefined,
      IsDeleted: undefined,
      FullName: undefined
    }
  };

  constructor(
    private myCarsService: CarService, private myActiveRoute: ActivatedRoute,
    private myUserService: UserService, private myRoute: Router,
    private myDialog: DialogService) {
    this.localUser = this.myUserService.userInfo;
  }


  goTo(id: string) {
    if (this.myUserService.isAuth) {
      this.myRoute.navigate(['/OrderInfo', id]);
    } else {
      this.myDialog.dialog('Signin', `Please signin`);
      this.myRoute.navigate(['/signin']);
    }
  }

  ngOnInit() {

    this.myActiveRoute.params.subscribe(params => {
      this.localParam = params.cid;
      if (params.cid) {
        this.myCarsService.getSpecificCar(params.cid)
          .subscribe(carList => { this.localCar = carList[0]; })
      }

    });
  }

}
