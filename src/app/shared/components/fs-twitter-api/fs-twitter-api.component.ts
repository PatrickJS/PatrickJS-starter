import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit, NgZone, ApplicationRef} from '@angular/core';
// import { CORE_DIRECTIVES } from '@angular/common';

import { FsTwitterAPIService } from './fs-twitter-api.service.ts';

@Component({
  selector: 'fs-twitter-api',
  providers: [ FsTwitterAPIService ],
  styleUrls: [ 'fs-twitter-api.component.scss' ],
  templateUrl: 'fs-twitter-api.component.html',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class FsTwitterAPIComponent implements OnInit {
  @Input() title: string;
  datatwitter: Array<any>;
  searchString: string = '';

  constructor(private fstwitterapiservice: FsTwitterAPIService, private _ngZone: NgZone, private lc: ApplicationRef) {
    // this.name = 'hola';
  }

  ngOnInit () {
    this.fstwitterapiservice
    .search()
    .subscribe(
      data => {
        this.datatwitter = data.items;
        console.log(data);
    });
  }

  ngOnChanges () {
  }

  openContent () {
    console.log('click sexy!');
  }
}
