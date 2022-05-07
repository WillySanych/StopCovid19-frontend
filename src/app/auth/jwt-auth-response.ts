import {User} from "./user";

export class JwtAuthResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
  roles: Set<string>;
}
