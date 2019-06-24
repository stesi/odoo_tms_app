import {Component, AfterViewInit, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter} from '@angular/core';

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

    expandItem(item) {
        console.log(item)
        this.clickedElem.emit()
        item.expanded = !item.expanded;
    }

    ngAfterViewInit() {
        this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
    }
}
