import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAdminService } from '../adminShared/blog-admin.service';
import { Blog } from '../adminShared/blog';

@Component({
    selector: 'add-menu',
    templateUrl: './blog-add.component.html',
    //styleUrls: ['./blog-add.component.css']
})

export class BlogAddComponent {
    imgTitle: string;
    imageSRC: string;
    postTitle: string;
    content: string;
    post: Blog;

    constructor(private blogAdminSVC: BlogAdminService, private router: Router) { }
    fileLoad($event: any) {
        let myReader: FileReader = new FileReader();
        let file: File = $event.target.files[0];
        this.imgTitle = file.name;
        myReader.readAsDataURL(file);

        myReader.onload = (e: any) => {
            this.imageSRC = e.target.result;
        }
    }
    createPost() {
        this.post = new Blog(
            this.postTitle,
            this.content,
            this.imgTitle,
            this.imageSRC.substring(23) //firebase has a problem deleting text that is on the image base64, no null check - revisit after tutorial
        );

        this.blogAdminSVC.createPost(this.post);
        alert(`${this.postTitle} added to posts`);
        this.router.navigate(['/admin']); //figure out how to reload same page
    }

    cancel() {
        this.router.navigate(['/admin']);
    }
}