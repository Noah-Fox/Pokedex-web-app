import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  pokeList: any[] = [];
  displayPoke: any[] = [];

  sortIncreasing: boolean = true;
  sortingBy: string = "id";

  currentPoke: number = 0;

  loadAmount: number = 300;

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
    
  }

  addToPokeList(gotData:any){
    this.pokeList[gotData.id-1] = gotData;
    this.displayPoke[gotData.id-1] = gotData;
  }


  setPokemon(index: number){
    this.currentPoke = index;
  }

  filterList(){
    this.displayPoke = this.pokeList.slice();
    //go through every pokemon
    for (let i = this.displayPoke.length-1; i >= 0; i --){
      let display = false;
      //go through every type
      for (let x = 0; x < this.typesList.length; x ++){
        let checkValue = this.typesList[x] as keyof typeof this.typesForm.value;
        //check if the type is selected to be displayed
        if (this.typesForm.value[checkValue]){
          //go through every type that the selected pokemon has
          for (let a = 0; a < this.displayPoke[i].types.length; a ++){
            if (this.displayPoke[i].types[a].type.name == checkValue){
              display = true;
            }
          }
        }
      }
      if (!display){
        this.displayPoke.splice(i,1);
      }
    }
    //this.orderBy(this.sortingBy);
  }
}
