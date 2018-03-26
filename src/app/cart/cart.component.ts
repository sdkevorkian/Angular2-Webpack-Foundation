import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
    cart: any[];
    cartTotal: any;

    constructor(private cartSVC: ShoppingCartService, private router: Router) { }
    ngOnInit() {
        this.cartSVC.getCart()
            .then((cart) => {
                this.cart = cart;
                console.log(this.cart);
                this.cartTotal = this.sumCart(this.cart);
            })
            
    }
    sumCart(cart:any) {
        return cart.reduce((total: number, item:any) => total + item.price, 0); // why does this have to be a promise?
    }
    removeCart(id: string) {
        this.cartSVC.removeCart(id); //dont reset the cart??
        this.cartTotal = this.sumCart(this.cart)/*.then(sum => this.cartTotal = sum)*/;
    }
    purchase() {
        alert(`your total is ${this.cartTotal}`);
        this.router.navigate(['/shop']);
    }
    cancel() {
        this.router.navigate(['/shop']);
    }
    clearCart() {
        this.cartSVC.clearCart();
        this.cart = [];
        this.cartTotal = this.sumCart(this.cart);
s    }
}