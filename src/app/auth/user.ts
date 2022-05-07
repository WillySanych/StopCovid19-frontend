export class User {
  id: number;
  username: string;
  roles: string[];
  hasAdminRole: boolean;
  hasDoctorRole: boolean;
  hasPatientRole: boolean;
}
