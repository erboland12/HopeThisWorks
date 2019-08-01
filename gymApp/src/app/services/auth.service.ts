import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';

import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { AlertController, NavController } from '@ionic/angular';

@Injectable()
export class AuthService{
    user: Observable<IUser>;
    logged: boolean;
    emailNull: boolean = false;
    passwordNull: boolean = false;
    
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private alertCtrl: AlertController,
        private navCtrl: NavController
      ) {
    
          //// Get auth data, then get firestore user document || null
          this.user = this.afAuth.authState.pipe(
            switchMap(user => {
              if (user) {
                return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges()
              } else {
                return of(null)
              }
            })
          )
        }

    isLoggedIn(){
        return !!this.logged
    }

    loginEmail(email:string, password:string){      
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(data => {
          console.log("Worked");
          let alert = this.alertCtrl.create({
            message: 'Login Successful',
            buttons: ['OK']
          }).then(alert => alert.present());
          this.navCtrl.navigateForward('home');
        }).catch(err => {
          console.log("Error")
          let alert = this.alertCtrl.create({
            subHeader: 'Invalid Credentials',
            message: 'Try Again',
            buttons: ['OK']
          }).then(alert => alert.present());
        })

        console.log(email);
        console.log(password);
    }

    loginGoogle(){
      console.log("Redirecting to Google Login Provider...");
      this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider);
      this.navCtrl.navigateForward('home');
    }

    logInFacebook(){
      console.log("Redirecting to Facebook Login Provider...");
      this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider);
      this.navCtrl.navigateForward('home');
    }

    getLoggedInUser(){
      return this.afAuth.authState;
    }

    signOut(){
      this.afAuth.auth.signOut();
    }

    registerUser(email, password){
      this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }
    
    
}