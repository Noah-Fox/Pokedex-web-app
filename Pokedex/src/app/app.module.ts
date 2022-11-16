import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';


import { PokeDataService } from './poke-data.service';
import { PokeMenuComponent } from './poke-menu/poke-menu.component';
import { PokeInfoComponent } from './poke-info/poke-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxDialogComponent } from './poke-menu/checkbox-dialog/checkbox-dialog.component';
import { ValueDialogComponent } from './poke-menu/value-dialog/value-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeMenuComponent,
    PokeInfoComponent,
    CheckboxDialogComponent,
    ValueDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
  ],
  providers: [PokeDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
