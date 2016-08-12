import { Component } from '@angular/core';
import { TooltipPosition } from '@angular2-material/tooltip/tooltip';


@Component({
  selector: 'tooltip-demo',
  template: require('./tooltip.html'),
  styles: [require('./tooltip.scss')],
})
export class TooltipDemo {
  position: TooltipPosition = 'below';
}
