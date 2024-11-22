import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthContextService } from '../../../../../services/auth-context.service';


@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatIcon,RouterLink,FormsModule],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss'
})
export class LoginContainerComponent {
  constructor(private router: Router, private authService: AuthContextService) {}

  errorInfo: string = '';
  userData = {
    email: '',
    password: '',
  };

  async SignIn(event: Event) {
    event.preventDefault();

    try {
      const user = await this.authService.signIn(this.userData.email, this.userData.password);
      this.router.navigate(['/MessageContainer']);
    } catch (error: any) {
      this.errorInfo = `Something went wrong: ${error.message}`;
      console.error(this.errorInfo);
    }
  }
}