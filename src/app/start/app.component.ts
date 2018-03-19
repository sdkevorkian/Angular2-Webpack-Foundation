import { Component } from '@angular/core';




@Component({
  selector: 'my-app', // component is 1 of 3 types of directives, selector is where component will be displayed when app starts
  templateUrl: './app.component.html', // file displayed by component
  styleUrls: ['./app.component.css'] // styles for just this component
})
export class AppComponent { }
