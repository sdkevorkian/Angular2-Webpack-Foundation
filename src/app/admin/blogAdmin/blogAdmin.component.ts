import { Component, OnInit } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';

@Component({
    templateUrl: './blog-admin.component.html',
    styleUrls: ['./blog-admin.component.css']
})

export class BlogAdminComponent implements OnInit {
    theUser: string;
    menuChoice: string;
    blogPosts: Blog[];

    constructor(
        private userSVC: UserService,
        private router: Router,
        private blogAdminSVC: BlogAdminService
    ) { }
    ngOnInit() {
        this.theUser = this.userSVC.loggedInUser;
        this.getPosts();
    }

    logout() {
        this.userSVC.logout();
        this.router.navigate[''];
    }

    chooseMode(mode: string) {
        this.menuChoice = mode;
    }

    getPosts() {
        let dbRef = firebase.database().ref('blogPosts/');
        dbRef.once('value') //once is a listener and responds to value
            .then((snapshot) => {
                let temp: string[] = snapshot.val();
                console.log(temp);
                console.log('blog admin comp');
                this.blogPosts = Object.keys(temp).map(key => temp[key]);
                console.log(this.blogPosts);
            })
    }

}