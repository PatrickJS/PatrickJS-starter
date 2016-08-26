import { Component } from '@angular/core';

@Component({
  selector: 'alert-demo',
  templateUrl: './alert.template.html'
})
export class Alert {
  public alerts:Array<Object> = [
    {
      type: 'danger',
      msg: 'Oh snap! Change a few things up and try submitting again.'
    },
    {
      type: 'success',
      msg: 'Well done! You successfully read this important alert message.',
      closable: true
    }
  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }

  public addAlert():void {
    this.alerts.push({msg: 'Another alert!', type: 'warning', closable: true});
  }
}
