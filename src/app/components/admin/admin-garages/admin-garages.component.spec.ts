import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGaragesComponent } from './admin-garages.component';

describe('AdminGaragesComponent', () => {
  let component: AdminGaragesComponent;
  let fixture: ComponentFixture<AdminGaragesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGaragesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
