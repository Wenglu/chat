import { Component,OnInit  } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthContextService } from '../../../services/auth-context.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule,MatSidenavModule,MatIconModule,RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userCredential:any

  constructor(private authContextService: AuthContextService){}

  ngOnInit() {
    // Subscribe to userCredential$ to get the latest user credential data
     this.authContextService.userCredential$.subscribe((credential) => {
      this.userCredential = credential;
    });
  }
}
