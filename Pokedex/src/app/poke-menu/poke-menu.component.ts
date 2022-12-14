import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PokeDataService } from '../poke-data.service';
import { CheckboxDialogComponent } from './checkbox-dialog/checkbox-dialog.component';
import { ValueDialogComponent } from './value-dialog/value-dialog.component';

@Component({
  selector: 'app-poke-menu',
  templateUrl: './poke-menu.component.html',
  styleUrls: ['./poke-menu.component.css']
})
export class PokeMenuComponent implements OnInit, OnDestroy {

  pokeList: any[] = [];
  displayPoke: any[] = [];

  openSideNav = false;

  imageSource = ["sprites","front_default"];
  isDancing = false;

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

  //recursively accesses a value in an object using an array of value strings
  accessValue(object:any, values:string[], valueOn:number = 0):any{
    if (object == null){
      return null;
    }
    if (valueOn >= values.length){
      return object;
    }
    return this.accessValue(object[values[valueOn]],values,valueOn+1);
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
  orderBy(attr:string[]): void{
    this.PokeService.sortingBy = attr;
    let sortElements = (e1:any,e2:any) => this.accessValue(e1,attr) > this.accessValue(e2,attr);
    if (!this.PokeService.sortIncreasing){
      sortElements = (e1:any,e2:any) => this.accessValue(e1,attr) < this.accessValue(e2,attr);
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

  //called when traits option in filter menu is selected
  openTraitsDialog(): void{
    const valueDialogRef = this.dialog.open(
      ValueDialogComponent,
      {data: {
        valuesForm: this.PokeService.traitsForm,
        valuesList: this.PokeService.traitsList,
      }}
    );
    valueDialogRef.afterClosed().subscribe((data: FormGroup) => {
      this.filterList();
    })
  }

  //called when stats option in filter menu is selected
  openStatsDialog(): void{
    const valueDialogRef = this.dialog.open(
      ValueDialogComponent,
      {data: {
        valuesForm: this.PokeService.statsForm,
        valuesList: this.PokeService.statsList,
      }}
    );
    valueDialogRef.afterClosed().subscribe((data: FormGroup) => {
      this.filterList();
    })
  }

  //filters list by criteria in filter menu forms
  filterList(){
    this.PokeService.filterList();
    this.displayPoke = this.PokeService.displayPoke;
    this.orderBy(this.PokeService.sortingBy);
  }

  //Called in HTML to access value of sortingBy
  sortingByValue():string{
    return this.PokeService.sortingBy[this.PokeService.sortingBy.length-1];
  }

  //display the animated images on each card
  toggleDance(){
    if (this.isDancing){
      this.imageSource = ["sprites","front_default"];
      this.isDancing = false;
    }
    else{
      this.imageSource = ["sprites","versions","generation-v","black-white","animated","front_default"];
      this.isDancing = true;
    }
  }

  //capitalize the first letter of a string. if makeSpaces, replace all dashes and underscores with spaces
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
