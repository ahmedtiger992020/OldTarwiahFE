import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../services/dashboard.service';
import { MassageService } from '../../services/massage.service';

@Component({
  selector: 'app-daily-calls-count-line-chart',
  templateUrl: './daily-calls-count-line-chart.component.html',
  styleUrl: './daily-calls-count-line-chart.component.css'
})

export class DailyCallsCountLineChartComponent implements OnInit, OnChanges {
  @Input() inputData: any;
  view: [number, number] = [1150, 400];
  colorScheme: Color = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454']
  };
  data = [];
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = false;  

  constructor(private dashboardService: DashboardService,
              private messageService: MassageService) {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputData != null) {
      this.loadCallsCountBarChart();
    }
  }  

  ngOnInit(): void {
    this.loadCallsCountBarChart();
  }

  loadCallsCountBarChart() {
    this.dashboardService.getDailyCallsCountLineChart().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.data = result.data;
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }
}
