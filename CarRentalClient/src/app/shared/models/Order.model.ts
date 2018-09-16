import { CarModel } from "./Car.Model";
import { UserModel } from "./User.model";
import { formatDate } from "@angular/common";

export interface OrderModel {

    OrderID: number;
    OrderDate: Date;
    Car: CarModel;
    UserID: UserModel;
    OrderStart: Date;
    PlannedEnd: Date;
    ActualEnd: Date;
    OrigianlCost: number;
    ActualCost: number;
    IsActiveOrder: boolean;
}