import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboard: any;

  constructor(private dashboardService: DashboardService){

  }

  ngOnInit(): void {

  }

  ngAfterContentInit(){
    this.getStatistics();
  }

  getStatistics(){
    this.dashboardService.getStatistics().subscribe(result => {
      this.dashboard = result.data;
    });
  }
}
