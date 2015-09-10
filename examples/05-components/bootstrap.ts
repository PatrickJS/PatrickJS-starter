// Angular 2
import {bootstrap} from 'angular2/angular2';
import {
  Component,
  View,
  Directive,
  ElementRef,
  Attribute,
  NgIf,
  NgStyle
} from 'angular2/angular2';

@Directive({
  // using [ ] means selecting attributes
  selector: '[x-large]'
})
class XLarge {
  constructor(element: ElementRef) {
    element.nativeElement.style.fontSize = 'x-large';
  }
}


@Directive({
  // using [ ] means selecting attributes
  selector: '[set-font]'
})
class SetFont {
  constructor(element: ElementRef, @Attribute('set-font') color: string) {
    element.nativeElement.style.color = color;
  }
}


@Component({
  selector: 'app'
})
@View({
  directives: [
    XLarge,
    SetFont,
    NgIf,
    NgStyle
  ],
  template: `
  <span x-large set-font="blue">Hello from AngularClass</span>
  <div *ng-if="true">
    hidden text?
  </div>
  <span [ng-style]=" {'color': 'blue'} ">Hello from AngularClass</span>
  `
})
class App {
  constructor() {
    console.log('Angular App component');
  }
}


bootstrap(App);
