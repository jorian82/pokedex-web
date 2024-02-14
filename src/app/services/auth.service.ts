import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, Subject} from 'rxjs';
import { API_URL, httpOptions } from '../helpers/constants';
import {TokenStorageService} from "./token-storage.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  updateLoggedUser: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private userService: UserService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'auth/signin', {
      username,
      password
    }, httpOptions)
      .pipe(map( (user =>  user )));
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'auth/signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  refreshToken( refreshToken: string ): Observable<any> {
    return this.http.post(API_URL + 'auth/refreshtoken', {
      refreshToken
    }, httpOptions);
  }
}
