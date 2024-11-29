import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthContextService } from '../../services/auth-context.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.scss'
})
export class UserMessageComponent {
  clickedUser: User | null = null;
  currentUser:User| null = null;
  messages:any[]=[]

  constructor(private authContextService: AuthContextService) {}

  ngOnInit() {
    this.authContextService.clickedUser$.subscribe((user) => {
      this.clickedUser = user;
    });
  
    this.authContextService.userCredential$.subscribe((user) => {
      this.currentUser = user; 
    });
  
    this.authContextService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }
}
