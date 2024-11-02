import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { ContainerComponent } from "./components/sidebar/chats/chat-container/chat-container.component";
import { ConversationsService } from './services/conversations.service';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './components/sidebar/messages/messages/messages.component';
import { AuthContainerComponent } from './components/authorization-container/auth-container/auth-container.component';
import { LoginContainerComponent } from './components/authorization-container/auth-container/login-container/login-container/login-container.component';
import { MainContainerAppComponent } from './components/main-container-app/main-container-app.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginContainerComponent,AuthContainerComponent,MainContainerAppComponent, SidebarComponent, ContainerComponent,HttpClientModule,MessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat';

  constructor(conversationsService : ConversationsService){}
}
