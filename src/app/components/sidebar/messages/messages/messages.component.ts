import { Component } from '@angular/core';
import { UserMessageComponent } from '../../../user-message/user-message.component';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [UserMessageComponent,NavbarComponent,MatIcon,MatInputModule,MatFormFieldModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
