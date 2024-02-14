import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {map, Observable, Subject} from "rxjs";
import { Role } from "../models/model.rol";
import { NewUser, User } from "../models/model.user";
import { API_URL, httpOptions } from "../helpers/constants";


@Injectable({ providedIn: 'root'})
export class UserService {

  // users: User[] = [];
  onCreated: Subject<string> = new Subject<string>();
  onError: Subject<string> = new Subject<string>();
  _onLoggedOut: Subject<string> = new Subject<string>();
  _loginState: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  verifyGuest() {
    return this.http.get(API_URL + 'user/test/all', httpOptions);
  }

  verifyAccess() {
    return this.http.get(API_URL + 'user/test/user', httpOptions);
  }

  verifyAdmin() {
    return this.http.get(API_URL + 'user/test/admin', httpOptions);
  }

  verifyCreator() {
    return this.http.get(API_URL + 'user/test/creator', httpOptions);
  }

  public get loginState(): Observable<boolean> {
    return this._loginState;
  }

  public setLoginState(value:boolean) {
    this._loginState.next(value)
  }

  public get onLoggedOut(): Observable<string> {
    return this._onLoggedOut;
  }

  createUser( payload: NewUser ) {
    // console.log('payload in service: ', payload);
    return this.http.post<string>(API_URL + 'users', payload, httpOptions)
      .subscribe({
        next: response => {
          // console.log("response from service: ",response)
          this.onCreated.next("User created successfully");
          // console.log("response on user created: ",response);
        },
        error: err => {
          // console.log("Error from service: ",err);
          this.onError.next("Error creating user: "+err);
        }
      })
  }

  fetchById(id: string) {
    return this.http.get<User>(API_URL+'user/'+id, httpOptions)
      .pipe(
        map( response => this.setUser(response))
      );
  }

  setUser(response:any): User {
    let data = JSON.parse(JSON.stringify(response));
    let roles: Role[] = [];
    data.roles.forEach( (rol:any) => roles.push( new Role(rol.name,rol.id) ));
    return new User(data.username, data.fullName, data.email, roles, data.id);
  }

  getProfile(username: string) {
    return this.http.post<User>(API_URL+'user/profile',{ username }, httpOptions)
      .pipe(
        map( response => {
          return this.setUser(response)
        })
      );
  }

  fetchUsers() {
    let users: User[] = [];
    return this.http.get<User[]>(API_URL+'user/all', httpOptions)
      .pipe(
        map( response => {
          let data = JSON.parse(JSON.stringify(response)).data;
          data.forEach( (item: { roles: any[]; username: string; fullName: string; email: string; id: number; }) => {
            let roles: Role[] = [];
            item.roles.forEach( (rol:any) => roles.push(new Role(rol.name, rol.id)));
            users.push(
              new User(item.username, item.fullName, item.email, roles, item.id)
            );
          });
          return users;
        })
      );
  };

  logOut() {
    // console.log('user: ', username);
    // return this.http.post(API_URL + 'auth/signout', { username: username }, httpOptions)
    //   .pipe(
    //     map( response => {
          this._loginState.next(false);
          this._onLoggedOut.next("logged out successfully");
  //         return JSON.parse(JSON.stringify(response))
  //       })
  //     )
  }
}
