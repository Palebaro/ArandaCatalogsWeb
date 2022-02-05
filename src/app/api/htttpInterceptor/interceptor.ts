import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';
import { catchError, finalize } from "rxjs/operators";

@Injectable()
export class Interceptor implements HttpInterceptor {
    activeRequests: any;
    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
      const httpReq = request.clone({
        url: request.url.replace("http://", "https://")
      });
      return next.handle(httpReq);
    };
}
