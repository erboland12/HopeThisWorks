import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
              public navCtrl: NavController) {}

  ngOnInit(){
    this.data.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
   }


   navSubtract(){
     this.navCtrl.navigateForward('subtract');
   }

}
