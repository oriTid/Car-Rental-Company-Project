import { Component, OnInit } from '@angular/core';
import { CarTypesModel } from '../shared/models/Cartypes.model';
import { CartypeModel } from '../shared/models/Cartype.model';
import { CarTypesService } from '../shared/services/CarTypesService';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-cartype-info',
  templateUrl: './cartype-info.component.html',
  styleUrls: ['./cartype-info.component.css']
})
export class CartypeInfoComponent implements OnInit {

  localCarTypesManager: CarTypesModel;
  actionMsg: string;
  showAllCarTypes: boolean;
  ctid: number; //parameter to filter CarTypes List
  localParam: string; //for the routing
  toDelete: boolean;

  localCarType: CartypeModel =
    {
      CarTypeID: undefined,
      Manufacturer: undefined,
      Model: undefined,
      CarYear: undefined,
      DailyRate: undefined,
      LateDailyRate: undefined,
      IsAutomatic: undefined,
      IsDeleted: undefined,
      FullName: undefined
    };

  constructor(
    private myCartypeService: CarTypesService,
    private myActiveRoute: ActivatedRoute,
    private myRoute: Router,
    private myDialog: DialogService) { }


  saveChanges() {

    let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Action Done" : "Action Falied"; }
    (this.localParam != undefined) ? this.myCartypeService.editCarType(this.localCarType).subscribe(callback) : this.myCartypeService.insertCarType(this.localCarType).subscribe(callback);
    if (this.localCarType.CarTypeID > 0) {
      this.myDialog.dialog('Edit CarType', `Cartype #${this.localCarType.CarTypeID}  updated successfully`);
    }
    else this.myDialog.dialog('New CarType', `New Cartype added successfully`);
    this.myCartypeService.getAllCarTypes()
      .subscribe(
        cartypes => this.myCartypeService.carTypeInfo.carTypesList = cartypes
      );
    this.myRoute.navigate(['/CarTypes']);
  }

  markCarTypeforDelete(param: boolean) {
    if (param = true) {
      if (confirm("Are you sure you want to delete this Cartype ?")) {
        this.localCarType.IsDeleted = true;
        let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Delete Done" : "Delete Failed"; }
        this.myCartypeService.editCarType(this.localCarType).subscribe(callback);
        if (callback) {
          this.myCartypeService.getAllCarTypes()
            .subscribe(
              cartypes => this.localCarTypesManager.carTypesList = cartypes
            );
          this.myDialog.dialog('CarType', `CarType deleted`);
          this.myRoute.navigate(['/CarTypes']);
        }
      }
      else;
    }
  }

  ngOnInit() {

    this.localCarTypesManager = this.myCartypeService.carTypeInfo;
    this.myActiveRoute.params.subscribe(params => {
      this.localParam = params.ctid;
      if (params.ctid) {
        this.myCartypeService.getSpecificCarType(params.ctid)
          .subscribe(carTypeList => { this.localCarType = carTypeList[0]; })
      }
    });
  }

}
