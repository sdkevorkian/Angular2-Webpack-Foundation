import { Injectable } from '@angular/core'; //can add this service to other components and modules
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import * as firebase from 'firebase';


@Injectable()

export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor(private router: Router) {
     // Initialize Firebase
      var config = {
                apiKey: "AIzaSyCdJXHTXIionJyyoFAf5zy05kmb6y2cqtQ",
                authDomain: "gigabytegames-63afd.firebaseapp.com",
                databaseURL: "https://gigabytegames-63afd.firebaseio.com",
                projectId: "gigabytegames-63afd",
                storageBucket: "gigabytegames-63afd.appspot.com",
                messagingSenderId: "401631707517"
            };
      firebase.initializeApp(config);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false;
    }

    register(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password) //user automatically logged in if account created
            .catch(function (error) {
                alert(`${error.message} Please Try Again!`);
            });
    }

    verifyUser() { //use method when created and logged in
        this.authUser = firebase.auth().currentUser; // only works if someone is logged in
        if (this.authUser) {
            alert(`Welcome ${this.authUser.email}`);
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            this.router.navigate(['/admin']);
        }
    }
    login(loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function (error) {
                alert(`${error.message} Unable to log in, please try again.`)
            });
    }

    logout() {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function () {
            alert(`logged out`);
        }, function (error) {
            alert(`${error.message} Unable to logout, try again...`)
        });
    }
}