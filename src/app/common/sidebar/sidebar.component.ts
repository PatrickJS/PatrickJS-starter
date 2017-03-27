import {
  Component
} from '@angular/core';

@Component({
  selector: 'sidebar',
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  public logoUrl = 'assets/img/martinus_logo.png';
  public url = '/';
}
