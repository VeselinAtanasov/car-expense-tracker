import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyComponent } from './admin-modify.component';

describe('AdminModifyComponent', () => {
  let component: AdminModifyComponent;
  let fixture: ComponentFixture<AdminModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
