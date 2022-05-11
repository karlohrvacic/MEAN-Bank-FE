import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){}

  intercept(request : HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

    const token = this.getToken();

    if (token){
      const copiedReq = request.clone({
        setHeaders: { 'x-access-token': token }
      });

      return next.handle(copiedReq);

    } else {
      return next.handle(request);
    }
  }

  getToken() {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token');
      } else return undefined;
    }
}
