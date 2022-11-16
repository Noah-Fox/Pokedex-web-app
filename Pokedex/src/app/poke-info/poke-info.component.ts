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

  showTraits = false;
  showTypes = false;
  showStats = false;
  showEvolutions = false;
  showAbilities = false;

  statsList: string[] = [];
  evolutionsList: any[] = [];
  pokeList: any[] = [];

  imageName: string = "front_default";

  constructor(private PokeService: PokeDataService) { 
    this.displayPokemon = PokeService.pokeList[PokeService.currentPoke];
    this.maxNum = PokeService.loadAmount;
    this.statsList = PokeService.statsList;
    this.evolutionsList = PokeService.currentEvolutions;
    this.pokeList = PokeService.pokeList;
  }

  ngOnInit(): void {
  }

  changePoke(val: number){
    if (this.displayPokemon.name != "null" && this.displayPokemon.id + val > 0 && this.displayPokemon.id + val <= this.maxNum){
      this.PokeService.setPokemon(this.displayPokemon.id - 1 + val);
      this.displayPokemon = this.PokeService.pokeList[this.PokeService.currentPoke];
      this.evolutionsList = this.PokeService.currentEvolutions;
    }
  }

  evolveTo(val: number){
    this.PokeService.setPokemon(val-1);
    this.displayPokemon = this.PokeService.pokeList[this.PokeService.currentPoke];
    this.evolutionsList = this.PokeService.currentEvolutions;
  }

  testClick(){
    console.log("click");
  }

  flipImage(){
    if (this.imageName == "front_default"){
      this.imageName = "back_default";
    }
    else{
      this.imageName = "front_default";
    }
  }

  capFirst(word:string, makeSpaces:boolean=true):string{
    if (word == null){
      return "";
    }
    if (makeSpaces){
      for (let i = 0; i < word.length; i ++){
        if (word[i] == "-" || word[i] == "_"){
          word = word.slice(0,i) + " " + word.slice(i+1,word.length);
        }
      }
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
