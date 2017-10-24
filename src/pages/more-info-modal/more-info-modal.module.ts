import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreInfoModalPage } from './more-info-modal';

@NgModule({
  declarations: [
    MoreInfoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreInfoModalPage),
  ],
})
export class MoreInfoModalPageModule {}
