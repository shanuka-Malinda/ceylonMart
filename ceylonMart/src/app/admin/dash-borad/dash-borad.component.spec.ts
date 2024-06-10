import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoradComponent } from './dash-borad.component';

describe('DashBoradComponent', () => {
  let component: DashBoradComponent;
  let fixture: ComponentFixture<DashBoradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoradComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBoradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
