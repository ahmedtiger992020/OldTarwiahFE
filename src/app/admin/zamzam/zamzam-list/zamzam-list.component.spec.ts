import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZamzamListComponent } from './zamzam-list.component';

describe('ZamzamListComponent', () => {
  let component: ZamzamListComponent;
  let fixture: ComponentFixture<ZamzamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZamzamListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZamzamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
