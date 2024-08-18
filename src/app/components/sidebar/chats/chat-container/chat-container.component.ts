import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { SearchBarComponent } from "../../search-bar/search-bar.component";

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [MatListModule, MatDividerModule, SearchBarComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.scss'
})
export class ChatContainerComponent {

}
