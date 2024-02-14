import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private cookie: CookieService) { }

  signOut(): void {
    this.cookie.remove(TOKEN_KEY);
    this.cookie.remove(USER_KEY);
  }

  public saveToken(token: string): void {
    this.cookie.remove(TOKEN_KEY);
    this.cookie.set(TOKEN_KEY, token);
  }

  public getToken(): string | null | undefined {
    return this.cookie.get(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    this.cookie.remove(USER_KEY);
    this.cookie.set(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = this.cookie.get(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): any {
    const user = this.cookie.get(USER_KEY);
    if(user) return true;
    return false;
  }

}
