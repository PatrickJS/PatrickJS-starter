import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit, NgZone, ApplicationRef} from '@angular/core';
// import { CORE_DIRECTIVES } from '@angular/common';

import { FsYoutubeAPIService } from './fs-youtube-api.service.ts';

@Component({
  selector: 'fs-youtube-api',
  providers: [FsYoutubeAPIService],
  styleUrls: [ 'fs-youtube-api.component.scss' ],
  templateUrl: 'fs-youtube-api.component.html',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class FsYoutubeAPIComponent implements OnInit {
  @Input() title: string;
  dataYoutube: Array<any>;
  searchString: string = '';

  constructor(private fsyoutubeapiservice: FsYoutubeAPIService, private _ngZone: NgZone, private lc: ApplicationRef) {
    // this.name = 'hola';
  }

  ngOnInit () {
    this.fsyoutubeapiservice
    .search()
    .subscribe(
      data => {
        this.dataYoutube = data.items;
        console.log(data);
    });
  }

  ngOnChanges () {
  }

  openContent () {
    console.log('click sexy!');
  }
}
