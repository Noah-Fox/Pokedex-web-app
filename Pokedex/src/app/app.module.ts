import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';

import { PokeDataService } from './poke-data.service';
import { PokeMenuComponent } from './poke-menu/poke-menu.component';
import { PokeInfoComponent } from './poke-info/poke-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PokeMenuComponent,
    PokeInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [PokeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
