import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import * as data from '../../assests/messages.json';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    MatListModule,
    HttpClientModule,  // Add this
    CommonModule       // Recommended for common directives
  ],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss'
})
export class ConversationComponent {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private http = inject(HttpClient);
  messages: any[] = [];

  constructor() {
    console.log(data);
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (response) => {
        this.messages = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
}