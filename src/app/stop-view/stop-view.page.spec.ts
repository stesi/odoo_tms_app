import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopViewPage } from './stop-view.page';

describe('StopViewPage', () => {
  let component: StopViewPage;
  let fixture: ComponentFixture<StopViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
