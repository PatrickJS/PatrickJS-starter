import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExponentialStrengthPipe } from '../../shared/pipes'; // import our pipe here
import { HomeComponent } from './home.component';
import { HomeHeaderComponent } from './home-header'
import { routes } from './home.routes';

@NgModule({
  declarations: [
    HomeComponent,
    ExponentialStrengthPipe,
    HomeHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})

export class HomeModule {
  static routes = routes;
}
