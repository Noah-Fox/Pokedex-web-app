import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  pokeList: any[] = [];
  currentPoke: number = 0;

  evList: any[] = [];

  constructor(private http: HttpClient){
    for (let i = 0; i < 99; i ++){
      this.pokeList.push({});
      this.evList.push({});
    }
    for (let i = 1; i < 100; i ++){
      this.http.get('https://pokeapi.co/api/v2/pokemon/' + i).subscribe(data => {
        this.addToPokeList(data);
        //this.pokeList[data.id] = data;
      });
      //this.http.get('https://pokeapi.co/api/v2/evolution-chain/' + i).subscribe(data => this.addToEvList(data));
    }
    
  }

  addToPokeList(gotData:any){
    //this.pokeList.push(gotData);
    this.pokeList[gotData.id] = gotData;
  }

  addToEvList(gotData:any){
    this.evList[gotData.id] = gotData;
  }

  setPokemon(index: number){
    this.currentPoke = index;
  }
}
