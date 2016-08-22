import { WidgetRegistry } from "angular2-schema-form";

import { NgModule } from '@angular/core';
import { SimpleForm } from "./simpleform.component";
import { ChartComponent } from "./chart.component";

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ SimpleForm, ChartComponent ],
  declarations: [
    SimpleForm,
    ChartComponent
  ],
  imports: [ WidgetRegistry ],
  providers: [ WidgetRegistry ]
})

export class SimpleFormModule {
}
