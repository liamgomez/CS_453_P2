import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MoreInfoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more-info-modal',
  templateUrl: 'more-info-modal.html',
})
export class MoreInfoModalPage {

  name: string = this.navParams.get('name');
  lat: number = this.navParams.get('lat');
  lng: number = this.navParams.get('lng');
  icon: string = this.navParams.get('icon');
  rating: number = this.navParams.get('rating');
  vicinity: number = this.navParams.get('vicinity');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreInfoModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
