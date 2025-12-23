import { Component, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ComplaintVM } from '../../../models/complaintVM.model';
import { PageFilter } from '../../../models/pageFilter.model';
import { Filters } from '../../../models/filters.model';
import { SortColumn } from '../../../models/sortColumn.model';
import { ComplaintSearchCriteria } from '../../../models/complaintSearchCriteria.model';
import { ComplaintService } from '../../../services/complaint.service';
import { MassageService } from '../../../services/massage.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.css'
})
export class ComplaintListComponent implements OnInit, OnChanges {
  listOfData: ComplaintVM[] = [];
  total = 0;
  loading = true;
  sortValue: string = '';
  sortKey: string = '';
  pageFilter: PageFilter = { pageIndex: 0, pageSize: 5 }
  filters: Filters = { pageFilter: this.pageFilter, searchKeyword: '' };
  sortModel: SortColumn = { columnName: this.sortKey, sortDirection: this.sortValue };
  searchCriteria: ComplaintSearchCriteria = { filterModel: this.filters, sortModel: this.sortModel, complaintNo: '', categoryId: 0, categoryItemId: 0, 
                                              statusId: 0, sourceId: 0, mashaarId: 0, dateFrom: undefined, dateTo: undefined,blockId:'' };
  assetNo: string = '';

  constructor(private complaintService: ComplaintService,
              private modalService: NzModalService, 
              private messageService: MassageService) {

  }

  ngOnInit() {
    
  }

  ngAfterContentInit(){
    this.searchData();
  }

  ngOnChanges(){
    
  }
  
  sort($event: { key: any; value: any; }) {
    this.searchCriteria.sortModel.columnName = $event.key;
    this.searchCriteria.sortModel.sortDirection = $event.value;
    
    this.searchData();
  }
  
  onPageSizeChange($event: number) {
    this.searchCriteria.filterModel.pageFilter.pageSize = $event;
    this.searchCriteria.filterModel.pageFilter.pageIndex = 0;
    this.searchData();
  }

  searchData(){
    this.complaintService.getComplaints(this.searchCriteria).subscribe({
      next: (result) => 
        {
          if(!result.isSucess){
            this.messageService.showMessage('error', result.error);
          }
          else{
            this.total = result.total;
            this.listOfData = result.data;
          }
        },
        error: (e) => {
          this.messageService.showMessage('error', e.message);
        },
        complete: () => {
          console.info('complete');
          this.loading = false;
        }
    });
  }
  
  openComplaintDetails(complaintNo: string, template: TemplateRef<{}>) {
    this.modalService.create({
      nzTitle: 'Complaint Details',
      nzContent: template,
      nzClosable: true,
      nzFooter: [
        
      ]
    });
  }
}
