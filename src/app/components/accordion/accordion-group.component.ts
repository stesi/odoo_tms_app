import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'group',
  template: `
  <ion-card class="mypanel">
    <ion-card-header (click)="toggle.emit()">
      <ion-card-title ><ng-content select=".accordion-title"></ng-content></ion-card-title>
    </ion-card-header>
    <ion-card-content class="body" [ngClass]="{'hidden': !opened}">
      <ng-content select=".accordion-content"></ng-content>
    </ion-card-content>
  </ion-card>
  `,
  styleUrls: ['accordion.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionGroupComponent {

  /**
   * If the panel is opened or closed
   */
  @Input() opened = false;

  /**
   * Text to display in the group title bar
   */
  @Input() title: string;

  /**
   * Emitted when user clicks on group titlebar
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
}
