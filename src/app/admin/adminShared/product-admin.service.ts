import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../adminShared/product'; // our utility class

@Injectable()

export class ProductAdminService {
    createProduct(prod: Product) {
        let storageRef = firebase.storage().ref(); //reference to DB
        storageRef.child(`product_images/${prod.imgTitle}`).putString(prod.img, 'base64') //creating image path and using image title as the path, would want to add timestamp or something for uniqueness
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('products/');
                let newProd = dbRef.push(); 
                newProd.set({
                    name: prod.name,
                    description: prod.description,
                    imgTitle: prod.imgTitle,
                    img: url,
                    price: prod.price,
                    id: newProd.key
                });
            })
            .catch((error) => {
                alert(`failed upload: ${error}`); //only for failure of image upload
            })
    }

    editProduct(update: Product) {
        let dbRef = firebase.database().ref('products/').child(update.id) //why is this stored in a variable?
            .update({
                name: update.name,
                description: update.description,
                price: update.price
            });
        console.log(dbRef);
        alert('prodcut updated!');
    }

    removeProduct(deleteProduct: Product) {
        let dbRef = firebase.database().ref('products/').child(deleteProduct.id).remove();
        alert('product deleted');
        let imageRef = firebase.storage().ref().child(`product_images/${deleteProduct.imgTitle}`)
            .delete()
            .then(function () {
                alert(`${deleteProduct.imgTitle} was deleted`);
            })
            .catch(function (error) {
                alert(`Error- could not delete ${deleteProduct.imgTitle}`);
            })
    }
}