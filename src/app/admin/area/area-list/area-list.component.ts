import { Component, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Lockup } from '../../../models/lockup.model';
import { PageFilter } from '../../../models/pageFilter.model';
import { Filters } from '../../../models/filters.model';
import { SortColumn } from '../../../models/sortColumn.model';
import { AreaSearchCriteria } from '../../../models/areaSearchCriteria.model';
import { AreaService } from '../../../services/area.service';
import { MassageService } from '../../../services/massage.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.css'
})
export class AreaListComponent implements OnInit {
  fileList: File[] = [];
  customFormData = { fileType: 'json' };
  listOfData: Lockup[] = [];
  total = 0;
  loading = true;
  sortValue: string = '';
  sortKey: string = '';
  pageFilter: PageFilter = { pageIndex: 0, pageSize: 5 }
  filters: Filters = { pageFilter: this.pageFilter, searchKeyword: '' };
  sortModel: SortColumn = { columnName: this.sortKey, sortDirection: this.sortValue };
  searchCriteria: AreaSearchCriteria = new AreaSearchCriteria(this.filters, this.sortModel, '');

  constructor(private areaService: AreaService, 
              private modalService: NzModalService,
              private messageService: MassageService) {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {

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
    this.areaService.getAreas(this.searchCriteria).subscribe({
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
  
  onFileSelected(event: any) {
     console.log(this.fileList);     
     console.log(event);
     this.fileList.push(<File>event.target.files[0]);
  }
  
  onUpload() {
    if(this.fileList.length > 0){
    const formData = new FormData();
    formData.append('file', this.fileList[0]);

    this.areaService.importFile(formData).subscribe({
      next: (result) => 
      {
        if(!result.isSucess){
          this.messageService.showMessage('error', 'Error in uploading file');
        }
        else{
          this.messageService.showMessage('success', 'File uploaded successfully');
          this.searchData();
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
        this.modalService.closeAll();
        console.info('complete');
      }
    });
  }
  else{
    this.messageService.showMessage('warning', 'Please select file to upload');
  }
  }

  openModalWithTemplate(template: TemplateRef<{}>): void {
    this.modalService.create({
      nzTitle: 'Import JSON File',
      nzContent: template,
      nzClosable: true,
      nzFooter: [
        {
          label: 'Cancel',
          class: 'btn btn-outline-primary',
          onClick: () => {
            this.modalService.closeAll();
          }
        }
      ]
    });
  }
}
