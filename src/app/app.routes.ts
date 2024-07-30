import { Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
    { path: "user-page", component: UserPageComponent, canActivate: [authGuard] },
    { path: "admin-page", component: AdminPageComponent, canActivate: [authGuard, adminGuard] },
    { path: "login", component: LoginComponent },
    { path: "main-page", component: MainPageComponent }
];
