import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from '../../../../node_modules/rxjs/operators';
import { Observable, throwError } from '../../../../node_modules/rxjs';

@Injectable(

  {providedIn: 'root'}
)
export class UploadImageService {

  constructor(private http : HttpClient) { }

  postFile(caption: string, fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);

    console.log('Sending picture');

    return this.http.post('api/UploadImage', formData)
      .pipe(
        tap(image => console.log('postFile: ', image)),
        catchError(this.handleError('postFile', false))
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
