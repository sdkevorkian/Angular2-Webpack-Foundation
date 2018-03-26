import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../home/home.component';
import { ShopComponent } from '../shop/shop.component';
import { ErrorComponent } from '../error/error.component';
import { BlogDetailComponent } from '../blogDetail/blog-detail.component';
import { ProductDetailComponent } from '../productDetail/product-detail.component';
import { CartComponent } from '../cart/cart.component';

import { UserService } from '../admin/adminShared/user.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'cart', component: CartComponent },
            { path: 'post/:id', component: BlogDetailComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'shop', component: ShopComponent },
            { path: '', component: HomeComponent },
            { path: '**', component: ErrorComponent }
        ]),
        CommonModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        BlogDetailComponent,
        ProductDetailComponent,
    ]
})

export class AppRoutingModule {
    constructor(private userSVC: UserService) { //put this here just to init firebase... gotta be a better way

    }

};