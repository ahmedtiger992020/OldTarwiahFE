import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { DashboardService } from '../../services/dashboard.service';
import { MassageService } from '../../services/massage.service';

@Component({
  selector: 'app-call-language-pie-chart',
  templateUrl: './call-language-pie-chart.component.html',
  styleUrl: './call-language-pie-chart.component.css'
})
export class CallLanguagePieChartComponent {
  @Input() inputData: any;

  view: [number, number] = [300, 250];
  data: any[] = [];
  showLegend = false;
  legendPosition = LegendPosition.Below;
  showLabels = false;
  isDoughnut = false;
  colorScheme: Color = {
    name: 'Variation',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#347AE2', '#F56780']
  };

  constructor(private dashboardService: DashboardService,
              private messageService: MassageService) {
      
  }

  ngOnInit(): void {
    this.getLanguageCallsCountPieChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputData != null) {
      this.getLanguageCallsCountPieChart();
    }
  }

  getLanguageCallsCountPieChart() {
      this.dashboardService.getLanguageCallsCountPieChart().subscribe({
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
