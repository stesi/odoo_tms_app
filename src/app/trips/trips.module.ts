import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TripsPage} from './trips.page';
import {AccordionModule} from '../components/accordion/accordion.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
    {
        path: '',
        component: TripsPage
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
    declarations: [ TripsPage]
})
export class TripsPageModule {
   
}
