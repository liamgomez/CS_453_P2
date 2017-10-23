import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import axios  from 'axios';
import qs from 'qs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  searchQuery: string = '';
  items: object[];
  radius:number = 1000;
  lat: number;
  long: number;

  // TODO: pretty sure this will break in prod, proxy needs to be removed or something.
  // see ionic.config.json
  //apiUrl: string = '/maps/api/place/nearbysearch/json';
  apiUrl: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  apiKey: string = 'AIzaSyDutCaHzOGayx9YnXXKiwPW5eQjBZntAdM';


  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = [];

    // set val to the value of the searchbar
    let val = ev.target.value;

    this.geolocation.getCurrentPosition().then(pos => {
      console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;
      let location = this.lat + ',' + this.long;
      let data = {
        location: location,
        radius: this.radius,
        types: 'food',
        key: this.apiKey
      };
      let query =  this.apiUrl + '?' + qs.stringify(data);
      axios.get(query)
        .then((response) => {
          console.log(response.data.results);
          this.items = response.data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    });


  }

  getLocation() {
      // get current position
      this.geolocation.getCurrentPosition().then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
      });

      const watch = this.geolocation.watchPosition().subscribe(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });

      // to stop watching
      watch.unsubscribe();
  }


  itemSelected(item) {

  }
}
