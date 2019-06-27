import {NgModule} from '@angular/core';
import {AccordionComponent} from './accordion.component';
import {AccordionGroupComponent} from './accordion-group.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AccordionComponent, AccordionGroupComponent],
    imports: [CommonModule,
        IonicModule,
    ],
    exports: [AccordionComponent, AccordionGroupComponent]
})
export class AccordionModule {
}
