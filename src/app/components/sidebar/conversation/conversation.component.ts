import { Component, inject ,Input,SimpleChanges ,OnChanges} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConversationsService } from '../../../services/conversations.service';

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
  @Input() filteredMessages: any[] = [];

  allMessages: any[] = [];
  displayedMessages: any[] = [];
  private conversationsService = inject(ConversationsService);

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
        this.displayedMessages = messages;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });

    if (this.allMessages.length === 0) {
      this.conversationsService.fetchMessages().subscribe();
    }
  }
}