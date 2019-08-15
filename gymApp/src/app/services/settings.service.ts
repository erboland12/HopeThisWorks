import { Injectable } from '@angular/core';
import { Brightness } from '@ionic-native/brightness/ngx';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  brightnessValue: number;
  constructor(private brightness: Brightness) { }


  setBrightness(brightness: number){
    this.brightness.setBrightness(brightness/100);
  }


}


