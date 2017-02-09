import {
  Component,
  OnInit
} from '@angular/core';

import { GlobalState } from '../global-state.service';
import { DropdownDirective } from 'ng2-bootstrap/dropdown';

@Component({
  selector: 'planning',
  styleUrls: [ './planning.component.scss' ],
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {

  constructor(public _state: GlobalState) {
    this._state.notifyDataChanged('navbar.title',
      'Planning du jour'
    );

  }

  public ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
