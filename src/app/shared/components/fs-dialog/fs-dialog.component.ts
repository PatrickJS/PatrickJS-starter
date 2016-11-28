import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'fs-dialog',
  providers: [],
  styleUrls: [ 'fs-dialog.component.scss' ],
  templateUrl: 'fs-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FsDialogComponent {
  @Input() title: string;
  counter: number;

  constructor() {}

  ngOnInit() {
    this.counter++;
  }
}
