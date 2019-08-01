import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';

import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Injectable()
export class AuthService{
    user: Observable<IUser>;
    logged: boolean;
    
    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
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

    loginGoogle(){
      console.log("Redirecting to Google Login Provider...");
      this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider);
    }

    getLoggedInUser(){
      
    }

    signOut(){
      this.afAuth.auth.signOut();
    }
    
    
}