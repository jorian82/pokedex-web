import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { PokedexService } from "./services/pokedex.service";
import { UserService } from "./services/user.service";
import { RoleService } from "./services/role.service";
import { AuthService } from "./services/auth.service";
import { CookieService } from "./services/cookie.service";
import { LoaderService } from "./services/loader.service";
import { TokenStorageService } from "./services/token-storage.service";
import { provideHttpClient, withInterceptors} from "@angular/common/http";
import { AuthInterceptor } from "./helpers/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideRouter(routes, withHashLocation()),
    PokedexService,
    UserService,
    RoleService,
    AuthService,
    CookieService,
    LoaderService,
    TokenStorageService
  ]
};
