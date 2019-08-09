import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  visible = false;
  box = true;
  titleStyle = false;

  users: Object;

  constructor(private data: DataService,
              public router: Router,
              public navCtrl: NavController,
              private alertCtrl: AlertController,
              private auth: AuthService,
              private app: AppComponent) {}

  ngOnInit(){
    this.data.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
   }


   navSubtract(){
     this.navCtrl.navigateForward('subtract');
   }

   navAdd(){
     this.navCtrl.navigateForward('addition');
   }

   navMult(){
     this.navCtrl.navigateForward('multiplication');
   }

   navDiv(){
     this.navCtrl.navigateForward('division');
   }
   
   signOut(){
     this.auth.logged = false;
     this.navCtrl.navigateBack('home');
     let alert = this.alertCtrl.create({
       message: 'You Have Been Signed Out',
       buttons: ['OK']
     }).then(alert => alert.present());
   }
}
