import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'card-animated',
  providers: [],
  styleUrls: [ 'cardAnimated.component.scss' ],
  templateUrl: 'cardAnimated.component.html',
  encapsulation: ViewEncapsulation.Native,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardAnimatedComponent {
  @Input() title: string;
  counter: number;

  constructor() {}

  ngOnInit() {
    this.counter++;
  }
}
