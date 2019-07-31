import { Component, OnInit } from '@angular/core';
import { SubtractPage } from '../subtract/subtract.page';
import { DifficultyService } from '../services/difficulty.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  public sub: SubtractPage;
  constructor(private diff: DifficultyService) {
 
  }
  ngOnInit() {
  }


}
