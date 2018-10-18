import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageReportComponent } from './garage-report.component';

describe('GarageReportComponent', () => {
  let component: GarageReportComponent;
  let fixture: ComponentFixture<GarageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
