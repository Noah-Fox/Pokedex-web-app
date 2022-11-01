import { Component, OnInit } from '@angular/core';

import { PokeDataService } from '../poke-data.service';

@Component({
  selector: 'app-poke-menu',
  templateUrl: './poke-menu.component.html',
  styleUrls: ['./poke-menu.component.css']
})
export class PokeMenuComponent implements OnInit {

  pokeList: any[] = [];
  displayPoke: any[] = [];

  openSideNav = false;

  constructor (private PokeService: PokeDataService){
    this.pokeList = PokeService.pokeList;
    this.displayPoke = this.pokeList;
  }

  ngOnInit(): void {
  }

  selectPoke(val: number){
    this.PokeService.setPokemon(val);
  }

  removeOdds(): void{
    for (let i = this.displayPoke.length-1; i >= 0; i --){
      if (i%2 == 0){
        this.displayPoke.splice(i,1);
      }
    }
  }

}
