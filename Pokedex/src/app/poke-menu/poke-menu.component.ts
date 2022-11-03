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

  sortIncreasing: boolean = true;
  sortingBy: string = "id";

  constructor (private PokeService: PokeDataService){
    this.pokeList = PokeService.pokeList;
    this.displayPoke = this.pokeList;
  }

  ngOnInit(): void {
  }

  selectPoke(val: number){
    this.PokeService.setPokemon(val);
  }

  setSortIncreasing(selection: string): void{
    if (selection == '0' && this.sortIncreasing){
      this.sortIncreasing = false;
      this.orderBy(this.sortingBy);
    }
    else if (selection == '1' && !this.sortIncreasing){
      this.sortIncreasing = true;
      this.orderBy(this.sortingBy);
    }
  }

  removeOdds(): void{
    for (let i = this.displayPoke.length-1; i >= 0; i --){
      if (i%2 == 0){
        this.displayPoke.splice(i,1);
      }
    }
  }

  orderBy(attr:string): void{
    this.sortingBy = attr;
    let sortElements = (e1:any,e2:any) => e1[attr] > e2[attr];
    if (!this.sortIncreasing){
      sortElements = (e1:any,e2:any) => e1[attr] < e2[attr];
    }
    let checking = true;
    while (checking){
      checking = false;
      for (let i = 0; i < this.displayPoke.length-1; i ++){
        if (sortElements(this.displayPoke[i],this.displayPoke[i+1])){
          checking = true;
          let hold = this.displayPoke[i];
          this.displayPoke[i] = this.displayPoke[i+1];
          this.displayPoke[i+1] = hold;
        }
      }
    }
  }

}
