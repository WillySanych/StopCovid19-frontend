import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, AbstractControl, FormControl, Validators} from "@angular/forms";
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

    this.loginForm = this.formBuilder.group({
      usernameLogin: '',
      passwordLogin: ''
    });
    this.loginPayload = {
      username: '',
      password: ''
    }

  }

  get usernameRegister(): AbstractControl {
    return this.registerForm.get('usernameRegister')!;
  }

  get emailRegister(): AbstractControl {
    return this.registerForm.get('emailRegister')!;
  }

  get passwordRegister(): AbstractControl {
    return this.registerForm.get('passwordRegister')!;
  }

  get confirmPasswordRegister(): AbstractControl {
    return this.registerForm.get('confirmPasswordRegister')!;
  }

  get usernameLogin(): AbstractControl {
    return this.loginForm.get('usernameLogin')!;
  }

  get passwordLogin(): AbstractControl {
    return this.loginForm.get('passwordLogin')!;
  }

  matchingPasswords(control: FormControl) {
    return (control.value === this.registerForm.get('passwordRegister')?.value) ? null : {
      psw: true
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      usernameRegister: new FormControl(null, {validators: Validators.required, updateOn: "submit"}),
      emailRegister: new FormControl(null, {validators: [Validators.required, Validators.email], updateOn: "submit"}),
      passwordRegister: new FormControl(null, {validators: Validators.required, updateOn: "submit"}),
      confirmPasswordRegister: new FormControl(null, {validators: [Validators.required, this.matchingPasswords.bind(this)], updateOn: "submit"})
    });

    this.loginForm = new FormGroup( {
      usernameLogin: new FormControl(null, {validators: Validators.required, updateOn: "submit"}),
      passwordLogin: new FormControl(null, {validators: Validators.required, updateOn: "submit"})
    })
  }

  onSubmitRegistration() {
    if (this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
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
  }

  onSubmitLogin() {
    this.loginPayload.username = this.loginForm.get('usernameLogin')?.value;
    this.loginPayload.password = this.loginForm.get('passwordLogin')?.value;

    this.authServive.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log("login success");
        this.router.navigateByUrl("/");
      } else {
        console.log("login failed")
      }
    });
  }
}
