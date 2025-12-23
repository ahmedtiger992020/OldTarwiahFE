import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintImgComponent } from './complaint-img.component';

describe('ComplaintImgComponent', () => {
  let component: ComplaintImgComponent;
  let fixture: ComponentFixture<ComplaintImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplaintImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
