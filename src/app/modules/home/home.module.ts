import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExponentialStrengthPipe } from '../../shared/pipes'; // import our pipe here
import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from './home-header';
import { routes } from './home.routes';

// Import material design module
import { MaterialModule } from '@angular/material';

@NgModule({
  declarations: [
    HomeComponent,
    ExponentialStrengthPipe,
    HomeHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ]
})

export class HomeModule {
  static routes = routes;
}
