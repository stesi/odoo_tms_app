import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TripsPage} from './trips.page';
import {AccordionModule} from '../components/accordion/accordion.module';


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
        RouterModule.forChild(routes)
    ],
    declarations: [ TripsPage]
})
export class TripsPageModule {
}
