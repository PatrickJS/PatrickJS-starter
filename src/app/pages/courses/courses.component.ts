import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'courses',  // <courses></courses>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // providers: [
  //   Title
  // ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './courses.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './courses.component.html'
})
export class CoursesComponent {
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
  ) {}
}
