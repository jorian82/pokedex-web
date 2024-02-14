import { Routes } from '@angular/router';
import { SearchComponent } from "./modules/pages/search/search.component";
import { DetailsComponent } from "./modules/pages/details/details.component";
import { FavoritesComponent } from "./modules/pages/favorites/favorites.component";
import { NotFoundComponent } from "./modules/pages/not-found/not-found.component";
import { LoginComponent } from "./modules/pages/user/login/login.component";
import {AuthGuard} from "./helpers/auth.guard";

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'details/:name', component: DetailsComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];
