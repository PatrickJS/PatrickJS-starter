import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Import material design module
import { MaterialModule } from '@angular/material';
import { ShellComponent } from './shell.component';
import { routes } from './shell.routes';

@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MaterialModule.forRoot(),
  ]
})

export class ShellModule {
  
}
