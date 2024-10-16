import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatIcon],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss'
})
export class LoginContainerComponent {

}
