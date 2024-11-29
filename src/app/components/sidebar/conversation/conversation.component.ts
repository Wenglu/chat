import { Component, inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ConversationsService } from '../../../services/conversations.service';
import { AuthContextService } from '../../../services/auth-context.service';
import { User } from '../../../models/user';


@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
  ],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnChanges {
  @Input() searchTerm: string = '';
  @Input() filteredMessages: User[] = [];
  defaultAvatar = 'https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg';
  allMessages: User[] = [];
  conversationData: any[] = [];
  displayedMessages: User[] = [];
  private conversationsService = inject(ConversationsService);
  private authContextService = inject(AuthContextService);

  ngOnInit() {
    this.loadMessages();

    this.authContextService.userCredential$.subscribe(user => {
      if (user) {
        this.authContextService.conversationData();
        this.authContextService.userChats$.subscribe((data) => {
          this.conversationData = data;
          this.getLastMessage(user);
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filteredMessages']) {
      this.displayedMessages = this.filteredMessages;
    }
  }

  loadMessages() {
    this.conversationsService.getMessages().subscribe({
      next: (messages) => {
        this.allMessages = messages;
        this.displayedMessages = this.filteredMessages.length > 0
          ? this.filteredMessages
          : messages;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  getFormattedTime(date: any): string {
    const timestamp = date instanceof Date ? date : new Date(date.seconds * 1000); // Assuming timestamp is in Firestore format
    const hours = timestamp.getHours().toString().padStart(2, '0'); // Add leading zero if necessary
    const minutes = timestamp.getMinutes().toString().padStart(2, '0'); // Add leading zero if necessary
    return `${hours}:${minutes}`;
  }

  onUserClick(user: User) {
    this.authContextService.chatCreating(user);
    this.authContextService.getMessages(user);
  }

  getLastMessage(user: User): string {
    const conversation = this.conversationData.find(data => user.uid.includes(data.uid));
        return conversation ? conversation.lastMessage || 'No messages yet' : 'No messages yet';
  }
  getDate(user: User): string {
    const conversation = this.conversationData.find(data => user.uid.includes(data.uid));
    if (conversation && conversation.date) {
      const formattedDate = new Date(conversation.date);
      const hours = formattedDate.getHours().toString().padStart(2, '0');
      const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    }
      return 'No messages yet';
  }
}
