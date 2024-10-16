import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatIcon],
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss'
})
export class AuthContainerComponent {

}
