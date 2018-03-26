import { Injectable } from '@angular/core';

@Injectable()

export class ShoppingCartService {
    myCart: any[] = [];

    getCart() {
        return Promise.resolve(this.myCart); //used this because template loads before contents of cart returned 
    }

    addProduct(id: string, name: string, price: number) {
        this.myCart.push({ 'id': id, 'name': name, 'price': Number(price) })
        alert(`${name} added to cart`);
    }

    removeCart(searchId: string) {
        let temp = this.myCart.map(x => x.id).indexOf(searchId);
        if (temp > -1) {
            this.myCart.splice(temp, 1);
        }
    }
    clearCart() {
        this.myCart = [];
    }
}