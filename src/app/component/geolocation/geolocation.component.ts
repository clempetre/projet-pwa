import { Component, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit  {
  loc!: Position ;
  constructor() {}

  async ngOnInit() {
    await this.getCurrentPosition();
    console.warn(this.loc);
  }
  async getCurrentPosition() {
    console.log("getCurrentPosition");
    let checkPermission = await Geolocation.checkPermissions();
    console.log({checkPermission});
    if(checkPermission.coarseLocation === 'denied'){
      console.log("getCurrentPosition");
      await Geolocation.requestPermissions();
    }
    this.loc = await Geolocation.getCurrentPosition();
  }
}

