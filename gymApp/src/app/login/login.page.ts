import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { unwrapResolvedMetadata } from '@angular/compiler';
import { NavController, AlertController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { Storage } from '@ionic/storage';


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

  constructor(private auth: AuthService,
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
  }

  ionViewDidEnter(){
    this.refresh();
  }

  login(){
    this.auth.loginUser(this.username, this.password);
    this.navCtrl.navigateForward('home');
    console.log(this.username);
    console.log(this.password);
    console.log(this.loginForm.controls.username.invalid);

  }

  refresh(){
    this.data.db = new PouchDB('users');

    this.users = [];

    this.data.db.allDocs({
      include_docs: true
    },
    (err, result) => {
      if(!err){
        let rows = result.rows;
        for (let i = 0; i < rows.length; i++){
          this.users.push(rows[i].doc);
        }
      }
    })
  }

  logUserIn(username, password){
    this.storage.get('username').then((val) => {
      if(val == username){
        this.storage.get('password').then((val) => {
          if(val == password){
            this.navCtrl.navigateForward('home');
            this.auth.logged = true;
            let alert = this.alertCtrl.create({
              message: 'Login Successful',
              buttons: ['OK']
            }).then(alert => alert.present());
          } else{
            console.log("Error")
            this.auth.logged = false;
            let alert = this.alertCtrl.create({
              message: 'Please Try Again',
              subHeader: 'Invalid Credntials',
              buttons: ['OK']
            }).then(alert => alert.present());
          } 
        });
      } else {
        console.log("ERROR");
        this.auth.logged = false;
        let alert = this.alertCtrl.create({
          message: 'Please Try Again',
          subHeader: 'Invalid Credntials',
          buttons: ['OK']
        }).then(alert => alert.present());
      }});

    // if(this.user && this.pass){
    //   this.navCtrl.navigateForward('home');
    //   let alert = this.alertCtrl.create({
    //     message: 'Login Successful',
    //     buttons: ['OK']
    //   }).then(alert => alert.present());
    //   console.log('works?')
    // } else{
    //   console.log('Nope')
    //   console.log(this.user);
    //   console.log(this.pass);
    // }
  }

}
