import { Role } from './model.rol';

export class User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  roles: Role[];

  public constructor(user: string='', full: string='', email: string='', roles: Role[] = [], id: number=0) {
    this.id = id;
    this.username = user;
    this.fullName = full;
    this.email = email;
    this.roles = roles;
  }

}

export interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}
