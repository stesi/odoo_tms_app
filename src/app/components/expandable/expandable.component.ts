import {Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter} from '@angular/core';
import { HostListener  } from "@angular/core";

@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements AfterViewInit {
    @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper: ElementRef;
    @Input('expanded') expanded = false;
    @Input('expandHeight') expandHeight = '150px';
    @Output() clickedElem = new EventEmitter()
    constructor(public renderer: Renderer2) {
    }
    @HostListener('click', ['$event'])
    expandItem(item) {
       alert(1);
    }


    ngAfterViewInit() {
        this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
    }
}
