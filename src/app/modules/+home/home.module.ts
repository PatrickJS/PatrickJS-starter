import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExponentialStrengthPipe } from '../../shared/pipes'; // import our pipe here
import { HomeComponent } from './components/home/home.component';
import { GridCardsComponent } from './components/gridCards/gridCards.component';
import { FsCustomGridCardsComponent, PizzaDialog } from './components/customGridCards/customGridCards.component';

import { routes } from './home.routes';

// Import material design module
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    HomeComponent,
    ExponentialStrengthPipe,
    GridCardsComponent,
    FsCustomGridCardsComponent,
    PizzaDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ],
  entryComponents : [
    PizzaDialog
  ]
})

export class HomeModule {

  static routes = routes;

}
