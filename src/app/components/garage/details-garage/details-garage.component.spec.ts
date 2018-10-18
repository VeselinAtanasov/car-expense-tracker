import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGarageComponent } from './details-garage.component';

describe('DetailsGarageComponent', () => {
  let component: DetailsGarageComponent;
  let fixture: ComponentFixture<DetailsGarageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsGarageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
