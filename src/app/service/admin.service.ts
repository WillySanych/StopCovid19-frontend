import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RolesPayload} from "../admin-panel/roles-payload";
import {PagingPayload} from "../payloads/paging-payload";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(requestAllUsersPayload: PagingPayload): Observable<any> {
    return this.httpClient.get(this.url + `users/getAllUsers?page=${requestAllUsersPayload.page}&size=${requestAllUsersPayload.size}`)
  }

  updateRoles(rolesPayload: RolesPayload) {
    return this.httpClient.post(this.url + "users/update-roles", rolesPayload);
  }

}
