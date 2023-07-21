import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}

  //1st parameter: request we are intercepting
  //2nd parameter: gives way to journey of executing requests
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // injecting authService
    const authToken = this.authService.getToken();
    //cannot directly add token because how requests works internally
    //i.e.why we need to clone it
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " +  authToken)
    });
    return next.handle(authRequest);
  }
}
