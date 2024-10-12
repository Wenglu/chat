import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { SearchBarComponent } from "../../search-bar/search-bar.component";
import { ConversationComponent } from '../../../conversation/conversation.component';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [MatListModule, MatDividerModule, SearchBarComponent,ConversationComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ContainerComponent {
  currentSearchTerm: string = '';
  filteredMessages: any[] = [];

  onSearchTermChange(searchTerm: string) {
    this.currentSearchTerm = searchTerm;
  }

  onSearchResultsChange(results: any[]) {
    this.filteredMessages = results;
  }
}