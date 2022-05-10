import {Component, OnInit} from '@angular/core';
import {User} from "../auth/user";
import {AdminService} from "../service/admin.service";
import {RolesService} from "../service/roles.service";
import {RolesPayload} from "./roles-payload";
import {PageEvent} from "@angular/material/paginator";
import {PagingPayload} from "../payloads/paging-payload";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  rolesPayload: RolesPayload;
  users: Array<User>;
  requestAllUsersPayload: PagingPayload;
  totalElements: number = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(private adminService: AdminService, public roleService: RolesService) {
    this.rolesPayload = {
      username: "",
      roles: []
    }
  }

  ngOnInit(): void {
    this.requestAllUsersPayload = {
      page: 0,
      size: 5
    }
    this.getAllUsers(this.requestAllUsersPayload);
  }

  nextPage(event: PageEvent) {
    this.requestAllUsersPayload.page = event.pageIndex;
    this.requestAllUsersPayload.size = event.pageSize;
    this.getAllUsers(this.requestAllUsersPayload);
  }

  getAllUsers(requestAllUsersPayload: PagingPayload) {
    this.adminService.getAllUsers(requestAllUsersPayload)
      .subscribe(res => {
        this.users = res.content;
        this.totalElements = res.totalElements;
        this.users.forEach(x => x.hasAdminRole = this.isSelected(x.roles, ["ADMIN"]))
        this.users.forEach(x => x.hasDoctorRole = this.isSelected(x.roles, ["DOCTOR"]))
        this.users.forEach(x => x.hasPatientRole = this.isSelected(x.roles, ["PATIENT"]))
      })
  }

  isSelected(roles: Array<string>, role: Array<string>): boolean {
    return !!this.roleService.roleMatch(roles, role).length;
  }

  updateRoles(userId: number) {
    const roles = Array(this.hasAdminRole(userId), this.hasDoctorRole(userId), this.hasPatientRole(userId), "USER").filter(x => x != null);
    console.log(roles);
    this.rolesPayload.username = this.users[userId].username;
    this.rolesPayload.roles = Array(this.hasAdminRole(userId), this.hasDoctorRole(userId), this.hasPatientRole(userId), "USER").filter(x => x != null,)
    this.adminService.updateRoles(this.rolesPayload).subscribe(data => {
      console.log("Roles were updated");
      this.getAllUsers(this.requestAllUsersPayload);
    }, error => {
      this.getAllUsers(this.requestAllUsersPayload);
      console.log("Failure response");
    });

  }

  hasAdminRole(userId: number): string | null {
    if (this.users[userId].hasAdminRole) {
      return "ADMIN"
    } else {
      return null
    }
  }

  hasDoctorRole(userId: number): string | null {
    if (this.users[userId].hasDoctorRole) {
      return "DOCTOR"
    } else {
      return null
    }
  }

  hasPatientRole(userId: number): string | null {
    if (this.users[userId].hasPatientRole) {
      return "PATIENT"
    } else {
      return null
    }
  }

}
