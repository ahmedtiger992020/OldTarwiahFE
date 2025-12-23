import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigMapComponent } from './big-map.component';

describe('BigMapComponent', () => {
  let component: BigMapComponent;
  let fixture: ComponentFixture<BigMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BigMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
