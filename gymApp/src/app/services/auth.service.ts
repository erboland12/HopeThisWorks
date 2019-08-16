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
import * as firebase from 'firebase';

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}

@Injectable()
export class AuthService{
    
    userRef: AngularFirestoreCollection<IUser>;
    user: Observable<IUser>;
    user$: Observable<IUser[]>;
    logged: boolean = false;
    emailNull: boolean = false;
    passwordNull: boolean = false;
    emailSent: boolean;
    emailReceived: boolean;
    currentEmail: string = 'erboland@uvm.edu';

    uname: string;
    fname: string;
    lname: string;
    age: string;
    location: string;
    bio: string;
    color: string;
    photoURL: string;

    //Unlockable Colors
    red: boolean;
    orange: boolean;
    blue: boolean;
    green: boolean;
    crimson: boolean;
    neonBlue: boolean;
    neonOrange: boolean;
    limeGreen: boolean;
    diamond: boolean;
    platinum: boolean;
    gold: boolean;
    silver: boolean;
    bronze: boolean;


    //Subtraction High Scores
    highScoreSubEasy: number = 0;
    highScoreSubIntermediate: number;
    highScoreSubHard: number;
    highScoreSubWizard: number;

    //Addition High Scores
    highScoreAddEasy: number;
    highScoreAddIntermediate: number;
    highScoreAddHard: number;
    highScoreAddWizard: number;

    //Multiplication High Scores
    highScoreMultEasy: number;
    highScoreMultIntermediate: number;
    highScoreMultHard: number;
    highScoreMultWizard: number;

    //Division High Scores
    highScoreDivEasy: number;
    highScoreDivIntermediate: number;
    highScoreDivHard: number;
    highScoreDivWizard: number;

    //General Stats
    careerQuestions: number;
    careerRights: number;
    careerWrongs: number;
  
    constructor(
        public afAuth: AngularFireAuth,
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

          firebase.auth().onAuthStateChanged((user) => {
            if (user){
              console.log("User is logged")
              this.afs.collection('users').doc(user.uid).get()
            .toPromise().then(doc =>{
              this.uname = doc.data().username;
              this.fname = doc.data().firstName;
              this.lname = doc.data().lastName;
              this.age = doc.data().age;
              this.location = doc.data().location;
              this.bio = doc.data().bio;
              this.color = doc.data().color;
              this.photoURL = doc.data().photoURL;

              this.highScoreSubEasy = doc.data().highScoreSubEasy;
              this.highScoreSubIntermediate = doc.data().highScoreSubIntermediate;
              this.highScoreSubHard = doc.data().highScoreSubHard;
              this.highScoreSubWizard = doc.data().highScoreSubWizard;

              this.highScoreAddEasy = doc.data().highScoreAddEasy;
              this.highScoreAddIntermediate = doc.data().highScoreAddIntermediate;
              this.highScoreAddHard = doc.data().highScoreAddHard;
              this.highScoreAddWizard = doc.data().highScoreAddWizard;

              this.highScoreMultEasy = doc.data().highScoreMultEasy;
              this.highScoreMultIntermediate = doc.data().highScoreMultIntermediate;
              this.highScoreMultHard = doc.data().highScoreMultHard;
              this.highScoreMultWizard = doc.data().highScoreMultWizard;

              this.highScoreDivEasy = doc.data().highScoreDivEasy;
              this.highScoreDivIntermediate = doc.data().highScoreDivIntermediate;
              this.highScoreDivHard = doc.data().highScoreDivHard;
              this.highScoreDivWizard = doc.data().highScoreDivWizard;

              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;

            })
            }
          })
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

    async loginGoogle(){
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.navCtrl.navigateForward('home');
      return this.updateUserGoogle(credential.user);
      
    }

    logInFacebook(){
      this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider);
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
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(cred => {
          return this.afs.collection('users').doc(cred.user.uid).set({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            username: username,

            highScoreSubEasy: 0,
            highScoreSubIntermediate: 0,
            highScoreSubHard: 0,
            highScoreSubWizard: 0,

            highScoreAddEasy: 0,
            highScoreAddIntermediate: 0,
            highScoreAddHard: 0,
            highScoreAddWizard: 0,

            highScoreMultEasy: 0,
            highScoreMultIntermediate: 0,
            highScoreMultHard: 0,
            highScoreMultWizard: 0,

            highScoreDivEasy: 0,
            highScoreDivIntermediate: 0,
            highScoreDivHard: 0,
            highScoreDivWizard: 0,

            careerQuestions: 0,
            careerRights: 0,
            careerWrongs: 0
          });
        });
    }

    updateUser(username, firstName?, lastName?, age?, 
               location?, bio?, color?){
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          this.afs.collection('users').doc(firebaseUser.uid).update({
            username: username,
            firstName: firstName
          })
          if(age != null){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              age: age
            });
          }
          if(location != null){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              location: location
            });
          }
          if(bio != null){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              bio: bio
            });
          }
          if(lastName != null){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              lastName: lastName
            });
          }
          if(color != null){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              color: color
            });
          }
          this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.uname = doc.data().username;
              this.fname = doc.data().firstName;
              this.lname = doc.data().lastName;
              this.age = doc.data().age;
              this.location = doc.data().location;
              this.bio = doc.data().bio;
              this.color = doc.data().color;
            })
        }
      })
    }

    updateUserGoogle(user){
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      const data = { 
        uid: user.uid, 
        username: user.displayName,
        email: user.email

      } 

      return userRef.set(data, { merge: true })

    }

    updateProfileURL(photoURL){
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          if(photoURL == null){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              photoURL: '../../assets/icon/profilePH.png'
            })
          } else{
            this.afs.collection('users').doc(firebaseUser.uid).update({
              photoURL: photoURL
            })
          }
                }
      this.afs.collection('users').doc(firebaseUser.uid).get()
        .toPromise().then(doc => {
          this.photoURL = doc.data().photoURL;
        })
      }) 
    }

    // loggedCheck(){
    //   firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if(firebaseUser){
    //       this.logged = true;
    //       this.afs.collection('users').doc(firebaseUser.uid).get()
    //         .toPromise().then(doc =>{
    //           this.uname = doc.data().username;
    //           this.fname = doc.data().firstName;
    //           this.lname = doc.data().lastName;
    //           this.age = doc.data().age;
    //           this.location = doc.data().location;
    //           this.bio = doc.data().bio;
    //           this.color = doc.data().color;
    //           this.photoURL = doc.data().photoURL;

    //           this.highScoreSubEasy = doc.data().highScoreSubEasy;
    //           this.highScoreSubIntermediate = doc.data().highScoreSubIntermediate;
    //           this.highScoreSubHard = doc.data().highScoreSubHard;
    //           this.highScoreSubWizard = doc.data().highScoreSubWizard;

    //           this.highScoreAddEasy = doc.data().highScoreAddEasy;
    //           this.highScoreAddIntermediate = doc.data().highScoreAddIntermediate;
    //           this.highScoreAddHard = doc.data().highScoreAddHard;
    //           this.highScoreAddWizard = doc.data().highScoreAddWizard;

    //           this.highScoreMultEasy = doc.data().highScoreMultEasy;
    //           this.highScoreMultIntermediate = doc.data().highScoreMultIntermediate;
    //           this.highScoreMultHard = doc.data().highScoreMultHard;
    //           this.highScoreMultWizard = doc.data().highScoreMultWizard;

    //           this.highScoreDivEasy = doc.data().highScoreDivEasy;
    //           this.highScoreDivIntermediate = doc.data().highScoreDivIntermediate;
    //           this.highScoreDivHard = doc.data().highScoreDivHard;
    //           this.highScoreDivWizard = doc.data().highScoreDivWizard;

    //           this.careerQuestions = doc.data().careerQuestions;
    //           this.careerRights = doc.data().careerRights;
    //           this.careerWrongs = doc.data().careerWrongs;

    //         })


    //     } else {
    //       this.logged = false;
    //       console.log("Not logged in")
    //     }
    //   });
    // }

    updateHighScore(mode: string, gameType: string, highScore: number){
      if(mode == null){
        return;
      }
      
      //Easy
      if(mode == "easy"){
        if(gameType == "subtraction" && highScore >= this.highScoreSubEasy){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreSubEasy: highScore
              })
              
              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreSubEasy = doc.data().highScoreSubEasy;
              })
            }
          })
        } else if(gameType == "addition" && highScore >= this.highScoreAddEasy){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreAddEasy: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreAddEasy = doc.data().highScoreAddEasy;
              })
            }
          })
        } else if(gameType == "multiplication" && highScore >= this.highScoreMultEasy){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreMultEasy: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreMultEasy = doc.data().highScoreMultEasy;
              })
            }
          })
        } else if(gameType == "division" && highScore >= this.highScoreDivEasy){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreDivEasy: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreDivEasy = doc.data().highScoreDivEasy;
              })
            }
          })
        }
      }
      //Intermediate
      if(mode == "intermediate"){
        if(gameType == "subtraction" && highScore >= this.highScoreSubIntermediate){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreSubIntermediate: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreSubIntermediate = doc.data().highScoreSubIntermediate;
              })
            }
          })
        } else if(gameType == "addition" && highScore >= this.highScoreAddIntermediate){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreAddIntermediate: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreAddIntermediate = doc.data().highScoreAddIntermediate;
              })
            }
          })
        } else if(gameType == "multiplication" && highScore >= this.highScoreMultIntermediate){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreMultIntermediate: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreMultIntermediate = doc.data().highScoreMultIntermediate;
              })
            }
          })
        } else if(gameType == "division" && highScore >= this.highScoreDivIntermediate){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreDivIntermediate: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreDivIntermediate = doc.data().highScoreDivIntermediate;
              })
            }
          })
        }
      }
      //Hard
      if(mode == "hard" && highScore >= this.highScoreSubHard){
        if(gameType == "subtraction"){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreSubHard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreSubHard = doc.data().highScoreSubHard;
              })
            }
          })
        } else if(gameType == "addition" && highScore >= this.highScoreAddHard){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreAddHard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreAddHard = doc.data().highScoreAddHard;
              })
            }
          })
        } else if(gameType == "multiplication" && highScore >= this.highScoreMultHard){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreMultHard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreMultHard = doc.data().highScoreMultHard;
              })
            }
          })
        } else if(gameType == "division"  && highScore >= this.highScoreDivHard){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreDivHard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreDivHard = doc.data().highScoreDivHard;
              })
            }
          })
        }
      }
      //Wizard
      if(mode == "wizard"){
        if(gameType == "subtraction" && highScore >= this.highScoreSubWizard){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreSubWizard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreSubWizard = doc.data().highScoreSubWizard;
              })
            }
          })
        } else if(gameType == "addition" && highScore >= this.highScoreAddWizard){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreAddWizard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreAddWizard = doc.data().highScoreAddWizard;
              })
            }
          })
        } else if(gameType == "multiplication" && highScore >= this.highScoreMultWizard){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreMultWizard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreMultWizard = doc.data().highScoreMultWizard;
              })
            }
          })
        } else if(gameType == "division"  && highScore >= this.highScoreDivWizard){
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
              this.afs.collection('users').doc(firebaseUser.uid).update({
                highScoreDivWizard: highScore
              })

              this.afs.collection('users').doc(firebaseUser.uid).get()
              .toPromise().then(doc =>{
                this.highScoreDivWizard = doc.data().highScoreDivWizard;
              })
            }
          })
        }
      }
    }

    updateCareerStats(total:number, right:number, wrong:number)
    {
      this.careerQuestions += total;
      this.careerRights += right;
      this.careerWrongs += wrong;
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          this.afs.collection('users').doc(firebaseUser.uid).update({
            careerQuestions: this.careerQuestions,
            careerRights: this.careerRights,
            careerWrongs: this.careerWrongs
          })

          this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
        }
      })
    }

    queryHighScores(){
      var userCollection = this.afs.collection('users', ref => {
        return ref.where('firstName','==','desc').limit(10);
      });

      console.log(userCollection.valueChanges());

     }

     emailSubmit(email: string){
      return firebase.auth().sendPasswordResetEmail(email).then(() =>{
        console.log("email sent")
          }).catch((error) => {
          console.log(error)
        })
      }


      resetPassword(email: string){
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
          .then(() => console.log("email sent"))
          .catch((error) => console.log(error))
      }

      updateNewPassword(email: string,password: string){
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              email: email,
              password: password
            })
            firebaseUser.updatePassword(password);
          }
        })
        console.log(firebase.auth());
      }

        
}