import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms';

import { PokeDataService } from '../poke-data.service';
import { CheckboxDialogComponent } from './checkbox-dialog/checkbox-dialog.component';

@Component({
  selector: 'app-poke-menu',
  templateUrl: './poke-menu.component.html',
  styleUrls: ['./poke-menu.component.css']
})
export class PokeMenuComponent implements OnInit, OnDestroy {

  pokeList: any[] = [];
  displayPoke: any[] = [];

  openSideNav = false;

  sortIncreasing: boolean = true;
  sortingBy: string = "id";

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

  private subscriptor = new Subscription();

  constructor (
    private PokeService: PokeDataService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    ){
    this.pokeList = PokeService.pokeList;
    this.displayPoke = this.pokeList;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.subscriptor.unsubscribe();
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

  openCheckboxDialog(): void{
    const checkboxDialogRef = this.dialog.open(
      CheckboxDialogComponent,
      {data: {typesForm: this.typesForm, typesList: this.typesList}}
    );
    checkboxDialogRef.afterClosed().subscribe(() => console.log("closed dialog"));
  }

}
