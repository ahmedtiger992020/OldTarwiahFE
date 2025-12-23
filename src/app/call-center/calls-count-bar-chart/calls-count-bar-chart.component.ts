import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../services/dashboard.service';
import { MassageService } from '../../services/massage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-calls-count-bar-chart',
  templateUrl: './calls-count-bar-chart.component.html',
  styleUrl: './calls-count-bar-chart.component.css'
})

export class CallsCountBarChartComponent implements OnInit, OnChanges {
  @Input() inputData: any;
  single: any[] = [];

  // Chart options
  view: [number, number] = [700, 200];
  gradient: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  legendPosition = LegendPosition.Below;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = '';
  yAxisLabel: string = '';
  autoScale: boolean = true;

  colorScheme: Color = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#347AE2', '#F56780']
  };

  onSelect(event: any): void {
    console.log(event);
  }

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
      this.dashboardService.getCallsCountBarChart().subscribe({
          next: (result) => {
              if (!result.isSucess) {
                  this.messageService.showMessage('error', result.error);
              }
              else {
                  this.single = result.data;
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
