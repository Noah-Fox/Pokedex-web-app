import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    this.displayPoke = PokeService.displayPoke;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.subscriptor.unsubscribe();
  }

  //Called when a pokemon is selected
  selectPoke(val: number){
    this.PokeService.setPokemon(this.displayPoke[val].id-1);
  }

  //called when low-to-high or high-to-low radio button is selected in Sort By menu
  setSortIncreasing(selection: string): void{
    if (selection == '0' && this.PokeService.sortIncreasing){
      this.PokeService.sortIncreasing = false;
      this.orderBy(this.PokeService.sortingBy);
    }
    else if (selection == '1' && !this.PokeService.sortIncreasing){
      this.PokeService.sortIncreasing = true;
      this.orderBy(this.PokeService.sortingBy);
    }
  }

  //Changes order of displayPoke
  orderBy(attr:string): void{
    this.PokeService.sortingBy = attr;
    let sortElements = (e1:any,e2:any) => e1[attr] > e2[attr];
    if (!this.PokeService.sortIncreasing){
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

  //called when an option in filter menu is selected
  openCheckboxDialog(): void{
    const checkboxDialogRef = this.dialog.open(
      CheckboxDialogComponent,
      {data: {typesForm: this.PokeService.typesForm, typesList: this.typesList}}
    );
    checkboxDialogRef.afterClosed().subscribe((data: FormGroup) => {
      this.PokeService.typesForm = data;
      this.filterList();
    });
  }

  //filters list by criteria in filter menu forms
  filterList(){
    this.PokeService.filterList();
    this.displayPoke = this.PokeService.displayPoke;
    this.orderBy(this.PokeService.sortingBy);
  }

  //Called in HTML to access value of sortingBy
  sortingByValue():string{
    return this.PokeService.sortingBy;
  }

}
