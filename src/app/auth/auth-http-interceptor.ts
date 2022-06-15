import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable() //used in app module to overide the dependency injection
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // since req is readonly, we call clone on it to modify the object value
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    return next.handle(modifiedReq);
    //handle response
    // .pipe(
    //   tap((val: any) => {
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('Request successfully sent');
    //     }
    //     if (val.type === HttpEventType.Response) {
    //       console.log('Response from api', val);
    //     }
    //   })
    // );
  }
}
