import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditExpensesComponent } from './admin-edit-expenses.component';

describe('AdminEditExpensesComponent', () => {
  let component: AdminEditExpensesComponent;
  let fixture: ComponentFixture<AdminEditExpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
