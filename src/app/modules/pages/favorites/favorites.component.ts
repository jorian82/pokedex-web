import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgFor, NgIf } from "@angular/common";
import { Pokemon } from "../../../models/model.pokemon";
import { RouterLink } from "@angular/router";
import { PokedexService } from "../../../services/pokedex.service";
import { TokenStorageService } from "../../../services/token-storage.service";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit, OnDestroy{
  searchResult: Pokemon[]=[]
  resultSubs: Subscription = new Subscription();

  constructor(private pokedexService: PokedexService, private tokenService: TokenStorageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    const user = this.tokenService.getUser();
    this.resultSubs = this.pokedexService.getFavorites(user.username)
      .subscribe( (list:Pokemon[]) => {
        this.searchResult = list;
      })
  }

  ngOnDestroy() {
    this.resultSubs.unsubscribe();
  }
}
