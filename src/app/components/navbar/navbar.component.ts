import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthContextService } from '../../services/auth-context.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  clickedUser: User | null = null;

  constructor(private authContextService: AuthContextService) {}

  ngOnInit() {
    this.authContextService.clickedUser$.subscribe((user) => {
      this.clickedUser = user;
    });
  }
}
