import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConversationsService } from '../../../services/conversations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() searchResults = new EventEmitter<any[]>();

  searchTerm: string = '';
  allItems: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(private conversationsService: ConversationsService) {}

  ngOnInit() {
    this.conversationsService.fetchMessages().subscribe();
    
    this.conversationsService.getMessages().subscribe(items => {
      this.allItems = items;
      this.filterItems(this.searchTerm);
    });

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTermChange.emit(searchTerm); // Emit search term to parent
      this.filterItems(searchTerm);
    });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }

  filterItems(searchTerm: string) {
    let filteredItems;
    if (!searchTerm) {
      filteredItems = this.allItems;
    } else {
      searchTerm = searchTerm.toLowerCase();
      filteredItems = this.allItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
    }
    this.searchResults.emit(filteredItems);
  }
}