import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConversationsService } from '../../../services/conversations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
  private searchSubject = new Subject<string>();

  constructor(private conversationsService: ConversationsService) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.searchTermChange.emit(searchTerm);
        return this.conversationsService.searchUsers(searchTerm);
      })
    ).subscribe(results => {
      this.searchResults.emit(results);
    });

    // Initial load of all users
    this.conversationsService.getMessages().subscribe(users => {
      this.searchResults.emit(users);
    });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }
}