import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  pokeList: any[] = [];
  displayPoke: any[] = [];

  evolutionList: any[] = [];

  sortIncreasing: boolean = true;
  sortingBy: string[] = ["id"];

  currentPoke: number = 0;
  currentEvolutions: any[] = [];//stores {name, id}

  loadAmount: number = 400;
  loadEvolution: number = 209;

  typesForm = this.fb.group({
    normal: [true],
    fire: [true],
    water: [true],
    grass: [true],
    flying: [true],
    fighting: [true],
    poison: [true],
    electric: [true],
    ground: [true],
    rock: [true],
    psychic: [true],
    ice: [true],
    bug: [true],
    ghost: [true],
    steel: [true],
    dragon: [true],
    dark: [true],
    fairy: [true],
  });

  typesList: string[] = [
    'normal',
    'fire',
    'water',
    'grass',
    'flying',
    'fighting',
    'poison',
    'electric',
    'ground',
    'rock',
    'psychic',
    'ice',
    'bug',
    'ghost',
    'steel',
    'dragon',
    'dark',
    'fairy'
  ];

  traitsForm = this.fb.group({
    id_use: [false],
    id_min: [0],
    id_max: [0],
    weight_use: [false],
    weight_min: [0],
    weight_max: [0],
    height_use: [false],
    height_min: [0],
    height_max: [0],
    base_experience_use: [false],
    base_experience_min: [0],
    base_experience_max: [0],
  })

  traitsList = [
    "id",
    "weight",
    "height",
    "base_experience",
  ];

  statsForm = this.fb.group({});

  statsList = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    ){
    for (let i = 0; i < this.loadAmount-1; i ++){
      this.pokeList.push({});
      this.displayPoke.push({});
    }
    for (let i = 1; i <= this.loadAmount; i ++){
      this.http.get('https://pokeapi.co/api/v2/pokemon/' + i).subscribe(data => {
        this.addToPokeList(data);
      });
    }

    for (let i = 1; i <= this.loadEvolution; i ++){
      this.http.get('https://pokeapi.co/api/v2/evolution-chain/' + i).subscribe(data => {
        this.addToEvolutionList(data);
      })
    }

    /*this.http.get('https://pokeapi.co/api/v2/evolution-chain/1/').subscribe(data => {
      console.log(data);
    })*/
    
    for (let i = 0; i < this.traitsList.length; i ++){
      this.traitsForm.get(this.traitsList[i] + "_min")?.disable();
      this.traitsForm.get(this.traitsList[i] + "_max")?.disable();
    }

    for (let i = 0; i < this.statsList.length; i ++){
      this.statsForm.addControl(this.statsList[i] + "_use", new FormControl(false));
      this.statsForm.addControl(this.statsList[i] + "_min", new FormControl(0));
      this.statsForm.addControl(this.statsList[i] + "_max", new FormControl(0));
      this.statsForm.get(this.statsList[i] + "_min")?.disable();
      this.statsForm.get(this.statsList[i] + "_max")?.disable();
    }
  }

  addToPokeList(gotData:any){
    this.pokeList[gotData.id-1] = gotData;
    this.displayPoke[gotData.id-1] = gotData;
  }

  addToEvolutionList(gotData:any){
    this.evolutionList[gotData.id-1] = gotData;
  }


  setPokemon(index: number){
    this.currentPoke = index;

    //get list of names and id's of every pokemon current pokemon evolves to
    this.currentEvolutions = [];
    //search through evolutionList for current pokemon
    for (let i = 0; i < this.evolutionList.length; i ++){
      //if the current pokemon is a baby and in current element, get evolutions and return
      if (this.evolutionList[i].chain.species.name == this.pokeList[index].name){
        for (let x = 0; x < this.evolutionList[i].chain.evolves_to.length; x ++){
          let gotId = this.getLinkId(this.evolutionList[i].chain.evolves_to[x].species.url);
          if (gotId < this.loadAmount){
            this.currentEvolutions.push({
              name: this.evolutionList[i].chain.evolves_to[x].species.name,
              id: gotId,
            });
          }
        }
        return;
      }
      let gotEvolutions = this.searchEvolutions(this.pokeList[index].name,this.evolutionList[i].chain.evolves_to);
      if (gotEvolutions.length > 0){
        this.currentEvolutions = gotEvolutions;
        return;
      }
    }
    
  }

  //give name of pokemon and evolutionList[i].chain.evolves_to
  searchEvolutions(searchName: string, evolves_to: any[]): any[]{
    if (evolves_to.length == 0){
      return [];
    }
    for (let i = 0; i < evolves_to.length; i ++){
      //check if pokemon is one that gets evolved to
      if (evolves_to[i].species.name == searchName){
        let gotEvolutions = [];
        for (let x = 0; x < evolves_to[i].evolves_to.length; x ++){
          let gotId = this.getLinkId(evolves_to[i].evolves_to[x].species.url);
          if (gotId < this.loadAmount){
            gotEvolutions.push({
              name: evolves_to[i].evolves_to[x].species.name,
              id: gotId,
            });
          }
        }
        return gotEvolutions;
      }
      //recurse to each of the next levels of evolution
      let gotEvolutions = [];
      for (let x = 0; x < evolves_to[i].evolves_to.length; x ++){
        gotEvolutions = this.searchEvolutions(searchName,evolves_to[i].evolves_to[x]);
        if (gotEvolutions.length != 0){
          return gotEvolutions;
        }
      }
    }

    return [];
  }

  getLinkId(link: string):number{
    let end = link.length;
    if (link[link.length-1] == "/"){
      end --;
    }
    let lastSlash = 0;
    for (let i = 0; i < end; i ++){
      if (link[i] == "/"){
        lastSlash = i;
      }
    }

    let value = 0;
    for (let i = lastSlash+1; i < end; i ++){
      value = value*10 + +link[i];
    }
    
    return value;
  }

  filterList(){
    this.displayPoke = this.pokeList.slice();
    //go through every pokemon
    for (let i = this.displayPoke.length-1; i >= 0; i --){
      //determine if it has a type selected in typesForm
      let hasChosenType = false;
      //go through every type
      for (let x = 0; x < this.typesList.length; x ++){
        //check if the type is selected to be displayed
        if (this.typesForm.get(this.typesList[x])?.value){
          //go through every type that the selected pokemon has
          for (let a = 0; a < this.displayPoke[i].types.length; a ++){
            if (this.displayPoke[i].types[a].type.name == this.typesList[x]){
              hasChosenType = true;
            }
          }
        }
      }

      //determine if it has traits selected in traitsForm
      let inTraitsRanges = true;
      //go through traits
      for (let x = 0; x < this.traitsList.length; x ++){
        //if formControl is enabled and trait falls in range
        if (
          this.traitsForm.get(this.traitsList[x] + "_use")?.value
          && (this.displayPoke[i][this.traitsList[x]] < this.traitsForm.get(this.traitsList[x] + "_min")?.value
          || this.displayPoke[i][this.traitsList[x]] >= this.traitsForm.get(this.traitsList[x] + "_max")?.value)
          ){
            inTraitsRanges = false;
          }
      }

      //determine if it has stats selected in statsForm
      let inStatsRanges = true;
      //go through stats
      for (let x = 0; x < this.statsList.length; x ++){
        //if formControl is enabled and stat falls in range
        if (
          this.statsForm.get(this.statsList[x] + "_use")?.value
          && (this.displayPoke[i].stats[x].base_stat < this.statsForm.get(this.statsList[x] + "_min")?.value
          || this.displayPoke[i].stats[x].base_stat >= this.statsForm.get(this.statsList[x] + "_max")?.value)
          ){
            inStatsRanges = false;
          }
      }

      if (!hasChosenType || !inTraitsRanges || !inStatsRanges){
        this.displayPoke.splice(i,1);
      }
    }
  }

}
