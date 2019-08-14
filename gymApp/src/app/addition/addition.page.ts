import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatsService } from '../stats/stats.service';
import { DifficultyService } from '../services/difficulty.service';
import { timer, Observable, Subject, Subscription } from 'rxjs';
import { take, map, switchMap, tap, filter, takeUntil } from 'rxjs/operators';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-addition',
  templateUrl: './addition.page.html',
  styleUrls: ['./addition.page.scss'],
})
export class AdditionPage implements OnInit, OnDestroy {

  //Display booleans
  diffVisible = true;
  titleVisible = false;
  readyVisible = false;
  questionsVisible = false;
  answerRight: boolean;
  success: boolean;
  difficulty: string;

  //timer globals
  readyTimeLeft: number = 3;
  start = false;
  timeLeft: number;
  timesUp: number;
  interval2;

  //random numbers
  rand1: number;
  rand2: number;

  //Check for right answer
  sum: string = "";
  final: string = "";
  score: number = 0;

  
  navigationSubscription;
  constructor(public navCtrl: NavController,
              private stats: StatsService,
              private diff: DifficultyService,
              private router: Router) 
  { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if(e instanceof NavigationEnd){
        this.initializeInvites();
        console.log("worked")
      }
    })
  }

  initializeInvites()
  {
    //Display booleans
  this.diffVisible = true;
  this.titleVisible = false;
  this.readyVisible = false;
  this.questionsVisible = false;

  //timer globals
  this.start = false;


  //random numbers

  //Check for right answer
  this.sum = "";
  this.final = "";
  this.score = 0;
  console.log("Initialized");
  }



  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
    }
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
        if(this.difficulty == "easy"){
          this.readyTimeLeft = 10;
        }
        if(this.difficulty == "intermediate"){
          this.readyTimeLeft = 90;
        }
        if(this.difficulty == "hard"){
          this.readyTimeLeft = 120;
        }
        if(this.difficulty == "wizard"){
          this.readyTimeLeft = 180;
        }
        this.readyVisible = false;
        this.questionsVisible = true;
      }
    },1000)
  }



  checkAnswerForAddition(sum: string){

    if(this.rand1 + this.rand2 != parseInt(sum)){
      console.log("WRONG");
      console.log(sum);
      this.diff.correctQuestions.push('Wrong');
      this.diff.incorrectAnswers++;
      this.answerRight = false;
    } else {
      this.score++;
      console.log("Right Answer");
      this.diff.correctQuestions.push('Right');
      this.diff.correctAnswers++;
      this.answerRight = true;
    }
    if(this.difficulty == "easy"){
      this.rand1 = Math.floor((Math.random() * 100) + 1);
      this.rand2 = Math.floor((Math.random() * 100) + 1);
    }
    if(this.difficulty == "intermediate"){
      this.rand1 = Math.floor((Math.random() * 1000) + 1);
      this.rand2 = Math.floor((Math.random() * 1000) + 1);
    }
    if(this.difficulty == "hard"){
      this.rand1 = Math.floor((Math.random() * 100000) + 10);
      this.rand2 = Math.floor((Math.random() * 100000) + 10);
    }
    if(this.difficulty == "wizard"){
      this.rand1 = Math.floor((Math.random() * 1000000) + 100);
      this.rand2 = Math.floor((Math.random() * 1000000) + 100);
    }
    this.sum = "";

    if(this.score >= 10){
      this.diff.succeeded();
    }
    var arrayAdd = this.rand1.toString() + " + " + this.rand2.toString();
    this.diff.questions.push(arrayAdd);
    console.log(arrayAdd);
    this.diff.totalQuestions++;
    console.log(this.diff.correctQuestions);
    
  }

  timesOut(){
    if(this.timesUp == 0){
      this.navCtrl.navigateForward('results');
      
    }
    if(this.timesUp == 0 && this.score < 10){
      this.navCtrl.navigateForward('results');
      this.diff.failed();
    }
    this.timeLeft = -1;
    
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

  difficultyChosen(difficulty){
    this.difficulty = difficulty;
    if(difficulty == "easy"){
      this.rand1 = Math.floor((Math.random() * 100) + 1);
      this.rand2 = Math.floor((Math.random() * 100) + 1);
      this.diff.mode = "easy";
      this.diff.gameType = "addition";
      this.timesUp = 13;
    }
    if(difficulty == "intermediate"){
      this.rand1 = Math.floor((Math.random() * 1000) + 1);
      this.rand2 = Math.floor((Math.random() * 1000) + 1);
      this.diff.mode = "intermediate";
      this.diff.gameType = "addition";
      this.timesUp = 93;
    }
    if(difficulty == "hard"){
      this.rand1 = Math.floor((Math.random() * 100000) + 10);
      this.rand2 = Math.floor((Math.random() * 100000) + 10);
      this.diff.mode = "hard";
      this.diff.gameType = "addition";
      this.timesUp = 123;
    }
    if(difficulty == "wizard"){
      this.rand1 = Math.floor((Math.random() * 1000000) + 100);
      this.rand2 = Math.floor((Math.random() * 1000000) + 100);
      this.diff.mode = "wizard";
      this.diff.gameType = "addition";
      this.timesUp = 183;
    }

    console.log(this.diff.mode);
    console.log(this.diff.gameType);

    var arrayAdd = this.rand1.toString() + " + " + this.rand2.toString();
    this.diff.questions.push(arrayAdd);
    console.log(arrayAdd);

    this.diffVisible = false;
    this.titleVisible = true;
  } 

}
