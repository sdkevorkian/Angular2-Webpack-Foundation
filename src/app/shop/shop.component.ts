import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../admin/adminShared/user.service';
import { Product } from '../admin/adminShared/product';

@Component({
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
    products: Product[];
    constructor(private userSVC: UserService, private router: Router) {
        // by adding UserSVC firebase is initialized (within constructor)
    }

    ngOnInit() {
        this.getProducts();
    }
    getProducts() { 
        let dbRef = firebase.database().ref('products/');
        dbRef.once('value') //once is a listener and responds to value
            .then((snapshot) => {
                let temp: string[] = snapshot.val();
                this.products = Object.keys(temp).map(key => temp[key]);
            })
    }

    chooseProduct(product: Product) {
        this.router.navigate(['/product', product.id]);
    }
}