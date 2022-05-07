import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../auth/user";
import {RolesPayload} from "./roles-payload";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(this.url + "users/getAllUsers")
  }

  updateRoles(rolesPayload: RolesPayload) {
    return this.httpClient.post(this.url + "users/update-roles", rolesPayload);
  }

}
