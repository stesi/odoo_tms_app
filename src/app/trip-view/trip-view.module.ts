import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TripViewPage } from './trip-view.page';
import {AppModule} from '../app.module';
import {AccordionModule} from '../components/accordion/accordion.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
const routes: Routes = [
  {
    path: '',
    component: TripViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      AccordionModule,
    IonicModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [ TripViewPage]
})
export class TripViewPageModule {}
