import { Component } from '@angular/core';
import { UserMessageComponent } from '../../../user-message/user-message.component';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../../models/user';
import { AuthContextService } from '../../../../services/auth-context.service';



@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [UserMessageComponent,NavbarComponent,MatIcon,MatInputModule,MatFormFieldModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  clickedUser: User | null = null;

  constructor(private authContextService: AuthContextService) {}

  ngOnInit() {
    this.authContextService.clickedUser$.subscribe((user) => {
      this.clickedUser = user;
    });
  }
}
