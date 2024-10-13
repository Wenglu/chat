import { Component } from '@angular/core';
import { UserMessageComponent } from '../../../user-message/user-message.component';
import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [UserMessageComponent,NavbarComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
