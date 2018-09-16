import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/Car.service';
import { CarsModel } from '../shared/models/Cars.model';
import { CarModel } from '../shared/models/Car.Model';
import { BranchesModel } from '../shared/models/Branches.model';
import { CarTypesModel } from '../shared/models/Cartypes.model';
import { BranchService } from '../shared/services/Branch.service';
import { CarTypesService } from '../shared/services/CarTypesService';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageService } from '../shared/services/UploadImage.service';
import { environment } from "../../environments/environment";
import { Guid } from '../../app/shared/models/Guid.model';
import { CartypeModel } from '../shared/models/Cartype.model';
import { zip } from '../../../node_modules/rxjs';
import { BranchModel } from '../shared/models/Branch.model';
import { DialogService } from '../shared/services/Dialog.service';


@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  localenv: string = environment.endPoint; //enviroument
  localCarsManager: CarsModel;
  localCarTypesManager: CarTypesModel;
  localCarTypeModel: Array<CartypeModel>;
  localBranchesModel: Array<BranchModel>;
  localBranchesManager: BranchesModel;
  actionMsg: string;
  showAllCars: boolean;
  cid: number; //parameter to filter carslist
  localParam: string; //for the routing
  toDelete: boolean;
  imageUrl: string = ""; //car pic url
  fileToUpload: File = null; //car pic up load file
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
    private myCarsService: CarService, private myBranchesService: BranchService,
    private myImageService: UploadImageService, private myCarTypesService: CarTypesService,
    private myActiveRoute: ActivatedRoute, private myRoute: Router, private myDialog: DialogService) { }


  saveChanges() {
    if (this.fileToUpload && this.fileToUpload.name) {
      let newFileName: string = Guid.newGuid().toString() + this.fileToUpload.name; //generate guid for the pic filename  
      this.localCar.CarPic = newFileName;
      this.OnPicSubmit();
      return;
    }
    let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Action Done" : "Action Failed"; }
    this.localCar.BranchLocation = this.localCar.BranchLocation || this.localBranchesManager.branchesList[0];
    this.localCar.CarInfo = this.localCar.CarInfo || this.localCarTypesManager.carTypesList[0];
    (this.localParam != undefined) ? this.myCarsService.editCar(this.localCar).subscribe(callback) : this.myCarsService.insertCar(this.localCar).subscribe(callback);
    if (this.localCar.CarID > 0) {
      this.myDialog.dialog('Edit Car', `${this.localCar.CarInfo.FullName} updated successfully`);
    }
    else this.myDialog.dialog('New Car', `New ${this.localCar.CarInfo.FullName} added successfully`);
    this.myCarsService.getAllCars()
      .subscribe(
        cars => this.myCarsService.carInfo.allCars = cars
      );
    this.myRoute.navigate(['/Cars']);
  }

  compareCarTypeID(a, b) {
    // console.log(a, b, a && b && a.CarTypeID == b.CarTypeID);
    return a && b && a.CarTypeID == b.CarTypeID;
  }


  compareBranchID(a, b) {
    // console.log(a, b, a && b && a.BranchID == b.BranchID);
    return a && b && a.BranchID == b.BranchID;
  }

  setCarType() { //to update the local order with the branch after user choose pickup
    this.localCar.CarInfo = this.localCarTypeModel[0];
    // const cartType = this.localCarTypeModel.filter(carType => carType.CarTypeID === parseInt(id));
    // this.localCar.CarInfo = cartType[0];
  }

  setBranch(id) { //to update the local order with the branch after user choose pickup
    const branch = this.localBranchesModel.filter(branch => branch.BranchID === parseInt(id));
    this.localCar.BranchLocation = branch[0];
  }



  //////////// File upload functions /////////
  handleFileInput(file: FileList) {
    //Save image to the class property
    this.fileToUpload = file.item(0);


    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => { this.imageUrl = event.target.result; }
    reader.readAsDataURL(this.fileToUpload);
  }

  OnPicSubmit() {
    this.myImageService.postFile(this.localCar.CarPic, this.fileToUpload)
      .subscribe(data => {
        console.log('done');
        let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Action Done" : "Action Failed"; }
        this.localCar.BranchLocation = this.localCar.BranchLocation || this.localBranchesManager.branchesList[0];
        this.localCar.CarInfo = this.localCar.CarInfo || this.localCarTypesManager.carTypesList[0];
        (this.localParam != undefined) ? this.myCarsService.editCar(this.localCar).subscribe(callback) : this.myCarsService.insertCar(this.localCar).subscribe(callback);
        if (this.localCar.CarID > 0) {
          this.myDialog.dialog('Edit Car', `${this.localCar.CarInfo.FullName} updated successfully`);
        }
        else this.myDialog.dialog('New Car', `New ${this.localCar.CarInfo.FullName} added successfully`);
        this.myCarsService.getAllCars()
          .subscribe(
            cars => this.myCarsService.carInfo.allCars = cars
          );
        this.myRoute.navigate(['/Cars']);
      });
  }


  ngOnInit() {
    
    zip(
      this.myCarTypesService.getAllCarTypes(),
      this.myBranchesService.getAllBranches()
    ).subscribe(
      ([carTypes, branches]) => {
        if (carTypes) {
          this.localCarTypeModel = carTypes;
        }
        if (branches) {
          this.localBranchesModel = branches;
        }
      }
    )

    this.myActiveRoute.params.subscribe(params => {
      this.localParam = params.cid;
      if (params.cid) {
        this.myCarsService.getSpecificCar(params.cid)
          .subscribe(carList => { this.localCar = carList[0]; })
      }

    });
  }
}

