import { Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  public chart: any;
  @Input() Id = "DoughnutChart"
  @Input() labels: any[] = []
  @Input() data: any[] = []
 @Input() backgroundColor = [
    'rgb(60, 190, 140)',  // Soft Green
  '#347AE2',  // Sky Blue
  '#8fc1ff',  // Light Blue

  '#cccccc',   // Soft Gray
    '#ff9999',  // Soft Red

];

@Input() borderColor = [
    'rgba(113, 192, 113, 1)',  // Muted Green

  '#347AE2',   // Strong Sky Blue
  'rgba(143, 193, 255, 1)',  // Muted Light Blue
  'rgba(204, 204, 204, 1)' ,  // Soft Gray
    'rgba(255, 99, 132, 1)',   // Bright Red

];
  @Input() isFullScreen = false;
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.createChart();

  }

  createChart(): void {
 if(!document.getElementById(this.Id))
    {
      return
    }    this.chart = new Chart(this.Id, {
      type: 'pie', data: {
        labels: this.labels,
        datasets: [{
          label: 'Data',
          data: this.data,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1

        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              generateLabels: (chart: any) => {
                const data = chart.data;
                const dataset = data.datasets[0];

                return data.labels!.map((label: any, i: number) => {
                  const value = dataset.data[i] ?? 0;
                  const percentage = (dataset.data[i] / dataset.data.reduce((sum:number, x:any) => sum + x, 0) )*100;
                   const color = dataset!.backgroundColor?.[i] as string;

                  return {
                    //  ${value} 
                    text: `${label}:${percentage.toFixed(1)}%`,
                     fillStyle: color,
                     strokeStyle: dataset.borderColor?.[i] as string,
                    lineWidth: dataset.borderWidth ?? 1,
                     hidden: chart.getDatasetMeta(0).data[i]?.hidden ?? false,
                    index: i
                  };
                });
              }
            },
          }
        }
      }
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    // Handle input changes here
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.Id) {
      this.createChart();


    }

  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
