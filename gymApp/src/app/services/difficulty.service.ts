import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {
  success:boolean;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  
  constructor() { }

  succeeded(){
    this.success = true;
  }
  failed(){
    this.success = false;
  }
}
