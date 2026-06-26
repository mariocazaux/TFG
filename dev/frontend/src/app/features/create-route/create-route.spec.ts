import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoute } from './create-route';

describe('CreateRoute', () => {
  let component: CreateRoute;
  let fixture: ComponentFixture<CreateRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoute],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoute);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
