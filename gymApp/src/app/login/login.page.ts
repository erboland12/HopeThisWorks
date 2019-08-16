import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { DatabaseService, User } from '../services/database.service';
import { IUser } from '../models/user.model';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as _ from 'lodash';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;

  user: boolean = false;
  pass: boolean = false;

  user2: firebase.User;
  account: User;
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(private auth: AuthService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private db: AngularFireDatabase,
              private userService: UserService,
              private navCtrl: NavController,
              private alertCtrl: AlertController){

   }
          

  ngOnInit() {
    let username = new FormControl();
    let password = new FormControl();
    this.loginForm = new FormGroup({
      username: username,
      password: password
    })
    this.loginForm.controls.username.invalid;

    this.afAuth.authState
    .subscribe(user2 => {
      this.user2 = user2;
    })

  }

  logInWithGoogle(){
    this.auth.loginGoogle();
  }

  logInWithFacebook(){
    this.auth.logInFacebook();
  }

  signOut(){
    this.auth.signOut();
  }

}
