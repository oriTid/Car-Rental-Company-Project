import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CarsModel } from '../shared/models/Cars.model';
import { UsersModel } from '../shared/models/Users.model';
import { UserModel } from '../shared/models/User.model';
import { OrderModel } from '../shared/models/Order.model';
import { BranchModel } from '../shared/models/Branch.model';
import { CarService } from '../shared/services/Car.service';
import { UserService } from '../shared/services/User.service';
import { BranchService } from '../shared/services/Branch.service';
import { OrderService } from '../shared/services/Order.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-order-close',
  templateUrl: './order-close.component.html',
  styleUrls: ['./order-close.component.css']
})
export class OrderCloseComponent implements OnInit {
  localenv: string = environment.endPoint; //enviroument
  localCarsManager: CarsModel;
  localUser: UsersModel;
  singleUser: UserModel; //populate the Order with the user
  actionMsg: string; //for messages
  actionMsgFin: string; //for messages
  isOktoOrder: boolean = false; //to flag id order can be sent to serve
  localBranchesList: Array<BranchModel>; //for the local branches list (pickup())
  localOrder: OrderModel = {
    OrderID: 0,
    OrderDate: null,
    OrderStart: null,
    PlannedEnd: null,
    ActualEnd: null,
    OrigianlCost: 0,
    ActualCost: null,
    IsActiveOrder: true,
    Car:
    {
      CarID: null,
      LicenseNumber: null,
      CurrentKilometers: null,
      IsOperative: true,
      BranchLocation: {
        BranchID: null,
        BranchName: '',
        BranchTel: '',
        BranchAddress: '',
        BranchLatitude: null,
        BarnchLongitude: null,
        IsDeleted: false
      },
      CarInfo:
      {
        CarTypeID: null,
        Manufacturer: '',
        Model: '',
        CarYear: null,
        DailyRate: null,
        LateDailyRate: null,
        IsAutomatic: true,
        IsDeleted: false,
        FullName: ''
      },
      CarPic: '',
      IsDeleted: false
    },
    UserID:
    {
      UserID: null,
      FirstName: '',
      LastName: '',
      ID: '',
      UserName: '',
      Birthdate: null,
      isMale: false,
      Email: '',
      Password: '',
      UserPic: '',
      UserPermission: null,
      IsDeleted: false
    },
  }
    ;

  totalPlannedRentDays: number; //for showing the detailed costs in page
  totalLateRentDays: number;//for showing the detailed costs in page
  actualOrderTime: number;//for showing the detailed costs in page
  additionalCharges: number;//for showing the detailed costs in page


  //init localorder

  constructor(
    private myCarsService: CarService,
    private myUserService: UserService,
    private myActiveRoute: ActivatedRoute,
    private myOrdersService: OrderService,
    private myBranchesService: BranchService,
    private myRoute: Router,
    private myDialog: DialogService
  ) {
    this.localUser = this.myUserService.userInfo;
  }

  backToOrders() {
    this.myRoute.navigate(['/Orders']);
  }

  removeTimeFromDate(date: Date): Date {

    date.setHours(0, 0, 0, 0);
    return date;
  }

  canCancel(): boolean {
    let today: any = new Date(Date.now());
    let orderStart: any = new Date(this.localOrder.OrderStart);
    if (this.removeTimeFromDate(today) < this.removeTimeFromDate(orderStart) && this.localOrder.IsActiveOrder)
      return true;

  }

  saveChanges() {
    this.localOrder.OrderDate = new Date();
    if (this.localOrder.ActualEnd == undefined) {
      this.localOrder.IsActiveOrder = true;
    }
    let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Thanks. Order Closed!" : "action fail"; }
    this.myOrdersService.editOrder(this.localOrder).subscribe(callback);
    if (callback) {
      this.myDialog.dialog('Close Order', `Order #${this.localOrder.OrderID} has been closed.`);
      this.myOrdersService.getAllOrders()
        .subscribe(
          orders => this.myOrdersService.orderInfo.AllOrders = orders
        );
    }
    else return;
  }

  cancelFutureOrder(param: boolean) {
    if (param = true) {
      if (confirm("Are you sure you want to cancel this order ?")) {
        this.localOrder.IsActiveOrder = false;
        let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Order was Cancelled" : "Delete failed"; }
        this.myOrdersService.editOrder(this.localOrder).subscribe(callback);
        if (callback) {
          this.myDialog.dialog('Cancel Future Order', `Future Order #${this.localOrder.OrderID} has been cancelled.`);
          this.myOrdersService.getAllOrders()
            .subscribe(
              orders => this.myOrdersService.orderInfo.AllOrders = orders
            );
        }
      }
    }
  }

  closeOrder() { //function for worker and admin to close active order
    let today: any = new Date(Date.now());
    let orderStart: any = new Date(this.localOrder.OrderStart);
    let orderPlannedEnd: any = new Date(this.localOrder.PlannedEnd);
    let orderActualEnd: any = new Date(this.localOrder.ActualEnd);

    if (orderActualEnd > today) {
      this.myDialog.dialog('Dates', `Cant Close an order in a future time`);
      this.localOrder.ActualCost = 0;
      return;
    }
    if (orderStart > orderActualEnd) {
      this.myDialog.dialog('Dates', `Order's actual end cant be smaller than its Start Date`);      
      this.localOrder.ActualCost = 0;
      return;
    }

    this.totalPlannedRentDays = Math.round(((orderPlannedEnd - orderStart) / (24 * 3600 * 1000))) + 1;
    this.totalLateRentDays = Math.round(((orderActualEnd - orderPlannedEnd) / (24 * 3600 * 1000)));
    this.actualOrderTime = (this.totalPlannedRentDays + this.totalLateRentDays);

    if (this.totalLateRentDays <= 0) {
      this.localOrder.ActualCost = (this.totalPlannedRentDays + this.totalLateRentDays) * (this.localOrder.Car.CarInfo.DailyRate);
      this.additionalCharges = 0;
    }
    else {
      this.localOrder.ActualCost = (this.totalLateRentDays * (this.localOrder.Car.CarInfo.LateDailyRate)) + this.localOrder.OrigianlCost;
      this.additionalCharges = this.localOrder.Car.CarInfo.LateDailyRate * this.totalLateRentDays;
    }

    this.actionMsg = `Actual Order Cost.................................... $${JSON.stringify(this.localOrder.ActualCost)}`;
    this.actionMsgFin = this.actionMsg;

    this.localOrder.IsActiveOrder = false;

    this.myOrdersService.getAllOrders();
  }

  getAllBranches() {
    this.myBranchesService.getAllBranches()
      .subscribe(
        branches => this.localBranchesList = branches
      );
  }

  ngOnInit() {
    this.getAllBranches();
    const cid = this.myActiveRoute.snapshot.params['cid'];
    const oid = this.myActiveRoute.snapshot.params['order'];

    if (cid) {
      this.myCarsService.getSpecificCar(cid)
        .subscribe(
          carList => {
            this.localOrder.Car = carList[0];
          }
        )
      if (this.myUserService.userInfo.singleUser) {
        this.localOrder.UserID = this.myUserService.userInfo.singleUser;
      }
    }
    if (oid) {
      this.myOrdersService.getSpecificOrder(oid)
        .subscribe(
          order => {
            if (order) {
              this.localOrder = order[0];
            }
          }
        );
    }
  }
}
