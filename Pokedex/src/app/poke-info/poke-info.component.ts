import { Component, OnInit } from '@angular/core';

import { PokeDataService } from '../poke-data.service';

@Component({
  selector: 'app-poke-info',
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.css']
})
export class PokeInfoComponent implements OnInit {

  displayPokemon: any;
  evList:any[] = [];


  constructor(private PokeService: PokeDataService) { 
    this.displayPokemon = PokeService.pokeList[PokeService.currentPoke];
    this.evList = PokeService.evList;
  }

  ngOnInit(): void {
  }

}
