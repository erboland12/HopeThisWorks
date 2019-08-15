import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { IUser } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  settings: boolean;
  public appPages = [

    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Addition',
      url: '/addition',
      src: '../assets/svgs/add.svg'
    },
    {
      title: 'Subtraction',
      url: '/subtract',
      src: '../assets/svgs/sub.svg'
    },
    {
      title: 'Multiplication',
      url: '/multiplication',
      src: '../assets/svgs/mult.svg'
    },
    {
      title: 'Division',
      url: '/division',
      src: '../assets/svgs/div.svg'
    },
    {
      title: 'Rewards',
      url: '/rewards',
      icon: 'ribbon'
    },
    {
      title: 'Leaderboards',
      url: '/leaderboard',
      icon: 'clipboard'
    }
  ];

  public appSettings = [
    {
      title: 'Settings',
      children: [
        {
          title: 'Audio',
          url: '/audio',
          icon: 'musical-notes'
        },
        {
          title: 'Visual',
          url: '/visual',
          icon: 'eye'
        }
      ]
    }
  ]

  user: firebase.User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(){
    this.afAuth.authState
      .subscribe(user => {
        this.user = user;
      })
  }

  openSettings(){
    this.settings = true;
  }
}
