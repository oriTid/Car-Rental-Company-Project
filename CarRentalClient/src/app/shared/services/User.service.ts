
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserModel } from "../models/User.model";
import { UsersModel } from "../models/Users.model";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";


@Injectable(
    { providedIn: 'root' }
)
export class UserService {

    userInfo: UsersModel = new UsersModel();
    isAuth = false;

    constructor(private myHttpClient: HttpClient) {
        this.getAllUsers();
    }

    /** Get all Users from server (aand returns values to subscriber)
     * @returns Observable
     */
    getAllUsers(): Observable<Array<UserModel>> {
        return this.myHttpClient.get('api/users')
            .pipe(
                tap((res: Array<UserModel>) => console.log(res)),
                catchError(this.handleError('getAllUsers', []))
            )
    }

    /** get a user back from server after sending user and pass
     * @param  {string} userName
     * @param  {string} password
     * @returns Observable
     */
    getUserForLogin(userName: string, password: string): Observable<any> {
        return this.myHttpClient.get(`api/users?userName=${userName}&passWord=${password}`)
            .pipe(
                tap(res => {
                    this.userInfo.singleUser = res;
                }),
        );
    }

    /** Get list of specific user from server
     * @param  {number} userID
     * @returns Observable
     */
    getSpecificUser(userID: number): Observable<any> {
        return this.myHttpClient.get(`api/users?uid=${userID}`)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('getSpecificUser', []))
            )
    }

    /** Post a Branch to db
     * @param  {UserModel} newUser
     * @returns Observable
     */
    insertUser(newUser: UserModel): Observable<boolean> {
        return this.myHttpClient.post<boolean>(`api/users?uid=${newUser.UserID}`, newUser)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('insertUser', false))
            );
    }

    /** Put - update an existing user in the db
    * @param  {UserModel} editUser
    * @returns Observable
    */
    editUser(editUser: UserModel): Observable<boolean> {
        return this.myHttpClient.put<boolean>(`api/users?uid=${editUser.UserID}`, editUser)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('insertUser', false))
            );
    }

    /** Delete - delete an existing user from the db //its not actual deletion, just mark as deleted
     * @param  {UserModel} deleteUser
     * @returns Observable
     */
    deleteUser(deleteUser: UserModel): Observable<boolean> {
        deleteUser.IsDeleted = true;
        return this.myHttpClient.put<boolean>(`api/users?uid=${deleteUser.UserID}`, deleteUser)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('deleteUser', false))
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
