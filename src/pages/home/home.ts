import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MouseEvent} from '@agm/core';
import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = Number(localStorage.getItem('lat'));
  lng: number = Number(localStorage.getItem('lon'));

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    this.latlng2distance(this.lat, this.lng, $event.coords.lat, $event.coords.lng);
    console.log(this.latlng2distance(this.lat, this.lng, $event.coords.lat, $event.coords.lng));
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: this.lat,
      lng: this.lng,
      label: 'A',
      draggable: true
    }
  ]

   latlng2distance(lat1, long1, lat2, long2) {
    let R = 6372795;
    lat1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    long1 *= Math.PI / 180;
    long2 *= Math.PI / 180;
    let cl1 = Math.cos(lat1);
    let cl2 = Math.cos(lat2);
    let sl1 = Math.sin(lat1);
    let sl2 = Math.sin(lat2);
    let delta = long2 - long1;
    let cdelta = Math.cos(delta);
    let sdelta = Math.sin(delta);
    let y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
    let x = sl1 * sl2 + cl1 * cl2 * cdelta;
    let ad = Math.atan2(y, x);
    let dist = ad * R; //расстояние между двумя координатами в метрах
     if (dist <= 300) {
       alert("less than 300");
     } else {
       alert("more than 300");
     }
    return dist
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
