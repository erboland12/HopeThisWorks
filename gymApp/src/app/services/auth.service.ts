import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';

import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { AlertController, NavController } from '@ionic/angular';
import { User } from './database.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService{
    userRef: AngularFirestoreCollection<IUser>;
    user: Observable<IUser>;
    user$: Observable<IUser[]>;
    logged: boolean = false;
    emailNull: boolean = false;
    passwordNull: boolean = false;

    uname: string;
    fname: string;
    lname: string;
    age: string;
    location: string;
    bio: string;

   
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private db: AngularFireDatabase,
        private firestore: AngularFirestore,
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

          this.userRef = this.afs.collection('users');
          this.user$ = this.userRef.valueChanges();
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
          this.logged = true;
          this.navCtrl.navigateForward('home');
        }).catch(err => {
          console.log("Error")
          let alert = this.alertCtrl.create({
            subHeader: 'Invalid Credentials',
            message: 'Try Again',
            buttons: ['OK']
          }).then(alert => alert.present());
        })
        
    }

    loginGoogle(){
      var provider = new auth.GoogleAuthProvider;
      console.log("Redirecting to Google Login Provider...");
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider)
      .then(cred => {
        return this.afs.collection('users').doc(cred.user.uid).set({
          email: cred.user.email,
          username: cred.user.displayName
        });
      });
      this.navCtrl.navigateForward('home');
      this.logged = true;
    }

    logInFacebook(){
      console.log("Redirecting to Facebook Login Provider...");
      this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider)
      .then(cred => {
        return this.afs.collection('users').doc(cred.user.uid).set({
          email: cred.user.email,
          username: cred.user.displayName
        });
      });
      this.navCtrl.navigateForward('home');
      this.logged = true;
    }

    getLoggedInUser(){
      return this.afAuth.authState;
    }

    signOut(){
      this.logged = false;
      this.afAuth.auth.signOut();
    }

    registerUser(email, password, firstName, lastName, username){
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
          return this.afs.collection('users').doc(cred.user.uid).set({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            username: username
          });
        });
    }

    updateUser(username, firstName, lastName, age, location, bio){
      this.afAuth.auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          this.afs.collection('users').doc(firebaseUser.uid).set({
            username: username,
            firstName: firstName,
            lastName: lastName,
            age: age,
            location: location,
            bio: bio
          })
          this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.uname = doc.data().username;
              this.fname = doc.data().firstName;
              this.lname = doc.data().lastName;
              this.age = doc.data().age;
              this.location = doc.data().location;
              this.bio = doc.data().bio;
            })
        }
      })
    }

    loggedCheck(){
      this.afAuth.auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              console.log(doc.data().username);
              this.uname = doc.data().username;
            })

        } else {
          console.log("Not logged in")
        }
      });
    }


    
    
}