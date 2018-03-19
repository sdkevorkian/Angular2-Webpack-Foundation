import { NgModule } from '@angular/core'; // provides @NgModule
import { CommonModule } from '@angular/common'; //directives
import { RouterModule, Routes } from '@angular/router'; //route config
import { FormsModule } from '@angular/forms'; //forms

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/sign-up.component';

import { UserService } from './adminShared/user.service';

const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignUpComponent },
            { path: '', component: AdminMenuComponent, canActivate: [UserService] } //canActivate is a route guard
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AdminRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        SignUpComponent,
        LoginComponent
    ],
    providers: [
        UserService,
    ]
})

export class AdminModule {}