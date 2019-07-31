import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import * as PouchDB from 'pouchdb/dist/pouchdb';
import { DatabaseService, User } from '../services/database.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  invalid: boolean;

  private username;
  private firstName;
  private lastName;
  private email; 
  private password;

  private newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  regForm: FormGroup;
  constructor(public navCtrl: NavController,
              private data: DatabaseService,
              private storage: Storage) { }

  ngOnInit() {
    let username = new FormControl("", Validators.required);
    let password = new FormControl("", Validators.required);
    let firstName = new FormControl("", Validators.required);
    let lastName = new FormControl("", Validators.required);
    let email = new FormControl("", Validators.required);
    let location = new FormControl("", Validators.required);

    this.regForm = new FormGroup({
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      // email: email,
      // location: location
    })
    this.setupDB();
  }

  setupDB(){
    this.data.db = new PouchDB('users');
  }

  signUp(){
    if (this.regForm.valid){
      this.addUser();
      this.navCtrl.navigateForward('login');
    } else{
      this.invalid = true;
    }
  }

  addUser(){
    this.storage.set('username',this.username);
    this.storage.set('password',this.password);

    this.storage.get('username').then((val) => {
      console.log('Your username is', val);
    });
  //   this.data.db.post({
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     username: this.username,
  //     email: this.email,
  //     password: this.password
  //   }, (err, result) => {
  //     if(!err){
  //       alert('Successful Registration')
  //       this.addUserModel();
  //     } else{
  //       alert('Error.  Try Again')
  //     }
  // });
  }


}
