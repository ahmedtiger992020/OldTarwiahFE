import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletListComponent } from './toilet-list.component';

describe('ToiletListComponent', () => {
  let component: ToiletListComponent;
  let fixture: ComponentFixture<ToiletListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToiletListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToiletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
