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
    color: string;
    photoURL: string;

    //Unlockable Colors
    red: boolean;
    orange: boolean;
    blue: boolean;
    green: boolean;


    //Subtraction High Scores
    highScoreSubEasy: number;
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
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
      this.navCtrl.navigateForward('home');
      this.logged = true;
    }

    logInFacebook(){
      console.log("Redirecting to Facebook Login Provider...");
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
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
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

    updateUser(username, firstName, lastName, age, 
               location, bio, color){
      this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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

    updateProfileURL(photoURL){
      this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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

    loggedCheck(){
      this.afAuth.auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
          this.logged = true;
          this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              console.log(doc.data().username);
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

        } else {
          this.logged = false;
          console.log("Not logged in")
        }
      });
    }

    updateHighScore(mode: string, gameType: string, highScore: number){
      if(mode == null){
        return;
      }
      
      //Easy
      if(mode == "easy"){
        if(gameType == "subtraction" && highScore >= this.highScoreSubEasy){
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
          this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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
      this.afAuth.auth.onAuthStateChanged(firebaseUser => {
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

    setScores(){
      //Subtraction
      if(this.highScoreSubEasy == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreSubEasy: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreSubEasy = doc.data().highScoreSubEasy;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreSubIntermediate == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreSubIntermediate: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreSubIntermediate = doc.data().highScoreSubIntermediate;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreSubHard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreSubHard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreSubHard = doc.data().highScoreSubHard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreSubWizard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreSubWizard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreSubWizard = doc.data().highScoreSubWizard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }
      //Addition
      if(this.highScoreAddEasy == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreAddEasy: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreAddEasy = doc.data().highScoreAddEasy;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreAddIntermediate == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreAddIntermediate: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreAddIntermediate = doc.data().highScoreAddIntermediate;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreAddHard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreAddHard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreAddHard = doc.data().highScoreAddHard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreAddWizard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreAddWizard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreAddWizard = doc.data().highScoreAddWizard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }
      //Multiplication
      if(this.highScoreMultEasy == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreMultEasy: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreMultEasy = doc.data().highScoreMultEasy;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreMultIntermediate == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreMultIntermediate: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreMultIntermediate = doc.data().highScoreMultIntermediate;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreMultHard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreMultHard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreMultHard = doc.data().highScoreMultHard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreMultWizard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreMultWizard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreMultWizard = doc.data().highScoreMultWizard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }
      //Division
      if(this.highScoreDivEasy == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreDivEasy: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreDivEasy = doc.data().highScoreDivEasy;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreDivIntermediate == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreDivIntermediate: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreDivIntermediate = doc.data().highScoreDivIntermediate;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }

      if(this.highScoreDivHard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreDivHard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreDivHard = doc.data().highScoreDivHard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }
      
      if(this.highScoreDivWizard == null){
        this.afAuth.auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            this.afs.collection('users').doc(firebaseUser.uid).update({
              highScoreDivWizard: 0,
              careerQuestions: 0,
              careerRights: 0,
              careerWrongs: 0
            })

            this.afs.collection('users').doc(firebaseUser.uid).get()
            .toPromise().then(doc =>{
              this.highScoreDivWizard = doc.data().highScoreDivWizard;
              this.careerQuestions = doc.data().careerQuestions;
              this.careerRights = doc.data().careerRights;
              this.careerWrongs = doc.data().careerWrongs;
            })
          }
        })
      }
    }
        
}