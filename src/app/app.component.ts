/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef,
  ChangeDetectorRef
} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {AppService} from "./app.service";
import {AbstractRxComponent} from "./code/angular/AbstractRxComponent";

/*
 * App Component
 * Top Level Component
 */
@Component({
             selector     : 'app',
             encapsulation: ViewEncapsulation.None,
             styleUrls    : [
               './app.component.css',
               '../../node_modules/ng2-toastr/ng2-toastr.css',
               '../../node_modules/datatables.net-bs/css/dataTables.bootstrap.css',
               '../assets/css/custom.css',
             ],
             template     : `
    <router-outlet></router-outlet>
  `
           })
export class AppComponent extends AbstractRxComponent implements OnInit {
  
  constructor(public toastr: ToastsManager,
              vcr: ViewContainerRef,
              protected appService: AppService,
              protected changeDetector: ChangeDetectorRef) {
    super();
    // Use with angular v2.2 or above
    this.toastr.setRootViewContainerRef(vcr);
  }
  
  ngOnInit(): void {
    this._subscription['changeDetect'] = this.appService.getChangeDetectorStream().subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }
  
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
