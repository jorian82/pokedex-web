import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { Role } from "../models/model.rol";
import { API_URL, httpOptions } from "../helpers/constants";

@Injectable({ providedIn: 'root'})
export class RoleService {
  // roles: Role[] = [];
  onCreated: Subject<Role> = new Subject<Role>();
  onError: Subject<string> = new Subject<string>();

  constructor( private http: HttpClient) {}

  createRole( rol: Role ) {
    this.http.post<Role>(API_URL+'roles', {name: rol.name}, httpOptions)
      .subscribe({
        next: response => {
          this.onCreated.next(rol);
        },
        error: err => {
          this.onError.next(JSON.parse(JSON.stringify(err)).message);
        }
      });
  }

  fetchRoles() {
    let roles: Role[] = [];
    return this.http.get<Role[]>(API_URL+'roles', httpOptions).pipe(
      map( response => {
        let data = JSON.parse(JSON.stringify(response)).data;
        data.forEach( (item:any ) => {
          roles.push(new Role(item.name, item.id));
        });
        return roles;
      })
    );
  }
}
