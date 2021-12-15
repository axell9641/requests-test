import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDataItemComponent } from './additional-data-item.component';

describe('AdditionalDataItemComponent', () => {
  let component: AdditionalDataItemComponent;
  let fixture: ComponentFixture<AdditionalDataItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalDataItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
