import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { CarsModel } from "../models/Cars.model";
import { CarModel } from "../models/Car.Model";



@Injectable(
    { providedIn: 'root' }
)
export class CarService {

    carInfo: CarsModel = new CarsModel();

    constructor(private myHttpClient: HttpClient) {
        // initiate the Cars list from the CTOR by calling getAllCars function
        this.getAllCars(); 
    }

    /**  Get all Cars from server (aand returns values to subscriber)
     * @returns Observable
     */
    getAllCars(): Observable<Array<CarModel>> { 
        return this.myHttpClient.get('api/cars')
            .pipe(
                tap((res: Array<CarModel>) => console.log(res)),
                catchError(this.handleError('getAllCars', []))
            )
    }


    /**
     * @param  {number} carID
     * @returns Observable
     */
    getSpecificCar(carID: number): Observable<any> {
        return this.myHttpClient.get(`api/cars?cid=${carID}`)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('getSpecificCar', []))
            )
    }


    /** Post a Car to db
     * @param  {CarModel} newCar
     * @returns Observable
     */
    insertCar(newCar: CarModel): Observable<boolean> {
        return this.myHttpClient.post<boolean>(`api/cars?cid=${newCar.CarID}`, newCar)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('insertCar', false))
            );
    }

    /**  Put - update an existing car in the db
     * @param  {CarModel} editedCar
     * @returns Observable
     */
    editCar(editedCar: CarModel): Observable<boolean> {
               return this.myHttpClient.put<boolean>(`api/cars?cid=${editedCar.CarID}`, editedCar)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('editCar', false))
            );
    }

    /** Delete - delete an existing car from the db //its not actual deletion, just mark as deleted
     * @param  {CarModel} deleteCar
     * @returns Observable
     */
    deleteCar(deleteCar: CarModel): Observable<boolean> {
        deleteCar.IsDeleted = true;
        return this.myHttpClient.put<boolean>(`api/cars?cid=${deleteCar.CarID}`, deleteCar)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('deleteCar', false))
            );
    }



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
