import { Component, OnInit } from '@angular/core';
import { OrdersModel } from '../shared/models/Orders.model';
import { OrderService } from '../shared/services/Order.service';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/User.service';
import { environment } from '../../environments/environment';
import { DialogService } from '../shared/services/Dialog.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  actionMsg: string;
  localenv: string = environment.endPoint; //enviroument
  localOrdersManager: OrdersModel;
  oid: number; //parameter to filter orderlist
  localUser: UsersModel;
  textSearch = ''; //for filtering table
  textSearchOrder = ''; //for filtering table
  textSearchUser = ''; //for filtering table
  isActive = ''; //for filtering table

  constructor(private myUserService: UserService,
    private myDialog: DialogService,
    private myOrderService: OrderService) {

    this.localUser = this.myUserService.userInfo;
  }

  removeTimeFromDate(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  canCancel(orderStrt: Date): boolean {
    let today: any = new Date(Date.now());
    let orderStart: any = new Date(orderStrt);
    if (this.removeTimeFromDate(today) < this.removeTimeFromDate(orderStart))
      return true;
  }

  markOrderforDelete(orderID: number) {
    if (confirm("Are you sure you want to delete this Order ?")) {
      this.myOrderService.deleteOrder(orderID).subscribe(
        (res) => {
          if (res) {
            this.myDialog.dialog('Order', `Order was deleted.`);
            this.myOrderService.getAllOrders()
              .subscribe(
                orders => this.localOrdersManager.AllOrders = orders
              );
          }          
        });
    }
    else;
  }

  ngOnInit() {
    this.myOrderService.getAllOrders()
      .subscribe(
        orders => this.myOrderService.orderInfo.AllOrders = orders
      );

    this.localOrdersManager = this.myOrderService.orderInfo;
  }
}
