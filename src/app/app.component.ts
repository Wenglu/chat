import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { ContainerComponent } from "./components/sidebar/chats/chat-container/chat-container.component";
import { ConversationsService } from './services/conversations.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ContainerComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat';

  constructor(conversationsService : ConversationsService){}
}
