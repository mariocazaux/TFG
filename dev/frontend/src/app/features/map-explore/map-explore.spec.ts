import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapExplore } from './map-explore';

describe('MapExplore', () => {
  let component: MapExplore;
  let fixture: ComponentFixture<MapExplore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapExplore],
    }).compileComponents();

    fixture = TestBed.createComponent(MapExplore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
