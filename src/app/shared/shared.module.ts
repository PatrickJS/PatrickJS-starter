import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent }   from './header/header.component';

@NgModule({
    imports: [RouterModule],
    exports: [HeaderComponent],
    declarations: [HeaderComponent],
    providers: []
})
export class SharedModule { }
