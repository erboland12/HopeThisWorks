import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { unwrapResolvedMetadata } from '@angular/compiler';
import { NavController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  users;

  user: boolean = false;
  pass: boolean = false;

  user2: firebase.User;

  constructor(private auth: AuthService,
              private afAuth: AngularFireAuth,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private data: DatabaseService,
              private storage: Storage) { }
          

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
      console.log(user2);
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
