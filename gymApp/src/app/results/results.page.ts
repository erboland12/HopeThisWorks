import { Component, OnInit } from '@angular/core';
import { SubtractPage } from '../subtract/subtract.page';
import { DifficultyService } from '../services/difficulty.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  
  messages: string[] =
  [
    'YOU SUCK',
    'FOOLED',
    'TROGLODYTE',
    'DEPLORABLE',
    'WRETCHED FOOL',
    'PATHETIC',
    'IMBECIL'
  ]
  
  message:string = '';

  constructor(private diff: DifficultyService,
              private navCtrl: NavController) {
 
  }
  ngOnInit() {
    this.selectRandomMessage();
  }

  reset(){
    this.diff.resetResults();
    this.navCtrl.navigateForward('home');
  }

  selectRandomMessage(){
    var index = Math.floor(Math.random() * Math.floor(7))
    this.message = this.messages[index];
  }


}
