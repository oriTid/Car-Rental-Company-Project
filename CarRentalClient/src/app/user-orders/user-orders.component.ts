import { Component, OnInit } from '@angular/core';
import { OrdersModel } from '../shared/models/Orders.model';
import { UsersModel } from '../shared/models/Users.model';
import { UserService } from '../shared/services/User.service';
import { OrderService } from '../shared/services/Order.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  localenv: string = environment.endPoint; //enviroument
  actionMsg: string;
  localOrdersManager: OrdersModel;
  oid: number; //parameter to filter orderlist
  localUser: UsersModel;
  textSearch = ''; //for filtering table
  textSearchOrder = ''; //for filtering table
  isActive = ''; //for filtering table

  constructor(private myUserService: UserService,
    private myOrderService: OrderService) {

    this.localUser = this.myUserService.userInfo;
  }

  ngOnInit() {
    this.myOrderService.getUserOrder(this.localUser.singleUser.UserID, this.localUser.singleUser.Password)
      .subscribe(
        orders => this.myOrderService.orderInfo.AllOrders = orders
      );

    this.localOrdersManager = this.myOrderService.orderInfo;
  }
}
