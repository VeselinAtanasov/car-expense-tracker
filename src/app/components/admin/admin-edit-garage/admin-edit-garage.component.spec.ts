import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGarageComponent } from './admin-edit-garage.component';

describe('AdminEditGarageComponent', () => {
  let component: AdminEditGarageComponent;
  let fixture: ComponentFixture<AdminEditGarageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditGarageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditGarageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
