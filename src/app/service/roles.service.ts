import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private authService: AuthService) {
  }

  roleMatch(allowedRoles: string[], userRoles: string[]): string[] {
    return allowedRoles.filter((val1) => {
      return userRoles.find((val2) => val1 === val2);
    });
  }

  hasAdminRole(): boolean {
    if (this.authService.getRoles()) {
      return this.authService.getRoles().includes("ADMIN");
    } else {
      return false;
    }
  }

  hasDoctorRole(): boolean {
    if (this.authService.getRoles()) {
      return this.authService.getRoles().includes("DOCTOR");
    } else {
      return false;
    }
  }

  hasPatientRole(): boolean {
    if (this.authService.getRoles()) {
      return this.authService.getRoles().includes("PATIENT");
    } else {
      return false;
    }
  }
}
