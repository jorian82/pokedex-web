import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokedexService} from "../../../services/pokedex.service";
import {Pokemon} from "../../../models/model.pokemon";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {NgFor, NgIf, NgOptimizedImage} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgFor, RouterLink, NgOptimizedImage, NgIf, FaIconComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css', '../../../../styles.css']
})
export class DetailsComponent implements OnInit, OnDestroy{

  detailSubs: Subscription = new Subscription();
  favoriteSubs: Subscription = new Subscription();
  loggedSubs: Subscription = new Subscription();
  descriptions: string[] = [];
  desc1: string = '';
  desc2: string = '';
  favState: string = 'Add';
  showFav: boolean = false;
  loggedIn: boolean = false;
  pkm: Pokemon = {name:'',sprite:'',types:[],abilities:[],height:0,weight:0};

  constructor( private tokenService: TokenStorageService, private pokedexService: PokedexService,
               private activatedRoute: ActivatedRoute, private userService: UserService) {
    // console.log("list: ",pokedexService.searchRes);
  }

  getDescriptions(name: string) {
    this.detailSubs = this.pokedexService.getDetails(name)
      .subscribe((list: string[]) => {
          this.descriptions = list;
          try {
            this.desc1 = list[0];
            this.desc2 = list[1];
          } catch (error) {}
          // console.log("descriptions: ", this.descriptions);
      });
  }

  isLoggedIn(){
    this.loggedIn = this.tokenService.isLoggedIn();
    console.log(this.loggedIn);
  }

  markFavorite() {
    const user = this.tokenService.getUser();
    this.favoriteSubs = this.pokedexService.toggleFavorite(user.username, this.pkm.name)
      .subscribe( (resp: any) => {
        console.log("response", resp);
        if(resp.data.message.indexOf("added")>0){
          this.favState = 'Remove';
          this.showFav = true;
        } else {
          this.favState = 'Add';
          this.showFav = false;
        }
      })
  }

  isFavorite() {
    this.pokedexService.checkFav(this.pkm.name)
      .subscribe( (response) => {
        this.favState = response?'Remove':'Add';
        this.showFav = !response;
      })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let name = params['name'];
      this.getDescriptions(name);
      try {
        this.pkm = this.pokedexService.searchRes.filter((item: Pokemon) => item.name === name)[0];
      } catch (e) {

      }
      this.isFavorite();
    });

    this.loggedSubs = this.userService.loginState
      .subscribe( resp => {
        this.loggedIn = resp;
      });

    this.isLoggedIn();
  }

  getHeight(height: number) {
    const feet = height/3;
    const inch = (height%3)*3;

    return Math.floor(feet)+' ft '+inch.toFixed(0)+'"';
  }

  getWeight(weight: number) {
    const lbs = weight/4.52
    return lbs.toFixed(1)+' lbs'
  }

  ngOnDestroy() {
    this.detailSubs.unsubscribe();
    this.loggedSubs.unsubscribe();
    this.favoriteSubs.unsubscribe();
  }

  protected readonly faHeart = faHeart;
}
