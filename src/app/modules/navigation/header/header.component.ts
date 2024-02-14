import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {Subscription} from "rxjs";
import {NgClass, NgIf} from "@angular/common";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../../../styles.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  loginStatusSub: Subscription = new Subscription();
  isLoggedIn: boolean = false;

  registered: string = 'hide';
  notRegistered: string = 'show';

  constructor(private userService: UserService, private tokenService: TokenStorageService) {
  }

  ngOnInit() {
    this.loginStatusSub = this.userService.loginState
      .subscribe( (res:boolean) => {
        this.isLoggedIn = res;
        // console.log("is logged in: ", res);
        this.registered = res?'show':'hide';
        this.notRegistered = res?'hide':'show';
      });
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const user = this.tokenService.isLoggedIn()
    if(user) {
      this.isLoggedIn = true;
      this.registered = 'show';//:'hide';
      this.notRegistered = 'hide';//:'show';
    } else {
      this.isLoggedIn = false;
      this.registered = 'hide';
      this.notRegistered = 'show';
    }
  }
  logOut() {
    const user = this.tokenService.getUser();
    // console.log("user: ", user);
    this.userService.logOut();
    this.tokenService.signOut();
    this.isLoggedIn = false;
    // console.log(this.tokenService.getToken());
  }

  ngOnDestroy() {
    this.loginStatusSub.unsubscribe();
  }

}
