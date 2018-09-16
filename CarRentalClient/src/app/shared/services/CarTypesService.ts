import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CarTypesModel } from "../models/Cartypes.model";
import { CartypeModel } from "../models/Cartype.model";
import { Observable, throwError } from "../../../../node_modules/rxjs";
import { tap, catchError } from "../../../../node_modules/rxjs/operators";


@Injectable(
    { providedIn: 'root' }
)
export class CarTypesService {
    carTypeInfo: CarTypesModel = new CarTypesModel();



    constructor(private myHttpClient: HttpClient) {
        // initiate the Carstypes list from the CTOR by calling getAllCarsTypes function       
        this.getAllCarTypes();

    }

    /** Get all Cartypes from server (aand returns values to subscriber)
     * @returns Observable
     */
    getAllCarTypes(): Observable<Array<CartypeModel>> { /// get all cartypes Observable
        return this.myHttpClient.get<Array<CartypeModel>>('api/carstypes')
            .pipe(
                tap((res: Array<CartypeModel>) => console.log(res)),
                catchError(this.handleError('getAllCarTypes', []))
            )
    }

    /** Get list of specific Carstypes from server  (and returns values to subscriber)    
     * @param  {number} carTypeID
     * @returns Observable
     */
    getSpecificCarType(carTypeID: number): Observable<any> {
        return this.myHttpClient.get(`api/carstypes?ctid=${carTypeID}`)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('getSpecificCarType', []))
            )
    }

    /** Post a new cartype to db
     * @param  {CartypeModel} newCarTytpe
     * @returns Observable
     */
    insertCarType(newCarTytpe: CartypeModel): Observable<boolean> {
        return this.myHttpClient.post<boolean>(`api/carstypes?ctid=${newCarTytpe.CarTypeID}`, newCarTytpe)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('insertCarType', false))
            );
    }

    /** Put - update an existing cartype in the db
     * @param  {CartypeModel} editedCarType
     * @returns Observable
     */
    editCarType(editedCarType: CartypeModel): Observable<boolean> {
        return this.myHttpClient.put<boolean>(`api/carstypes?ctid=${editedCarType.CarTypeID}`, editedCarType)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('editCarType', false))
            );
    }

    /** Delete - delete an existing cartype from the db //its not actual deletion, just mark as deleted
     * @param  {CartypeModel} deleteCarType
     * @returns Observable
     */
    deleteCarType(deleteCarType: CartypeModel): Observable<boolean> {
        deleteCarType.IsDeleted = true;
        return this.myHttpClient.put<boolean>(`api/carstypes?ctid=${deleteCarType.CarTypeID}`, deleteCarType)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('deleteCarType', false))
            );
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
