import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router : Router) { }

  ngOnInit() {
    this.registerForm = this._fb.group({
      email:["",[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:["",[Validators.required, Validators.minLength(8)]],
      confirmPassword: ["",[Validators.required, Validators.minLength(8)]]
    });
  }

  register(){

    this._auth.saveUser(this.registerForm.value).subscribe(data=>{console.log(data);});
    this._router.navigate(["/login"])
    console.log("Registration Success!");
    
  }

}
