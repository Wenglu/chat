import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { RouterLink,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthContextService } from '../../../../../services/auth-context.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [MatInputModule,CommonModule,MatFormFieldModule,MatIcon,RouterLink,FormsModule],
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
      this.errorInfo = this.getFirebaseErrorMessage(error.code);
      
    }

  }
  private getFirebaseErrorMessage(code: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/user-not-found': 'Nie znaleziono użytkownika z tym adresem email.',
      'auth/wrong-password': 'Wpisano niepoprawne hasło.',
      'auth/invalid-email': 'Podaj poprawny adres email.',
      'auth/missing-password': 'Podaj hasło.',
      'auth/too-many-requests': 'Zbyt wiele prób logowania. Spróbuj później.',
    };

    return errorMessages[code] || 'Wystąpił błąd podczas logowania. Spróbuj ponownie.';
  }
}