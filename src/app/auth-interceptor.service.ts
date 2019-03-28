import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
  jwtToken;
  constructor(private _authService: AuthService) {}

  intercept(req, next) {
    var authRequest = req.clone({
      headers: new HttpHeaders().set(
        "authToken",
        this._authService.checkLogin()
      )
    });
    return next.handle(authRequest);
  }
}
