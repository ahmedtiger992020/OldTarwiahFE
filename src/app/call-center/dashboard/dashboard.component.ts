import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { MassageService } from '../../services/massage.service';
import { dataset } from '../call-center/call-center.component';
import { SeasonService } from '../../services/season.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  GetKedanaStatisticsPieChartLabel: any[] = [];
  GetKedanaStatisticsPieChartData: any[] = [];
  GetComplaintsStatisticsPieChartLabel: any[] = [];
  GetComplaintsStatisticsPieChartData: any[] = [];
  GetComplaintsBySourcePieChartLabel: any[] = [];
  GetComplaintsBySourcePieChartData: any[] = [];
  GetKedanaComplaintsPieChartLabel: any[] = [];
  GetKedanaComplaintsPieChartData: any[] = [];
  GetKedanaBraManualPieChartLabel: any;
  GetKedanaBraManualPieChartData: any;
  GetComplaintsByUserBarChartLabel: any;
  GetComplaintsByUserBarChartData: dataset[] = [];
  GetComplaintsByDayBarChartLabel: any;
  GetComplaintsByDayBarChartData: dataset[] = [];
  GetComplaintsByMashaarPieChartLabel: any;
  GetComplaintsByMashaarPieChartData: any;
  GetComplaintsByMantinanceAreaBarChartLabel: any;
  GetComplaintsByMantinanceAreaBarChartData: dataset[] = [];
  GetKedanaStatisticsPieChartTotal: any;
  GetComplaintsStatisticsPieChartTotal: any;
  GetComplaintsBySourcePieChartTotal: any;
  GetKedanaComplaintsPieChartTotal: any;
  GetKedanaBraManualPieChartTotal: any;
  GetComplaintsByMashaarPieChartTotal: any;
  intervalId: any;
  DateFrom: any = null;
  DateTo: any = null;
  GetDateFrom: Date | null = null;
  GetDateTo: Date | null = null;
  disableBeforeDate: Date = new Date('2024-03-31');
  disableAfterDate: Date = new Date('2024-03-31');
  cardsData: any;
  /**
   *
   */
  constructor(private dashboardService: DashboardService,
    private messageService: MassageService,
    private seasonService: SeasonService,
  ) {

  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clean up to avoid memory leak
  }
  ngOnInit(): void {
    this.GetData()
    this.intervalId = setInterval(() => {
      this.GetData();
    }, 300000);


    this.seasonService.getActiveSeason().subscribe(result => {
      if (result && result.data && result.data.startDate) {
        const seasonStartDate = new Date(result.data.startDate);
        const seasonEndDate = new Date(result.data.endDate);

        this.disableBeforeDate = seasonStartDate;

        this.disableAfterDate = seasonEndDate;


        //this.searchData();
      }
    });
  }
  GetData(): void {
    this.dashboardService.GetComplaintStatistics(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.cardsData = result.data;
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetKedanaStatisticsPieChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.GetKedanaStatisticsPieChartTotal = result.data.reduce((sum: number, x: any) => sum + x.value, 0);

          this.GetKedanaStatisticsPieChartLabel = result.data.map((x: any) => x.name);
          this.GetKedanaStatisticsPieChartData = result.data.map((x: any) => x.value);
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetComplaintsStatisticsPieChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.GetComplaintsStatisticsPieChartTotal = result.data.reduce((sum: number, x: any) => sum + x.value, 0);

          this.GetComplaintsStatisticsPieChartLabel = result.data.map((x: any) => x.name);
          this.GetComplaintsStatisticsPieChartData = result.data.map((x: any) => x.value);
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetComplaintsBySourcePieChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          ////
          this.GetComplaintsBySourcePieChartTotal = result.data.reduce((sum: number, x: any) => sum + x.value, 0);

          this.GetComplaintsBySourcePieChartLabel = result.data.map((x: any) => x.name);
          this.GetComplaintsBySourcePieChartData = result.data.map((x: any) => x.value);


        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetKedanaComplaintsPieChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          const ListData = result.data.filter((x: any) => x.name !== '')
          this.GetKedanaComplaintsPieChartTotal = ListData.reduce((sum: number, x: any) => sum + x.value, 0);

          this.GetKedanaComplaintsPieChartLabel = ListData.map((x: any) => x.name);
          this.GetKedanaComplaintsPieChartData = ListData.map((x: any) => x.value);
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetKedanaBraManualPieChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          ////
          this.GetKedanaBraManualPieChartTotal = result.data.reduce((sum: number, x: any) => sum + x.value, 0);
          this.GetKedanaBraManualPieChartLabel = result.data.map((x: any) => x.name);
          this.GetKedanaBraManualPieChartData = result.data.map((x: any) => x.value);
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetComplaintsByMashaarPieChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          ////
          this.GetComplaintsByMashaarPieChartTotal = result.data.reduce((sum: number, x: any) => sum + x.value, 0);

          this.GetComplaintsByMashaarPieChartLabel = result.data.map((x: any) => x.name);
          this.GetComplaintsByMashaarPieChartData = result.data.map((x: any) => x.value);
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetComplaintsByUserBarChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          ////

          this.GetComplaintsByUserBarChartLabel = result.data.map((x: any) => x.name);
          this.GetComplaintsByUserBarChartData = [
            {
              label: "Count",
              data: result.data.map((x: any) => x.value),
              backgroundColor: 'rgb(60, 190, 140)',
            },
            {
              label: "Reject",
              data: result.data.map((x: any) => x.value2),
              backgroundColor: 'rgb(179, 179, 179)',
            },
          ]
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetComplaintsByDayBarChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          ////
          this.GetComplaintsByDayBarChartLabel = result.data.map((x: any) => x.name);
          this.GetComplaintsByDayBarChartData = [
            {
              label: "Count",
              data: result.data.map((x: any) => x.value),
              backgroundColor: 'rgb(60, 190, 140)',
            }, {
              label: "Reject",
              data: result.data.map((x: any) => x.value2),
              backgroundColor: 'rgb(179, 179, 179)',
            }
          ]
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });
    this.dashboardService.GetComplaintsByMantinanceAreaBarChart(this.DateFrom, this.DateTo).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          ////
          this.GetComplaintsByMantinanceAreaBarChartLabel = result.data.map((x: any) => x.name);
          this.GetComplaintsByMantinanceAreaBarChartData = [
            {
              label: "المكتملة",
              data: result.data.map((x: any) => x.value),
              backgroundColor: 'rgb(60, 190, 140)',
            }, {
              label: "البلاغات الملغاة / تم اعادتها لكدانه لعدم الاختصاص من الفرق الميدانية",
              data: result.data.map((x: any) => x.value2),
              backgroundColor: 'rgb(179, 179, 179)',
            },
            {
              label: "تحت المعالجة",
              data: result.data.map((x: any) => x.value3),
              backgroundColor: 'rgb(227, 194, 45)',
            }
          ]
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {

      }
    });


  }
  ngOnChanges(changes: SimpleChanges): void {


  }
  disabledDateBefore = (current: Date): boolean => {
    const currentDate = new Date(current);
    return currentDate < this.disableBeforeDate || currentDate > this.disableAfterDate;
  }

  disabledDateAfter = (current: Date): boolean => {
    const currentDate = new Date(current);
    return currentDate < this.disableBeforeDate || currentDate > this.disableAfterDate;
  }
  search() {
    
    if (this.GetDateFrom) {
      this.DateFrom = this.GetDateFrom!.toISOString();

    } else {
      this.DateFrom = null;
    }
    if (this.GetDateTo) {
      this.DateTo = this.GetDateTo!.toISOString();

    } else {
      this.DateTo = null
    }

    this.GetData()
  }
}
