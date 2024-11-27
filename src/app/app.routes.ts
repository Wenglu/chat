import { Routes } from '@angular/router';
import { AuthContainerComponent } from './components/authorization-container/auth-container/auth-container.component';
import { LoginContainerComponent } from './components/authorization-container/auth-container/login-container/login-container/login-container.component';
import { MainContainerAppComponent } from './components/main-container-app/main-container-app.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => 
            import('./components/authorization-container/auth-container/auth-container.component')
                .then((m) => m.AuthContainerComponent)
        
    },
    {
        path: 'Login',
        loadComponent: () => 
            import('./components/authorization-container/auth-container/login-container/login-container/login-container.component')
                .then((m) => m.LoginContainerComponent)
    },
    {
        path: 'MessageContainer',
        loadComponent: () => 
            import('./components/main-container-app/main-container-app.component')
                .then((m) => m.MainContainerAppComponent)
        }
];
