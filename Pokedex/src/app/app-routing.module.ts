import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokeMenuComponent } from './poke-menu/poke-menu.component';
import { PokeInfoComponent } from './poke-info/poke-info.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full',
  },
  {path: 'menu', 
    component: PokeMenuComponent
  },
  {path: 'info', 
    component: PokeInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
