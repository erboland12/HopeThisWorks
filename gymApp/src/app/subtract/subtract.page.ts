import { Component, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-subtract',
  templateUrl: './subtract.page.html',
  styleUrls: ['./subtract.page.scss'],
})
export class SubtractPage implements OnInit {

  //Display booleans
  titleVisible = true;
  readyVisible = false;
  questionsVisible = false;
  answerRight: boolean;
  success: boolean;

  //timer globals
  readyTimeLeft: number = 3;
  start = false;
  timeLeft: number = 60;
  timesUp: number = 63;
  interval;
  interval2;

  //random numbers
  rand1: number = Math.floor((Math.random() * 100) + 1);
  rand2: number = Math.floor((Math.random() * 100) + 1);

  //Check for right answer
  sum: string = "";
  final: string = "";
  score: number = 0;
  constructor(public navCtrl: NavController) 
  { 

  }

  ngOnInit() {

  }

  readyClick(){
    this.titleVisible = false;
    this.readyVisible = true;
    this.readyTimer();
  }

  readyTimer(){
    this.interval2 = setInterval(() => {
      if(this.readyTimeLeft > 0) {
        this.readyTimeLeft--;
        this.timesUp--;
        this.timesOut();
      } else{
        this.readyTimeLeft = 60;
        this.readyVisible = false;
        this.questionsVisible = true;
      }
    },1000)
  }



  checkAnswerForSubtraction(sum: string){

    if(this.rand1 - this.rand2 != parseInt(sum)){
      console.log("WRONG");
      console.log(sum);
      this.answerRight = false;
    } else {
      this.score++;
      console.log("Right Answer");
      this.answerRight = true;
    }
    this.rand1 = Math.floor((Math.random() * 100) + 1);
    this.rand2 = Math.floor((Math.random() * 100) + 1);

    this.sum = "";

    if(this.score == 10){
      this.navCtrl.navigateForward('results');
      this.success = true;
    }

  }

  timesOut(){
    if(this.timesUp == 0){
      this.navCtrl.navigateForward('results');
      this.success = false;
    }
  }

  mapNum(sum: string, num: string){
    this.final = sum.concat(num);
    this.sum = this.final;
    console.log(sum);
    console.log(this.final);
  }

  clearNum(){
    var stringMinusOne;
    stringMinusOne = this.sum.substring(0, this.sum.length-1);
    this.sum = stringMinusOne;
  }
  

}
