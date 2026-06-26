import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFeed } from './event-feed';

describe('EventFeed', () => {
  let component: EventFeed;
  let fixture: ComponentFixture<EventFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(EventFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
