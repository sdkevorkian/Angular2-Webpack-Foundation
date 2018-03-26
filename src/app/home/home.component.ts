import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../admin/adminShared/user.service';
import { Blog } from '../admin/adminShared/blog';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    blogPosts: Blog[];
    constructor(private userSVC: UserService, private router: Router) {
        // by adding UserSVC firebase is initialized (within constructor)
    }

    ngOnInit() {
        this.getPosts();
    }
    getPosts() { //could try moving this onto blog service and returning all posts
        let dbRef = firebase.database().ref('blogPosts/');
        dbRef.once('value') //once is a listener and responds to value
            .then((snapshot) => {
                let temp: string[] = snapshot.val();
                this.blogPosts = Object.keys(temp).map(key => temp[key]);
            })
    }

    choosePost(post: Blog) {
        this.router.navigate(['/post/' + post.id]);
    }
}