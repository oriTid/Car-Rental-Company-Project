import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrdersModel } from "../models/Orders.model";
import { OrderModel } from "../models/Order.model";
import { Observable, throwError } from "../../../../node_modules/rxjs";
import { tap, catchError } from "../../../../node_modules/rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    orderInfo: OrdersModel = new OrdersModel();

    constructor(private myHttpClient: HttpClient) {
        //initiate the Orders list from the CTOR by calling getAllCars function
        this.getAllOrders();
    }

    /** Get all Orders from server (aand returns values to subscriber)
     * @returns Observable
     */
    getAllOrders(): Observable<Array<OrderModel>> {
        return this.myHttpClient.get(`api/orders`)
            .pipe(
                tap((res: Array<OrderModel>) => console.log(res)),
                catchError(this.handleError('getAllOrders', []))
            )
    }

    /** Get list of specific Orders from server (and save the returned values to a property in this service)    
     * @param  {number} orderID
     * @returns Observable
     */
    getSpecificOrder(orderID: number): Observable<Array<OrderModel>> {
        return this.myHttpClient.get(`api/orders?oid=${orderID}`)
            .pipe(
                tap((res: Array<OrderModel>) => this.orderInfo.AllOrders = res),
                catchError(this.handleError('getSpecificOrder', []))
            );
    }

    /** Get list of all Users Orders from server (and save the returned values to a property in this service)    
     * @param  {number} orderID
     * @returns Observable
     */
    getUserOrder(userID: number, userpass:string): Observable<Array<OrderModel>> {
        return this.myHttpClient.get(`api/orders?userId=${userID}&passWord=${userpass}`)
            .pipe(
                tap((res: Array<OrderModel>) => this.orderInfo.AllOrders = res),
                catchError(this.handleError('getUserOrder', []))
            );
    }

    /** will check if the car is avaliable in desigered dates, by sending the server start, end, licensenumber
     * @param  {Date} startDate
     * @param  {Date} endDate
     * @param  {string} LicenseNumber
     * @returns Observable
     */
    getOrderCheck(startDate: Date, endDate: Date, LicenseNumber: string): Observable<any> {
        return this.myHttpClient.get(`api/orders?startDate=${startDate}&endDate=${endDate}&LicenseNumber=${LicenseNumber}`)
            .pipe(
                tap(res => {
                    console.log(res);
                }),
                catchError(this.handleError('getOrderCheck', []))
            );
    }

    /** Post a new Order to db   
     * @param  {OrderModel} newOrder
     * @returns Observable
     */
    insertOrder(newOrder: OrderModel): Observable<boolean> {
        return this.myHttpClient.post<boolean>(`api/orders?oid=${newOrder.OrderID}`, newOrder)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('insertOrder', false))
            );
    }

    /** Put - update an existing Order in the db
     * @param  {OrderModel} editOrder
     * @returns Observable
     */
    editOrder(editOrder: OrderModel): Observable<boolean> {
        return this.myHttpClient.put<boolean>(`api/orders?oid=${editOrder.OrderID}`, editOrder)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('editOrder', false))
            );
    }


    /** Delete - delete an existing Order from the db 
     * @param  {number} orderID
     * @returns Observable
     */
    deleteOrder(orderID: number): Observable<boolean> {
        return this.myHttpClient.delete<boolean>( `api/orders?oid=${orderID}`)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('deleteOrder', false))
            )
    }

    //     /**
    //    * Handle Http operation that failed.
    //    * Let the app continue.
    //    * @param operation - name of the operation that failed
    //    * @param result - optional value to return as the observable result
    //    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // send the error to remote logging infrastructure
            console.error(`${operation} failed: ${error.message}`, error);


            // Let the app keep running by returning an empty result.
            // return of(result as T);

            // Throw Error
            return throwError(error);
        };
    }

}
