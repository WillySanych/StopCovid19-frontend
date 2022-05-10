import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPayload} from "../payloads/register-payload";
import {map, Observable, tap, throwError} from "rxjs";
import {LoginPayload} from "../payloads/login-payload";
import {JwtAuthResponse} from "./jwt-auth-response";
import {LocalStorageService} from "ngx-webstorage";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) {
  }

  register(registerPayload: RegisterPayload): Observable<any> {
    return this.httpClient.post(this.url + "api/auth/signup", registerPayload);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(this.url + "api/auth/login", loginPayload)
      .pipe(map(data => {
          this.setAuthenticationToken(data.authenticationToken);
          this.setUsername(data.username);
          this.setRefreshToken(data.refreshToken);
          this.setExpiresAt(data.expiresAt);
          this.setRoles(data.roles);
          return true;
        }
      ));
  }

  logout() {
    this.httpClient.post(this.url + "api/auth/logout", this.refreshToken()).subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error);
    });
    this.localStorageService.clear("authenticationToken");
    this.localStorageService.clear("refreshToken");
    this.localStorageService.clear("username");
    this.localStorageService.clear("expiresAt");
    this.localStorageService.clear("roles");
    this.router.navigateByUrl("/");
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }
    return this.httpClient.post<JwtAuthResponse>(this.url + "api/auth/refresh/token",
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorageService.store("authenticationToken", response.authenticationToken);
        this.localStorageService.store("expiresAt", response.expiresAt);
      }));
  }

  setAuthenticationToken(jwtToken: string) {
    this.localStorageService.store("authenticationToken", jwtToken)
  }

  setUsername(username: string) {
    this.localStorageService.store("username", username);
  }

  setRefreshToken(refreshToken: string) {
    this.localStorageService.store("refreshToken", refreshToken);
  }

  setExpiresAt(expiresAt: Date) {
    this.localStorageService.store("expiresAt", expiresAt);
  }

  setRoles(roles: Set<string>) {
    this.localStorageService.store("roles", roles);
  }

  getRoles() {
    return this.localStorageService.retrieve("roles");
  }

  getJwtToken() {
    return this.localStorageService.retrieve("authenticationToken");
  }

  getRefreshToken() {
    return this.localStorageService.retrieve("refreshToken");
  }

  getUsername() {
    return this.localStorageService.retrieve("username");
  }

  isAuthenticated(): boolean {
    return this.getJwtToken() != null
  }


}
