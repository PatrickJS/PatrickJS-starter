import { Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'card-animated',
  providers: [],
  styleUrls: [ 'card-animated.component.scss' ],
  templateUrl: 'card-animated.component.html',
  encapsulation: ViewEncapsulation.None
})

export class CardAnimatedComponent {
  @Input() title: string;
  counter: number;

  constructor() {}

  ngOnInit() {
    this.counter++;
  }
}
