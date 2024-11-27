import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AuthContextService } from '../../services/auth-context.service';

@Component({
  selector: 'app-user-message',
  standalone: true,
  imports: [],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.scss'
})
export class UserMessageComponent {
  clickedUser: User | null = null;
  currentUser:User| null = null;

  constructor(private authContextService: AuthContextService) {}

  ngOnInit() {
    this.authContextService.clickedUser$.subscribe((user) => {
      this.clickedUser = user;
    });
    this.authContextService.userCredential$.subscribe((user) =>{
      this.currentUser = user
    })
  }
}
