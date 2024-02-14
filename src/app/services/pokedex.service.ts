import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL, httpOptions} from "../helpers/constants";
import {Catalog, Pokemon} from "../models/model.pokemon";
import {map} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

@Injectable({ providedIn: "root"})
export class PokedexService {

  catalog: Catalog[] = [];
  pokemonList: string[] = [];
  searchRes: Pokemon[] = [];
  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  getCatalog() {
    return this.http.get<Catalog[]>(API_URL+'pokemon/catalog/', httpOptions)
      .pipe(
        map( ( result: any ) => {
          let tmp = result;
          this.pokemonList = tmp.data.map( (item:Catalog) => item.name);
          this.catalog = tmp.data;
          return tmp.data;
        })
      );
  };

  toggleFavorite(username:string, pokemon:string) {
    return this.http.post(API_URL+'pokemon/favorites', {username: username, pokemon: pokemon}, httpOptions)
  }

  checkFav(pokemon: string) {
    let user = this.tokenService.getUser();
    return this.http.get<boolean>(API_URL+`pokemon/favorites/${user.username}/${pokemon}`)
      .pipe(map( (resp: any) => {
        return resp.data.marked;
      }))
  }

  isLoggedIn() {
    let isLogged = this.tokenService.getUser();
    return isLogged != null;


  }

  getDetails(name:string) {
    return this.http.get<string[]>(API_URL+'pokemon/details/'+name)
      .pipe(
        map( (response: any) => {
          const entries = response.data.filter((item: any) => {
            if (item.version.name === 'gold' || item.version.name === 'crystal') {
              return item;
            }
          });
          return entries.map((item: any) => item.flavor_text);
        })
      );
  }

  getFavorites(username:string) {
    return this.http.get<Pokemon[]>(API_URL+`pokemon/favorites/${username}`, httpOptions)
      .pipe(map( (list: any) => {
        console.log(list);
        return list.data.map( (pkm: any) => ({
          name: pkm.name,
          sprite: pkm.sprite.other['official-artwork'].front_default,
          types: pkm.types,
          abilities: pkm.abilities,
          height: pkm.height,
          weight: pkm.weight
        }));
      }));
  }

  getPokemons(q: string) {
    return this.http.get<Pokemon[]>(API_URL+'pokemon/filter/'+q, httpOptions)
      .pipe(
        map( (resp: any) => {
          this.searchRes = resp.data.map( (pkm: any) => ({
            name: pkm.name,
            sprite: pkm.sprite.other['official-artwork'].front_default,
            types: pkm.types,
            abilities: pkm.abilities,
            height: pkm.height,
            weight: pkm.weight
          }));
          return this.searchRes;
        })
      )
  }
}
