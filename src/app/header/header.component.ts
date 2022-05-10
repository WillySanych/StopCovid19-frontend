import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {RolesService} from "../service/roles.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public rolesService: RolesService) {
  }

  ngOnInit(): void {
  }

}
