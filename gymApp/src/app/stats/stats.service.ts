import { Injectable } from '@angular/core';
import { SubEasy, Sub } from './stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  test: SubEasy;
  personalStats: Sub[] = [];


  constructor() { }

  testing(){

  }
}
