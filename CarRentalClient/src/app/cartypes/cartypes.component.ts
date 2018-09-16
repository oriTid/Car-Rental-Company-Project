import { Component, OnInit } from '@angular/core';
import { CarTypesModel } from '../shared/models/Cartypes.model';
import { CarTypesService } from '../shared/services/CarTypesService';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/User.service';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-cartypes',
  templateUrl: './cartypes.component.html',
  styleUrls: ['./cartypes.component.css']
})
export class CartypesComponent implements OnInit {
  actionMsg: string;
  localCarTypeManager: CarTypesModel;
  ctid: number; //parameter to filter branches list
  localUser: UsersModel; //for allowing buttons and operation by permissions

  constructor(
    private myCarTypeService: CarTypesService,
    private myUserService: UserService,
    private myDialog: DialogService) {
    this.localUser = this.myUserService.userInfo;
  }

  deleteCarType(ctid: number) {
    if (confirm("Are you sure you want to delete this CarType ?")) {
      this.myCarTypeService.deleteCarType(this.localCarTypeManager.carTypesList.find(ct => ct.CarTypeID == ctid)).subscribe(
        (res) => {
          if (res) {
            this.myDialog.dialog('CarType', `CarType deleted`);
            this.myCarTypeService.getAllCarTypes()
              .subscribe(
                cartpyes => this.localCarTypeManager.carTypesList = cartpyes
              );
          }
        });
    }
    else;
  }

  ngOnInit() {
    this.myCarTypeService.getAllCarTypes()
      .subscribe(
        cartypes => this.myCarTypeService.carTypeInfo.carTypesList = cartypes
      );

    this.localCarTypeManager = this.myCarTypeService.carTypeInfo;
  }
}
