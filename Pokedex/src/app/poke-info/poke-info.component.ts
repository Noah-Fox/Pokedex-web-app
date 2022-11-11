import { Component, OnInit } from '@angular/core';

import { PokeDataService } from '../poke-data.service';

@Component({
  selector: 'app-poke-info',
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.css']
})
export class PokeInfoComponent implements OnInit {

  displayPokemon: any;
  maxNum: number = 0;

  constructor(private PokeService: PokeDataService) { 
    this.displayPokemon = PokeService.pokeList[PokeService.currentPoke];
    this.maxNum = PokeService.loadAmount;
  }

  ngOnInit(): void {
  }

  changePoke(val: number){
    this.PokeService.setPokemon(this.displayPokemon.id + val);
    this.displayPokemon = this.PokeService.pokeList[this.PokeService.currentPoke-1];
  }

}
