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

  loadAmount: number = 100;

  constructor(private http: HttpClient){
    for (let i = 0; i < this.loadAmount-1; i ++){
      this.pokeList.push({});
    }
    for (let i = 1; i <= this.loadAmount; i ++){
      this.http.get('https://pokeapi.co/api/v2/pokemon/' + i).subscribe(data => {
        this.addToPokeList(data);
      });
    }
    
  }

  addToPokeList(gotData:any){
    this.pokeList[gotData.id-1] = gotData;
  }


  setPokemon(index: number){
    this.currentPoke = index;
  }
}
