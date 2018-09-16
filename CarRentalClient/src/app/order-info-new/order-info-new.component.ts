import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/Car.service';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { OrderModel } from '../shared/models/Order.model';
import { UserModel } from '../shared/models/User.model';
import { UserService } from '../shared/services/User.service';
import { CarsModel } from '../shared/models/Cars.model';
import { OrderService } from '../shared/services/Order.service';
import { UsersModel } from '../shared/models/Users.model';
import { BranchService } from '../shared/services/Branch.service';
import { BranchModel } from '../shared/models/Branch.model';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-order-info-new',
  templateUrl: './order-info-new.component.html',
  styleUrls: ['./order-info-new.component.css']
})
export class OrderInfoNewComponent implements OnInit {

  localenv: string = environment.endPoint; //enviroument
  localCarsManager: CarsModel;
  localUser: UsersModel;
  singleUser: UserModel; //populate the Order with the user

  //init localorder
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

  actionMsg: string; //for messages
  actionMsgFin: string; //for messages
  isOktoOrder: boolean = false; //to flag id order can be sent to serve
  totalPlannedRentDays: number;
  localBranchesList: Array<BranchModel>; //for the local branches list (pickup())


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

  saveChanges() {
    this.localOrder.OrderDate = new Date();
    if (this.localOrder.ActualEnd == undefined) {
      this.localOrder.IsActiveOrder = true;
      this.actionMsgFin = this.actionMsg;
    }
    let callback = (bool: boolean) => { this.actionMsg = (bool) ? "Thanks. Your order has been submitted." : "action fail"; }
    this.myOrdersService.insertOrder(this.localOrder).subscribe(callback);
    if(callback){
      this.myDialog.dialog('New Order', `Your order has been submitted.`);
    }
  }

  compareBranchID(a, b) {
    // console.log(a, b, a && b && a.BranchID == b.BranchID);
    return a && b && a.BranchID == b.BranchID;
  }

  getAllBranches() {
    this.myBranchesService.getAllBranches()
      .subscribe(
        branches => this.localBranchesList = branches
      );
  }

  backToCars(){
    this.myRoute.navigate(['/Cars']);
  }
  
  reSched() { //reschdeule after checking
    this.localOrder.OrigianlCost = 0;
    this.actionMsg = "";
    this.isOktoOrder = false;
  }

  removeTimeFromDate(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  checkUserOrder() { //function for user to check if order can be submitted. If true, calculate price and flag it so the HTML submit button will be enabled
    let today: any = new Date(Date.now());
    let orderStart: any = new Date(this.localOrder.OrderStart);
    let orderPlannedEnd: any = new Date(this.localOrder.PlannedEnd);

    if (this.removeTimeFromDate(orderStart) < this.removeTimeFromDate(today) || this.removeTimeFromDate(orderPlannedEnd) < this.removeTimeFromDate(today)) {
      this.myDialog.dialog('Dates Validation', `Your Order Start Date Cant be smaller than today. Please try again.`);      
      this.localOrder.OrigianlCost = 0;
      return;
    }
    if (this.removeTimeFromDate(orderStart) > this.removeTimeFromDate(orderPlannedEnd)) {
      this.myDialog.dialog('Dates Validation', `Order's end date cant be smaller than its Start Date. Please try again.`);
      this.localOrder.OrigianlCost = 0;
      return;
    }

    this.totalPlannedRentDays = Math.round(((orderPlannedEnd - orderStart) / (24 * 3600 * 1000))) + 1;

    this.localOrder.OrigianlCost = this.totalPlannedRentDays * (this.localOrder.Car.CarInfo.DailyRate);

    this.myOrdersService.getOrderCheck(this.localOrder.OrderStart, this.localOrder.PlannedEnd, this.localOrder.Car.LicenseNumber)
      .subscribe(
        res => {
          if (res) {
            this.actionMsg = 'Sorry. Car is unavaliable in those dates. Try again.'
            this.isOktoOrder = false;
            return;
          }
          this.actionMsg = `Total Planned Cost.................................... $${JSON.stringify(this.localOrder.OrigianlCost)}`          
          this.isOktoOrder = true;
        }
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
