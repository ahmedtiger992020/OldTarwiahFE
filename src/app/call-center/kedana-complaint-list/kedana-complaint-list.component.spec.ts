import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KedanaComplaintListComponent } from './kedana-complaint-list.component';

describe('KedanaComplaintListComponent', () => {
  let component: KedanaComplaintListComponent;
  let fixture: ComponentFixture<KedanaComplaintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KedanaComplaintListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KedanaComplaintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
