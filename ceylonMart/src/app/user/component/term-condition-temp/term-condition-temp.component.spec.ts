import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermConditionTempComponent } from './term-condition-temp.component';

describe('TermConditionTempComponent', () => {
  let component: TermConditionTempComponent;
  let fixture: ComponentFixture<TermConditionTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermConditionTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermConditionTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
