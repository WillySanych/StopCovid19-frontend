import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterPayload} from "../../payloads/register-payload";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {LoginPayload} from "../../payloads/login-payload";
import {ToastrService} from "ngx-toastr";
import {MdbTabsComponent} from "mdb-angular-ui-kit/tabs";

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
  @ViewChild("tabsLoginRegister") tabsLoginRegister: MdbTabsComponent

  constructor(private formBuilder: FormBuilder, private authServive: AuthService, private router: Router, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      usernameRegister: '',
      passwordRegister: '',
      confirmPasswordRegister: ''
    });
    this.registerPayload = {
      username: '',
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
      passwordRegister: new FormControl(null, {validators: Validators.required, updateOn: "submit"}),
      confirmPasswordRegister: new FormControl(null, {
        validators: [Validators.required, this.matchingPasswords.bind(this)],
        updateOn: "submit"
      })
    });

    this.loginForm = new FormGroup({
      usernameLogin: new FormControl(null, {validators: Validators.required, updateOn: "submit"}),
      passwordLogin: new FormControl(null, {validators: Validators.required, updateOn: "submit"})
    })
  }

  onSubmitRegistration() {
    if (this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      this.registerPayload.username = this.registerForm.get('usernameRegister')?.value;
      this.registerPayload.password = this.registerForm.get('passwordRegister')?.value;
      this.registerPayload.confirmPassword = this.registerForm.get('confirmPasswordRegister')?.value;

      this.authServive.register(this.registerPayload).subscribe(data => {
        console.log("register success");
        this.tabsLoginRegister.setActiveTab(0);
        this.toastr.success("Регистрация прошла успешно");
      }, error => {
        console.log("register failed");
        this.toastr.error("Пользователь с таким именем уже существует", "Ошибка регистрации")
      });
    }
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.loginPayload.username = this.loginForm.get('usernameLogin')?.value;
      this.loginPayload.password = this.loginForm.get('passwordLogin')?.value;

      this.authServive.login(this.loginPayload).subscribe(data => {
        console.log("login success");
        this.router.navigateByUrl("/");
        this.toastr.success("Авторизация прошла успешно");
      }, error => {
        console.log("login failed");
        this.toastr.error("Проверьте имя пользователя и/или пароль", "Ошибка авторизации");
      });
    }
  }
}
