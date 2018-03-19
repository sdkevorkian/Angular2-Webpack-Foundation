import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './start/app.component';
// this is the root module. 

import { NavComponent } from './shared/navbar.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AppRoutingModule } from './shared/app.routing';

import { AdminModule } from './admin/admin.module';

@NgModule({
    imports: [
        BrowserModule, // needed for any web app
        AdminModule, // need to place before, as AppRoutingModule is loaded when no other routes hit
        AppRoutingModule
    ],
    declarations: [
        AppComponent, // tell what components we are using
        NavComponent,
        HomeComponent,
        ErrorComponent
    ],
    bootstrap: [ AppComponent ] //component that launches when app starts, initiated from main.ts
})
export class AppModule { } // lets us make this available to other components
