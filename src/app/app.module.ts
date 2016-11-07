import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
