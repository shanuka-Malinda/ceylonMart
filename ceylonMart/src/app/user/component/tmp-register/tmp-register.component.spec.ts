import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpRegisterComponent } from './tmp-register.component';

describe('TmpRegisterComponent', () => {
  let component: TmpRegisterComponent;
  let fixture: ComponentFixture<TmpRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmpRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
