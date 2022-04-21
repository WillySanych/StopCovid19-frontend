import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterPayload} from "../register-payload";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {LoginPayload} from "../login-payload";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private formBuilder: FormBuilder, private authServive: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      usernameRegister: '',
      emailRegister: '',
      passwordRegister: '',
      confirmPasswordRegister: ''
    });
    this.registerPayload = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.loginForm = this.formBuilder.group( {
      usernameLogin: '',
      passwordLogin: ''
    });
    this.loginPayload = {
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmitRegistration() {
    this.registerPayload.username = this.registerForm.get('usernameRegister')?.value;
    this.registerPayload.email = this.registerForm.get('emailRegister')?.value;
    this.registerPayload.password = this.registerForm.get('passwordRegister')?.value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPasswordRegister')?.value;

    this.authServive.register(this.registerPayload).subscribe(data => {
      console.log("register success");
      this.router.navigateByUrl("/register-success");
    }, error => {
      console.log("register failed");
    });
  }

  onSubmitLogin() {
    this.loginPayload.username = this.loginForm.get('usernameLogin')?.value;
    this.loginPayload.password = this.loginForm.get('passwordLogin')?.value;

    this.authServive.login(this.loginPayload).subscribe( data => {
      if(data) {
        console.log("login success");
        this.router.navigateByUrl("/");
      } else {
        console.log("login failed")
      }
    });
  }
}
