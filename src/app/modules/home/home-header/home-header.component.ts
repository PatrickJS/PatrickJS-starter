import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'home-header',
  providers: [],
  styleUrls: [ 'home-header.component.scss' ],
  templateUrl: 'home-header.component.html',
  encapsulation: ViewEncapsulation.Native,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeHeaderComponent {
  @Input() title: string;
  counter: number;

  constructor() {}

  ngOnInit() {
    this.counter++;
  }
}
