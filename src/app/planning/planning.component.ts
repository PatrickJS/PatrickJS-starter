import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';

@Component({
  selector: 'planning',
  styleUrls: [ './planning.component.scss' ],
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {
  constructor(
  ) {
    console.log('Planning ctor');
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
