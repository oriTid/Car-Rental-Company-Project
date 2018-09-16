import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchesModel } from '../models/Branches.model';
import { BranchModel } from '../models/Branch.model';
import { Observable, throwError } from '../../../../node_modules/rxjs';
import { tap, catchError } from '../../../../node_modules/rxjs/operators';

@Injectable(
    { providedIn: 'root' }
)
export class BranchService {

    branchInfo: BranchesModel = new BranchesModel();

    constructor(
        private myHttpClient: HttpClient,
    ) {
        this.getAllBranches();  // initiate the Branches list from the CTOR by calling getAllBranches function
    }

    /** Get all Branches from server (aand returns values to subscriber)
     * @returns Observable
     */
    getAllBranches(): Observable<Array<BranchModel>> {
        return this.myHttpClient.get('api/branches')
            .pipe(
                tap((res: Array<BranchModel>) => { 
                    console.log(res);
                    this.branchInfo.branchesList = res
                }),
                catchError(this.handleError('getAllBranches', []))
            )
    }
    
    /** Get list of specific branch from server (and returns values to subscriber)
     * @param  {number} branchID
     * @returns Observable
     */
    getSpecificBranch(branchID: number): Observable<Array<BranchModel>> {
        return this.myHttpClient.get<Array<BranchModel>>(`api/branches?bid=${branchID}`)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('getSpecificBranch', []))
            );
    }

    /** Post a Branch to db
     * @param  {BranchModel} newBranch
     * @returns Observable
     */
    insertBranch(newBranch: BranchModel): Observable<boolean> {
        return this.myHttpClient.post<boolean>(`api/branches?bid=${newBranch.BranchID}`, newBranch)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('insertBranch', false))
            );
    }

    // Put - update an existing Branch in the db
    editBranch(editBranch: BranchModel): Observable<boolean> {
        return this.myHttpClient.put<boolean>(`api/branches?bid=${editBranch.BranchID}`, editBranch)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('editBranch', false))
            );
    }

    //Delete - delete an existing Branch from the db //its not actual deletion, just mark as deleted
    deleteBranch(deleteBranch: BranchModel): Observable<boolean> {
        deleteBranch.IsDeleted = true;
        return this.myHttpClient.put<boolean>(`api/branches?bid=${deleteBranch.BranchID}`, deleteBranch)
            .pipe(
                tap(res => console.log(res)),
                catchError(this.handleError('editBranch', false))
            );
    }

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


    //     /**
    //    * Handle Http operation that failed.
    //    * Let the app continue.
    //    * @param operation - name of the operation that failed
    //    * @param result - optional value to return as the observable result
    //    */

}
