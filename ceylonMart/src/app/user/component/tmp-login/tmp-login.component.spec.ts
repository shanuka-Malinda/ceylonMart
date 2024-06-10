import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpLoginComponent } from './tmp-login.component';

describe('TmpLoginComponent', () => {
  let component: TmpLoginComponent;
  let fixture: ComponentFixture<TmpLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmpLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
