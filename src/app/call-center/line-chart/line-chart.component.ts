import { Component, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, OnDestroy, input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart, { ChartDataset, LayoutPosition } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit,OnChanges {
 salesChart: any;
  @Input() postitionLegamd: LayoutPosition = "top"
  @Input() Series: any[] = []
  @Input() Labels: string[] = [];
  @Input() YTitle: string = "";
  @Input() displayLegend: boolean = true;
  @Input() Stacked: boolean = false;
  @Input() Options: any = {};
  reverseDirection: boolean;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private translate: TranslateService) {
    this.reverseDirection = this.translate.currentLang != 'en';
  }
  ngOnInit(): void {
    
  }

 

  ngAfterViewInit() {
   this.createColumnChart();
    // this.translate.onLangChange.subscribe(e => {
    //   this.reverseDirection = e.lang != 'en';
    //   this.salesChart.destroy();
    //   this.createColumnChart();
    // });
  }

  createColumnChart() {
   const ctx = this.chartCanvas?.nativeElement;
  if (!ctx) {
      setTimeout(() => {
        if (this.salesChart) {
          this.salesChart.destroy();
        }
        this.createColumnChart();
      }, 3000);
      return
    }
    this.salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.Labels,
        datasets: this.Series,
        // [
        //   {
        //     label: '2019',
        //     data: [65, 59, 80, 81, 56, 55, 40],
        //     backgroundColor: 'rgba(255, 99, 132, 0.2)',
        //     borderColor: 'rgba(255, 99, 132, 1)',
        //     borderWidth: 1
        //   },
        //   {
        //     label: '2020',
        //     data: [28, 48, 40, 19, 86, 27, 90],
        //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
        //     borderColor: 'rgba(54, 162, 235, 1)',
        //     borderWidth: 1
        //   }
        // ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false, // Hide x-axis grid lines
              offset: true
            },
            reverse: this.translate.currentLang == 'en',
            stacked: this.Stacked, // Enable stacking for the x-axis
          },
          y: {
            grid: {
              display: false // Hide y-axis grid lines
            },
            beginAtZero: true,
            title: {
              text:this.YTitle,
              display: this.YTitle != ""
            },
            stacked: this.Stacked
          }
        },
        plugins: {
          legend: {
            display: this.displayLegend,
            position: this.postitionLegamd,
            align: 'center', // Align to the start (left) of the legend box
            fullSize: true
          }
        }
      }
    });
  }
   ngOnChanges(changes: SimpleChanges): void {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
          this.createColumnChart();

  }
   ngOnDestroy() {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
  }
}
