import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../admin/adminShared/product';
import { ShoppingCartService } from '../shared/shopping-cart.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
    singleProd: Product;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private shoppingCartSVC: ShoppingCartService
    ) { }

    ngOnInit() {
        let prodId = this.route.snapshot.params['id'];
        this.getSingle(prodId);
    }

    getSingle(id: string) {
        let dbRef = firebase.database().ref('products');
        dbRef.orderByChild('id')
            .equalTo(id)
            .once('value')
            .then((snapshot) => {
                let temp = snapshot.val();
                let transform = Object.keys(temp).map(key => temp[key]);
                let name = transform[0].name;
                let description = transform[0].description;
                let price = transform[0].price
                let imgTitle = transform[0].imgTitle;
                let img = transform[0].img;
                let id = transform[0].id;
                this.singleProd = new Product(name, description, imgTitle, img, price, id);
            })
    }
    addProduct(id: string, name: string, price: number) {
        this.shoppingCartSVC.addProduct(id, name, price);
    }
}