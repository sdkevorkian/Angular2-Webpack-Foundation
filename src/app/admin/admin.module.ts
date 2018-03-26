import { NgModule } from '@angular/core'; // provides @NgModule
import { CommonModule } from '@angular/common'; //directives
import { RouterModule, Routes } from '@angular/router'; //route config
import { FormsModule } from '@angular/forms'; //forms

import { AdminComponent } from './adminComponent/admin.component';
import { AdminMenuComponent } from './adminMenu/admin-menu.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/sign-up.component';

import { BlogAdminComponent } from './blogAdmin/blogAdmin.component';
import { BlogAddComponent } from './blogAdd/blog-add.component';

import { ProductAdminComponent } from './productAdmin/product-admin.component';
import { ProductAddComponent } from './productAdd/product-add.component';

import { UserService } from './adminShared/user.service';
import { BlogAdminService } from './adminShared/blog-admin.service';
import { ProductAdminService } from './adminShared/product-admin.service';

import { TruncatePipe } from './adminShared/trunc.pipe';

const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'blog-admin', component: BlogAdminComponent, canActivate: [UserService] },
            { path: 'product-admin', component: ProductAdminComponent, canActivate: [UserService] },
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
        RouterModule,
        TruncatePipe, //access to components not in this module
    ],
    declarations: [
        AdminComponent,
        AdminMenuComponent,
        SignUpComponent,
        LoginComponent,
        BlogAdminComponent,
        BlogAddComponent,
        ProductAdminComponent,
        ProductAddComponent,
        TruncatePipe, // access to components in this module
    ],
    providers: [
        UserService,
        BlogAdminService,
        ProductAdminService
    ]
})

export class AdminModule {}