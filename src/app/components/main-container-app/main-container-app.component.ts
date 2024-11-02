import { Component } from '@angular/core';
import { MessagesComponent } from '../sidebar/messages/messages/messages.component';
import { SidebarComponent } from '../sidebar/sidebar/sidebar.component';
import { ContainerComponent } from '../sidebar/chats/chat-container/chat-container.component';
@Component({
  selector: 'app-main-container-app',
  standalone: true,
  imports: [MessagesComponent,SidebarComponent,ContainerComponent],
  templateUrl: './main-container-app.component.html',
  styleUrl: './main-container-app.component.scss'
})
export class MainContainerAppComponent {

}
