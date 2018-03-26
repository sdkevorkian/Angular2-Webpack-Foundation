import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';

@Component({
    templateUrl: './product-admin.component.html',
    styleUrls: ['./product-admin.component.css']
})

export class ProductAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    products: Product[];
    formDisplay: boolean = true; // display list or form
    singleProduct: Product;

    constructor(
        private userSVC: UserService,
        private router: Router,
        private productAdminSVC: ProductAdminService
    ) { }
    ngOnInit() {
        this.theUser = this.userSVC.loggedInUser;
        this.getProducts();
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate[''];
    }

    chooseMode(mode: string) {
        this.menuChoice = mode;
    }

    getProducts() {
        let dbRef = firebase.database().ref('products/');
        dbRef.once('value') //once is a listener and responds to value
            .then((snapshot) => {
                let temp: string[] = snapshot.val();
                this.products = Object.keys(temp).map(key => temp[key]);
            })
    }
    editProduct(theProduct: Product) {
        this.singleProduct = theProduct;
        this.formDisplay = false;
    }

    cancelEdit() {
        this.formDisplay = true;
    }

    updateProduct(single: Product) {
        this.productAdminSVC.editProduct(single);
        this.formDisplay = true;
    }

    deleteProduct(single: Product) {
        let verify = confirm(`are you sure you want to delete the product?`);
        if (verify) {
            this.productAdminSVC.removeProduct(single);
            this.router.navigate(['/admin']);
        } else {
            alert(`it's ok! nothing deleted!`);
        }
    }
}