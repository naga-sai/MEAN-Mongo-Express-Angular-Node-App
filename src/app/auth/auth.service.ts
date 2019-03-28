import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  $auth = new BehaviorSubject(this.checkLogin());

  constructor(private _http: HttpClient, private _router: Router) {}
  checkLogin() {
    return localStorage.getItem("token") || "";
  }

  login(credentials) {
    console.log("auth login outside");
    console.log(credentials);
    this._http
      .post("http://localhost:3000/api/user/authenticate", credentials)
      .subscribe(
        (data: any) => {
          console.log("auth login inside");
          if (data.isLoggedIn) {
            localStorage.setItem("token", data.token);
            this.$auth.next(this.checkLogin());
            this._router.navigate(["/home"]);
            return true;
          } else {
            alert("Please enter valid details");
            return false;
          }
        },
        err => {
          alert(err.error.err);
        }
      );
  }

  getUsers() {
    return this._http.get("http://localhost:3000/api/user/getAllUsers");
  }
  saveUser(data) {
    return this._http.post("http://localhost:3000/api/user/saveUser", data);
  }

  logout() {
    localStorage.removeItem("token");
    this.$auth.next(this.checkLogin());

    this._router.navigate(["/login"]);
  }
}
