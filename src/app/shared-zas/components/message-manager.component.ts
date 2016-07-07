/**
 * Created by U80830793 on 18.06.2016.
 */
import {Component, Injectable} from "@angular/core";
import {Message} from "primeng/primeng";

@Component({
  selector: 'zas-messages',
  pipes: [Message],
  template: require('./message-manager.component.html')
})
@Injectable()
export class MessageManagerComponent {

  private messages:Message[] = [];

  setMessage(message:string) {
    this.messages.push(message);
  }
}
