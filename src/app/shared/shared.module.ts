import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent }   from './header/header.component';
import { FooterComponent }   from './footer/footer.component';
import { HeroimageComponent }   from './heroimage/heroimage.component';

@NgModule({
    imports: [RouterModule],
    exports: [HeaderComponent, FooterComponent, HeroimageComponent], 
    declarations: [HeaderComponent, FooterComponent, HeroimageComponent],
    providers: []
})
export class SharedModule { }
