import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from 'ng2-translate';


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
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
  ],
  providers: [TranslateService]
})

export class ShellModule { }
