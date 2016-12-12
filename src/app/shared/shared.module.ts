import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent }   from './header/header.component';
import { FooterComponent }   from './footer/footer.component';

@NgModule({
    imports: [RouterModule],
    exports: [HeaderComponent, FooterComponent], 
    declarations: [HeaderComponent, FooterComponent],
    providers: []
})
export class SharedModule { }
