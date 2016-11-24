import { Component } from '@angular/core';
import { Feature } from '../../services/features/feature';
import { FeaturesService } from '../../services/features/features.service.ts';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our core.
  providers: [
    FeaturesService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Set our default values
  features: Feature[];
  rowHeight: string = '200px';

  constructor(private featuresService: FeaturesService) {
    console.log('out home');
   }

  ngOnInit() {
    this.features = this.featuresService.getFeatures();
    console.log(this.features);
    console.log('on init home');
  }

}
