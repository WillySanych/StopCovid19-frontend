import {Component, OnInit} from '@angular/core';
import {User} from "../auth/user";
import {AdminService} from "./admin.service";
import {RolesService} from "../service/roles.service";
import {RolesPayload} from "./roles-payload";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  rolesPayload: RolesPayload
  users: Array<User>
  // adminRole = ["ADMIN"]
  // doctorRole = ["DOCTOR"]
  // patientRole = ["PATIENT"]

  constructor(private adminService: AdminService, public roleService: RolesService) {
    this.rolesPayload = {
      username: "",
      roles: []
    }
  }

  ngOnInit(): void {
    this.getAllUsers();
    // console.log(this.users);

    // this.checkRoles()
    // this.users.map((x: {user: any;}) => x.user).map((x: {
    //   roles: Array<any>;
    //   hasAdminRole: boolean;}) => x.hasAdminRole = this.isSelected(x.roles, ["ADMIN"]))
  }

  getAllUsers() {
    this.adminService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.users.forEach(x => x.hasAdminRole = this.isSelected(x.roles, ["ADMIN"]))
        this.users.forEach(x => x.hasDoctorRole = this.isSelected(x.roles, ["DOCTOR"]))
        this.users.forEach(x => x.hasPatientRole = this.isSelected(x.roles, ["PATIENT"]))
        // console.log(this.users);
      })
  }

  isSelected(roles: Array<string>, role: Array<string>): boolean {
    return !!this.roleService.roleMatch(roles, role).length;
  }

  // checkRoles() {
  //   this.users.forEach(x => x.hasAdminRole = this.isSelected(x.roles, ["ADMIN"]))
  //   this.users.forEach(x => x.hasDoctorRole = this.isSelected(x.roles, ["DOCTOR"]))
  //   this.users.forEach(x => x.hasPatientRole = this.isSelected(x.roles, ["PATIENT"]))
  // }

  updateRoles(userId: number) {
    // const username = this.users[userId].username;
    // console.log(username)
    const roles = Array(this.hasAdminRole(userId), this.hasDoctorRole(userId), this.hasPatientRole(userId), "USER").filter(x => x != null);
    console.log(roles);
    this.rolesPayload.username = this.users[userId].username;
    this.rolesPayload.roles = Array(this.hasAdminRole(userId), this.hasDoctorRole(userId), this.hasPatientRole(userId), "USER").filter(x => x != null,)
    this.adminService.updateRoles(this.rolesPayload).subscribe(data => {
      console.log("Roles were updated");
      this.getAllUsers();
    }, error => {
      this.getAllUsers();
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
