import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Geolocation} from '@ionic-native/geolocation';
import {HomePage} from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  lat: any;
  lng: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      localStorage.setItem('lat', this.lat);
      localStorage.setItem('lon', this.lng);
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }
}

