import {
  Component,
  OnInit
} from '@angular/core';

import { GlobalState } from '../global-state.service';
import { DropdownDirective } from 'ng2-bootstrap/dropdown';

@Component({
  selector: 'planning',
  // styleUrls: [ './planning.component.scss' ],
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {

  constructor(public _state: GlobalState) {
  }

  public ngOnInit() {
    this._state.notifyDataChanged(
      'navbar.title',
      'Planning du jour'
    );
  }

}
