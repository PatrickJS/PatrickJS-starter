// Angular 2
import {bootstrap} from 'angular2/angular2';
import {Component, View, Pipe} from 'angular2/angular2';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe {

  transform(txt: string): any {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  }

}


@Component({
  selector: 'app'
})
@View({
  pipes: [ CapitalizePipe ],
  template: `
  <div>
    <p>{{ value | capitalize }}</p>
    <p>{{ date  | date:'mediumDate' }}</p>
    <p>{{ grade | percent:'.2' }}</p>
  </div>
  `
})
class App {
  value: string = 'angular';
  date:  Date   = new Date();
  grade: number = 0.99;
}



bootstrap(App);



