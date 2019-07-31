import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  success: boolean;
  totalQuestions: number = 0;
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  questions: string[] = [];
  correctQuestions: string[] = [];

  constructor(navCtrl: NavController) { }

  succeeded(){
    this.success = true;
  }
  failed(){
    this.success = false;
  }

  resetResults(){
    this.totalQuestions = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;

    this.questions = []
    this.correctQuestions = []
  }
}
