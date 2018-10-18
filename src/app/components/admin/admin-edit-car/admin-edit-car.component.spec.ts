import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCarComponent } from './admin-edit-car.component';

describe('AdminEditCarComponent', () => {
  let component: AdminEditCarComponent;
  let fixture: ComponentFixture<AdminEditCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
