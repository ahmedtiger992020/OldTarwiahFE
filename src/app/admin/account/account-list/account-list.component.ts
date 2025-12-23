import { Component, OnInit } from '@angular/core';
import { UserVM } from '../../../models/userVM';
import { PageFilter } from '../../../models/pageFilter.model';
import { Filters } from '../../../models/filters.model';
import { SortColumn } from '../../../models/sortColumn.model';
import { UserSearchCriteria } from '../../../models/userSearchCriteria';
import { AuthService } from '../../../services/auth.service';
import { MassageService } from '../../../services/massage.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  listOfData: UserVM[] = [];
  total = 0;
  loading = true;
  sortValue: string = '';
  sortKey: string = '';
  pageFilter: PageFilter = { pageIndex: 0, pageSize: 5 }
  filters: Filters = { pageFilter: this.pageFilter, searchKeyword: '' };
  sortModel: SortColumn = { columnName: this.sortKey, sortDirection: this.sortValue };
  searchCriteria: UserSearchCriteria = new UserSearchCriteria(this.filters, this.sortModel, '');

  constructor(private authService: AuthService, 
              private messageService: MassageService) {

   }

  ngOnInit() {

  }

  ngAfterContentInit(){
    this.searchData();
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
    this.authService.getIdentityUsers(this.searchCriteria).subscribe({
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
}

