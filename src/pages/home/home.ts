import { types } from './types';
import axios  from 'axios';
import qs from 'qs';
import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { MoreInfoModalPage } from '../more-info-modal/more-info-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController, private geolocation: Geolocation, public toastCtrl: ToastController, public modalCtrl: ModalController) {
  }

  searchQuery: string = '';
  items: object[];
  radius:number = 5000;
  lat: number;
  long: number;
  supported_types: string[] = types;
  selected_type: string = 'food';
  loading: boolean = false;

  // TODO: pretty sure this will break in prod, proxy needs to be removed or something.
  // see ionic.config.json
  //apiUrl: string = '/maps/api/place/nearbysearch/json';
  apiUrl: string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  apiKey: string = 'AIzaSyDutCaHzOGayx9YnXXKiwPW5eQjBZntAdM';


  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = [];

    this.loading = true;

    this.geolocation.getCurrentPosition()
      .then(pos => {
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
        this.showToast('Got current location (lat/lng): ' + pos.coords.latitude + ',' + pos.coords.longitude, 'bottom');

        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;

        let location = this.lat + ',' + this.long;

        let data = {
          location: location,
          radius: this.radius,
          type: this.selected_type,
          key: this.apiKey,
          keyword: this.searchQuery
        };

        let query =  this.apiUrl + '?' + qs.stringify(data);
        axios.get(query)
          .then((response) => {
            this.loading = false;
            console.log(response.data.results);
            this.items = response.data.results;
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
          });
      })
      .catch((error) => {
        this.loading = false;
        this.showToast('Could not get current location : ' + error.message, 'bottom');
        console.log(error);
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
    let data = {
      name: item.name,
      lat: item.geometry.location.lat,
      lng: item.geometry.location.lng,
      icon: item.icon,
      rating: item.rating,
      vicinity: item.vicinity
    };
    let modal = this.modalCtrl.create(MoreInfoModalPage, data);
    modal.present();
  }

  showToast(msg: string, position: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
}
