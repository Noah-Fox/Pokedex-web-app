import { Component, OnInit } from '@angular/core';

import { PokeDataService } from '../poke-data.service';

@Component({
  selector: 'app-poke-menu',
  templateUrl: './poke-menu.component.html',
  styleUrls: ['./poke-menu.component.css']
})
export class PokeMenuComponent implements OnInit {

  pokeList: any[] = [];
  evList: any[] = [];

  constructor (private PokeService: PokeDataService){
    this.pokeList = PokeService.pokeList;
    this.evList = PokeService.evList;
  }

  ngOnInit(): void {
  }

  selectPoke(val: number){
    this.PokeService.setPokemon(val);
    console.log(this.pokeList[val]);
  }

}
