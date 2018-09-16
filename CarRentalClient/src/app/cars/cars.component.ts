import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/Car.service';
import { CarsModel } from '../shared/models/Cars.model';
import { environment } from '../../environments/environment';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/User.service';
import { Router } from '../../../node_modules/@angular/router';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  actionMsg: string;
  localCarsManager: CarsModel;
  cid: number; //parameter to filter carslist
  localenv: string = environment.endPoint; //enviroument
  localUser: UsersModel; //for allowing buttons and operation bt permissions
  textSearch = '';

  constructor(
    private myCarsService: CarService,
    private myUserService: UserService,
    private myRoute: Router,
    private myDialog: DialogService
  ) {
    this.localUser = this.myUserService.userInfo;
  }

  //for apply routing after button click
  goTo(id: string) {
    if (this.myUserService.isAuth) {
      this.myRoute.navigate(['/OrderInfo', id]);
    } else {
      this.myDialog.dialog('Signin', `Please signin`);
      this.myRoute.navigate(['/signin']);
    }
  }

  deleteCar111(cid: number) {
    if (confirm("Are you sure you want to delete this car ?")) {
      let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Delete Done" : "Delet Failed"; }
      this.myCarsService.deleteCar(this.localCarsManager.allCars.find(c => c.CarID == cid)).subscribe(callback);
      // Save
    } else {
      // Do nothing!
    }
  }

  deleteCar(cid: number) {
    if (confirm("Are you sure you want to delete this Car ?")) {
      this.myCarsService.deleteCar(this.localCarsManager.allCars.find(c => c.CarID == cid)).subscribe(
        (res) => {
          if (res) {
            this.myDialog.dialog('Car', `Car deleted`);
            this.myCarsService.getAllCars()
              .subscribe(
                cars => this.localCarsManager.allCars = cars
              );
          }
        });
    }
    else;
  }

  ngOnInit() {
    this.myCarsService.getAllCars()
      .subscribe(
        cars => this.myCarsService.carInfo.allCars = cars
      );

    this.localCarsManager = this.myCarsService.carInfo;

  }

}



