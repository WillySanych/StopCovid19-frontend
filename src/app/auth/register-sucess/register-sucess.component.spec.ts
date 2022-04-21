import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSucessComponent } from './register-sucess.component';

describe('RegisterSucessComponent', () => {
  let component: RegisterSucessComponent;
  let fixture: ComponentFixture<RegisterSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSucessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
