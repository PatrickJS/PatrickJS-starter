/* This module is an example how you can package all services and components
 from Angular2-Material into one Angular2 module, which you can import in other modules
 */
import { NgModule, ModuleWithProviders }      from '@angular/core';

import { MdButtonModule }                     from '@angular2-material/button';
import { MdButtonToggleModule }               from '@angular2-material/button-toggle';
import { MdCardModule }                       from '@angular2-material/card';
import { MdCheckboxModule }                   from '@angular2-material/checkbox';
import { MdGridListModule }                   from '@angular2-material/grid-list';
import { MdIconModule }                       from '@angular2-material/icon';
import { MdInputModule }                      from '@angular2-material/input';
import { MdListModule }                       from '@angular2-material/list';
import { MdMenuModule }                       from '@angular2-material/menu';
import { MdProgressBarModule }                from '@angular2-material/progress-bar';
import { MdProgressCircleModule }             from '@angular2-material/progress-circle';
import { MdRadioModule }                      from '@angular2-material/radio';
import { MdSidenavModule }                    from '@angular2-material/sidenav';
import { MdSliderModule }                     from '@angular2-material/slider';
import { MdSlideToggleModule }                from '@angular2-material/slide-toggle';
import { MdTabsModule }                       from '@angular2-material/tabs';
import { MdToolbarModule }                    from '@angular2-material/toolbar';
import { MdTooltipModule }                    from '@angular2-material/tooltip';

@NgModule({

    exports: [
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdProgressBarModule,
        MdProgressCircleModule,
        MdRadioModule,
        MdSidenavModule,
        MdSliderModule,
        MdSlideToggleModule,
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule
    ]
})

export class MdModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MdModule
        };
    }
}

