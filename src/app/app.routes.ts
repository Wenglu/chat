import { Routes } from '@angular/router';
import { AuthContainerComponent } from './components/authorization-container/auth-container/auth-container.component';
import { LoginContainerComponent } from './components/authorization-container/auth-container/login-container/login-container/login-container.component';
import { MainContainerAppComponent } from './components/main-container-app/main-container-app.component';

export const routes: Routes = [
    {
        path: 'Register',
        component: AuthContainerComponent
    },
    {
        path: 'Login',
        component: LoginContainerComponent
    },
    {
        path: 'MessageContainer',
        component: MainContainerAppComponent,
        }
];
