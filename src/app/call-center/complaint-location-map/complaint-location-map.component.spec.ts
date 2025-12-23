import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintLocationMapComponent } from './complaint-location-map.component';

describe('ComplaintLocationMapComponent', () => {
  let component: ComplaintLocationMapComponent;
  let fixture: ComponentFixture<ComplaintLocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintLocationMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
