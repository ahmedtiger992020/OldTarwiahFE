import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoulmnChartComponent } from './coulmn-chart.component';

describe('CoulmnChartComponent', () => {
  let component: CoulmnChartComponent;
  let fixture: ComponentFixture<CoulmnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoulmnChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoulmnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
