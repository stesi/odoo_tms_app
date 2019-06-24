import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TripsPage} from './trips.page';
import {ExpandableComponent} from '../components/expandable/expandable.component';

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
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ExpandableComponent,TripsPage]
})
export class TripsPageModule {
}
