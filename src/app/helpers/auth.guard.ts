import { inject, Injectable} from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
class AuthGuardCheck {

  constructor(private router: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user = this.tokenService.isLoggedIn();
    if(user) {
      this.userService.verifyAccess().subscribe({
        next: resp => {
          return true;
        },
        error: err => {
          this.tokenService.signOut();
          this.router.navigateByUrl('/').then(r => null);
          this.userService._loginState.next(false);
          return false;
        }
      });
    } else {
      this.tokenService.signOut();
      this.userService._loginState.next(false);
      return false;
    }
    return true;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuardCheck).canActivate(next,state)
}
