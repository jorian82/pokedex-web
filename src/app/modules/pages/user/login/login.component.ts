import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {TokenStorageService} from "../../../../services/token-storage.service";
import {Pokemon} from "../../../../models/model.pokemon";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{

  username: string = '';
  password: string = '';
  password2: string = '';
  email: string = '';
  isRegister: boolean = false;

  registerMessage: string = ''
  showRegisterMessage: boolean = false;

  loginSubscribe: Subscription = new Subscription();
  signUpSubs: Subscription = new Subscription();

  constructor(private authService: AuthService, private userService: UserService, private tokenService: TokenStorageService) {
  }

  ngOnInit() {

  }

  toggleForm() {
    this.isRegister = !this.isRegister;
    this.showRegisterMessage = false;
  }

  login() {
    if(this.username && this.password)
    this.loginSubscribe = this.authService.login(this.username, this.password)
      .subscribe({
        next: data => {
          // console.log('login successful ', data);
          this.tokenService.saveToken(data.accessToken);
          this.tokenService.saveUser(data);
          this.authService.updateLoggedUser.next(data.fullName);
          this.userService.setLoginState(true);
          this.resetForm();
          this.reloadPage();
        },
        error: err => {
        }
      });
  }

  registerUser() {
    if(this.password!==this.password2) {
      return;
    }
    if(this.username=='') return;
    if(this.email=='') return;
    this.signUpSubs = this.authService.register(this.username,this.email,this.password)
      .subscribe({
        next: response => {
          this.registerMessage = 'User registered successfully, you can use your credentials to log in';
          this.showRegisterMessage=true;
          this.resetForm();
        },
        error: error => {
          console.log(error);
        }
      })
  }

  resetForm() {
    this.username = '';
    this.password = '';
    this.password2 = '';
    this.email = '';
  }
  ngOnDestroy() {
    this.signUpSubs.unsubscribe();
    this.loginSubscribe.unsubscribe();
  }

  reloadPage(): void {
    window.location.href='/';
  }

}
