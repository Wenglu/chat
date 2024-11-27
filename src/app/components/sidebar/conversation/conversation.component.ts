import { Component, inject ,Input,SimpleChanges ,OnChanges} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConversationsService } from '../../../services/conversations.service';
import { AuthContextService } from '../../../services/auth-context.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,
    CommonModule  
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent implements OnChanges {
  @Input() searchTerm: string = '';
  @Input() filteredMessages: User[] = [];

  allMessages: User[] = [];
  displayedMessages: User[] = [];
  private conversationsService = inject(ConversationsService);
  private authContextService = inject(AuthContextService);


  ngOnInit() {
    this.loadMessages();
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
  onUserClick(user: User) {
    this.authContextService.chatCreating(user);
    this.authContextService.getMessages(user);

  }
}