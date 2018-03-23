import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Blog } from '../adminShared/blog'; // our utility class

@Injectable()

export class BlogAdminService {
    createPost(post: Blog) {
        let storageRef = firebase.storage().ref(); //reference to DB
        storageRef.child(`images/${post.imgTitle}`).putString(post.img, 'base64') //creating image path and using image title as the path
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
}