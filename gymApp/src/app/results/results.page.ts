import { Component, OnInit } from '@angular/core';
import { SubtractPage } from '../subtract/subtract.page';
import { DifficultyService } from '../services/difficulty.service';
import { NavController } from '@ionic/angular';
import { StatsService } from '../stats/stats.service';
import { AuthService } from '../services/auth.service';
import { ThrowStmt } from '@angular/compiler';

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

  goodMessages: string[] = 
  [
    'Well Done!',
    'Exquisite!',
    'Are You A Genius?',
    'Mathematics Master',
    'Arithmetic Acrobat',
    'Excellent Work!',
  ]
  
  message:string = '';
  goodMessage: string = '';

  constructor(private diff: DifficultyService,
              private navCtrl: NavController,
              private auth: AuthService,
              private sub: SubtractPage) {
 
  }
  ngOnInit() {
    this.selectRandomMessage();
    this.selectRandomGoodMessage();
    console.log(this.diff.mode);
    console.log(this.diff.gameType);
    console.log(this.diff.correctAnswers);
    this.updateHighScore(this.diff.correctAnswers);
    
  }

  reset(){
    this.diff.resetResults();
    if(this.diff.gameType == "addition"){
      this.navCtrl.navigateBack('addition').then(() =>{
        window.location.reload();
      });
    }

    if(this.diff.gameType == "subtraction"){
      this.navCtrl.navigateBack('subtract').then(() =>{
        window.location.reload();
      });
    }

    if(this.diff.gameType == "multiplication"){
      this.navCtrl.navigateBack('multiplication').then(() =>{
        window.location.reload();
      });
    }

    if(this.diff.gameType == "division"){
      this.navCtrl.navigateBack('division').then(() =>{
        window.location.reload();
      });
    }
  }

  selectRandomMessage(){
    var index = Math.floor(Math.random() * Math.floor(7))
    this.message = this.messages[index];
  }

  selectRandomGoodMessage(){
    var index = Math.floor(Math.random() * Math.floor(6));
    this.goodMessage = this.goodMessages[index];
  }

  updateHighScore(highScore: number){
    this.auth.updateCareerStats(this.diff.totalQuestions,this.diff.correctAnswers,this.diff.incorrectAnswers);
    this.auth.updateHighScore(this.diff.mode, this.diff.gameType, highScore);
  }

  okBtn(){
    this.diff.resetResults();
    
    this.navCtrl.navigateForward('home').then(() =>{
      window.location.reload();
    });
  }


}
