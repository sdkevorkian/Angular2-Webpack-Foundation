import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';

@Component({
    selector: 'product-menu',
    templateUrl: './product-add.component.html'
})

export class ProductAddComponent {
    imgTitle: string;
    imageSRC: string;
    name: string;
    description: string;
    price: number;
    product: Product;

    constructor(private productAdminSVC: ProductAdminService, private router: Router) { }
    fileLoad($event: any) {
        let myReader: FileReader = new FileReader();
        let file: File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }
    }
    createProduct() {
        this.product = new Product(
            this.name,
            this.description,
            this.imgTitle,
            this.imageSRC.substring(23), //firebase has a problem deleting text that is on the image base64, no null check - revisit after tutorial
            this.price
        );

        this.productAdminSVC.createProduct(this.product);
        alert(`${this.name} added to products`);
        this.router.navigate(['/admin']); //figure out how to reload same page
    }

    cancel() {
        this.router.navigate(['/admin']);
    }
}