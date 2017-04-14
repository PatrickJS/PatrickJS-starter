import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'course',  // <course></course>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  // providers: [
  //   Title
  // ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './course.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './course.component.html'
})
export class CourseComponent {
  // Set our default values
  public localState = { value: '' };
  // TypeScript public modifiers
  constructor(
  ) {
    console.log(222)
  }
}
