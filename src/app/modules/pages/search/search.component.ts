import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormsModule } from "@angular/forms";
import { PokedexService } from "../../../services/pokedex.service";
import { Subscription } from "rxjs";
import { Catalog, Pokemon} from "../../../models/model.pokemon";
import { AutocompleteLibModule } from "angular-ng-autocomplete";
import { HttpClientModule } from "@angular/common/http";
import { NgFor } from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    AutocompleteLibModule,
    HttpClientModule,
    NgFor,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../../../styles.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  faSearch = faSearch;

  catalog: Catalog[] = [];
  searchResult: Pokemon[] = [];
  pokemonNames: string[] = [];
  search: string = ''
  result: string = ''

  catalogSubs: Subscription = new Subscription();
  pokemonSubs: Subscription = new Subscription();

  constructor(private pokedexService: PokedexService) {
  }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.catalogSubs = this.pokedexService.getCatalog()
      .subscribe(catalog => {
        this.catalog = catalog.map( (item:any) => ({name: item.name, url: item.url}));
        this.pokemonNames = catalog.map((item: Catalog) => item.name);
        // console.log("catalog: ", this.catalog);
      });
  }

  getPokemons() {
    this.searchResult = [];
    this.pokemonSubs = this.pokedexService.getPokemons(this.search)
      .subscribe( (list: Pokemon[]) => {
        // console.log("Pokemones: ", list);
        this.searchResult = list;
      });
  }

  openDetails(pkm: Pokemon) {

  }

  selectEvent(selected: string) {
    // console.log("onSelect: ", selected)
    this.result = selected;
    this.search = selected;
    this.getPokemons();
  }

  onChangeSearch($event: any) {
    // console.log("onChange: ", $event)
    this.search = $event;
  }

  onFocused($event: void) {
    // console.log("onFocused: ", $event)
  }

  ngOnDestroy() {
    this.catalogSubs.unsubscribe();
  }
}
