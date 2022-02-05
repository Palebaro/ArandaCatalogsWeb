import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAuthorizationComponent } from './login-authorization.component';

describe('LoginAuthorizationComponent', () => {
  let component: LoginAuthorizationComponent;
  let fixture: ComponentFixture<LoginAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
