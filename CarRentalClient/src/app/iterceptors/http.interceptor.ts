import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../shared/services/User.service';
import { UserModel } from '../shared/models/User.model';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private myUserService: UserService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    console.log('Interceptor: ', req);
    
    

    /// Full URI Backend and Route.
    // Get the auth token from the SessionStorage.
    let uri = `${environment.endPoint}${req.url}`;
    let userAuth: UserModel;

    if (this.myUserService.userInfo && 
        this.myUserService.userInfo.singleUser && 
        this.myUserService.userInfo.singleUser.UserName && 
        this.myUserService.userInfo.singleUser.Password
      ) {
      userAuth = this.myUserService.userInfo.singleUser;
    }

    let authReq;

    if (req.url == "api/UploadImage")
    {

      /// Clone the request to add the new header.
     authReq = req.clone({
      url: uri,
      setHeaders: {
        'Accept': 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*',
      }
    });


    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (userAuth) {
      authReq = req.clone({
        url: uri,
        setHeaders: {
          'Accept': 'application/json, text/plain, */*',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `${userAuth.UserName} ${userAuth.Password}`
        }
      });
    }
    }
else
{
    /// Clone the request to add the new header.
     authReq = req.clone({
      url: uri,
      setHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (userAuth) {
      authReq = req.clone({
        url: uri,
        setHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `${userAuth.UserName} ${userAuth.Password}`
        }
      });
    }
  }
    console.log('Interceptor: ', authReq);
      // send cloned request with header to the next handler.
      return next.handle(authReq)
        // .pipe(
        //   tap(
        //     (event: HttpResponse<any>) => this.errorHandler.handle(event.status),
        //     error => this.errorHandler.handle(error)
        //   )
        // );
      // Todo: Send to logService
  
  }
}

