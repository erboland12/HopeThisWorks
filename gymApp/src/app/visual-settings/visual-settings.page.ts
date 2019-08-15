import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-visual-settings',
  templateUrl: './visual-settings.page.html',
  styleUrls: ['./visual-settings.page.scss'],
})
export class VisualSettingsPage implements OnInit {
  range: number = 30;
  constructor(private settings: SettingsService) { }

  ngOnInit() {
    console.log(this.range);
    this.settings.setBrightness(this.range);
  }

}
