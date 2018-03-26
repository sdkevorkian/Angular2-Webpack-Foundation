import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from '../adminShared/blog'; // our utility class

@Injectable()

export class BlogAdminService {
    createPost(post: Blog) {
        let storageRef = firebase.storage().ref(); //reference to DB
        storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64') //creating image path and using image title as the path, would want to add timestamp or something for uniqueness
            .then((snapshot) => {
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('blogPosts/');
                let newPost = dbRef.push(); 
                newPost.set({
                    title: post.title,
                    content: post.content,
                    imgTitle: post.imgTitle,
                    img: url,
                    id: newPost.key
                });
            })
            .catch((error) => {
                alert(`failed upload: ${error}`); //only for failure of image upload
            })
    }

    editPost(update: Blog) {
        let dbRef = firebase.database().ref('blogPosts/').child(update.id) //why is this stored in a variable?
            .update({
                title: update.title,
                content: update.content
            });
        console.log(dbRef);
        alert('post updated!');
    }

    removePost(deletePost: Blog) {
        let dbRef = firebase.database().ref('blogPosts/').child(deletePost.id).remove();
        alert('post deleted');
        let imageRef = firebase.storage().ref().child(`images/${deletePost.imgTitle}`)
            .delete()
            .then(function () {
                alert(`${deletePost.imgTitle} was deleted`);
            })
            .catch(function (error) {
                alert(`Error- could not delete ${deletePost.imgTitle}`);
            })
    }
}