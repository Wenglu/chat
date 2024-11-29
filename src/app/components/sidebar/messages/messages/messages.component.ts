import { Component } from '@angular/core';
import { UserMessageComponent } from '../../../user-message/user-message.component';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../../models/user';
import { AuthContextService } from '../../../../services/auth-context.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [UserMessageComponent,FormsModule,CommonModule,NavbarComponent,MatIcon,MatInputModule,MatFormFieldModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  clickedUser: User | null = null;
  messageContent: string = '';

  constructor(private authContextService: AuthContextService) {}

  ngOnInit() {
    this.authContextService.clickedUser$.subscribe((user) => {
      this.clickedUser = user;
    });
  }
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.messageContent.trim() && this.clickedUser) {
      this.authContextService.sendMessage(this.messageContent, this.clickedUser)
        .then(() => {
          this.messageContent = ''; 
        })
        .catch(err => {
          console.error("Error sending message:", err);
          this.messageContent= '';

        });
    }
  }
}
