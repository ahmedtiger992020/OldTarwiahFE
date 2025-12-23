import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ComplaintSearchCriteria, KedanaComplaintSearchCriteria } from '../../models/complaintSearchCriteria.model';
import { Filters } from '../../models/filters.model';
import { SortColumn } from '../../models/sortColumn.model';
import { PageFilter } from '../../models/pageFilter.model';
import { ComplaintService } from '../../services/complaint.service';
import { MassageService } from '../../services/massage.service';
import { ComplaintVM } from '../../models/complaintVM.model';
import { CategoryService } from '../../services/category.service';
import { Lockup } from '../../models/lockup.model';
import { MashaarVM } from '../../models/mashaar.model';
import { ExcelService } from '../../services/excel.service';
import { format } from 'date-fns';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalService } from '../../services/modalService';
import { IComplaintDetailVM } from '../../models/complaintDetailVM';
import { FormControl, FormGroup } from '@angular/forms';
import { SeasonService } from '../../services/season.service';
@Component({
  selector: 'app-kedana-complaint-list',
  templateUrl: './kedana-complaint-list.component.html',
  styleUrl: './kedana-complaint-list.component.css'
})
export class KedanaComplaintListComponent {
  @Output() AddComplain: EventEmitter<any> = new EventEmitter<any>()
  unsafeUrl = 'https://aprewfmapp001.nwc.com.sa/WFMComplaintReport_O?ccb=MOB-';
  safeUrl: SafeResourceUrl;
  direction: string = "rtl";
  currentLang: string = "ar";
  advancedSearchForm: any;
  selectedCategoryId: any;
  categories: Lockup[] = [];
  mashaarList: MashaarVM[] = [];
  defaultDateFrom: Date = new Date('2024-04-01');
  disableBeforeDate: Date = new Date('2024-03-31');
  defaultDateTo: Date = new Date('2024-04-01');
  disableAfterDate: Date = new Date('2024-03-31');
  isPinSelected: boolean = false;
  subCategories: Lockup[] = [];
  complaintDetailVM: any;
  pageSizeOptions = [15, 30, 45, 60, 75];

  listOfData: any[] = [];
  total = 0;
  loading = true;
  isSpinningSearch = false;
  complaintNoSearch: string = '';
  sortValue: string = '';
  sortKey: string = '';
  pageFilter: PageFilter = { pageIndex: 0, pageSize: 15 }
  filters: Filters = { pageFilter: this.pageFilter, searchKeyword: '' };
  sortModel: SortColumn = { columnName: this.sortKey, sortDirection: this.sortValue };
  searchCriteria: KedanaComplaintSearchCriteria = { filterModel: this.filters, sortModel: this.sortModel, complaintNo: '', assetNo: '', issuerMobile: "", issuerName: '', sourceId: 0, statusId: 0, dateFrom: undefined, dateTo: undefined };

  /**
   *
   */
  constructor(private complaintService: ComplaintService,
    private messageService: MassageService,
    private categoryService: CategoryService,
    private excelService: ExcelService,
    private sanitizer: DomSanitizer,
    private seasonService: SeasonService,
    private bootstrapModalService: ModalService,




  ) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);

  }


  ngAfterContentInit() {
    this.initializeAdvancedSearchForm()
    this.searchData();
    this.seasonService.getActiveSeason().subscribe(result => {
      if (result && result.data && result.data.startDate) {
        const seasonStartDate = new Date(result.data.startDate);
        const seasonEndDate = new Date(result.data.endDate);

        this.disableBeforeDate = seasonStartDate;
        this.defaultDateFrom = seasonStartDate;

        this.disableAfterDate = seasonEndDate;
        this.defaultDateTo = seasonEndDate;

        this.searchCriteria.dateFrom = this.defaultDateFrom;
        this.searchCriteria.dateTo = this.defaultDateTo;

        //this.searchData();
      }
    });
  }
  initializeAdvancedSearchForm() {
    this.advancedSearchForm = new FormGroup({
      Accept_Search: new FormControl(0),
      //  categoryItemId_Search: new FormControl(0),
      //  statusId_Search: new FormControl(0),
      //  mashaarId_Search: new FormControl(0),
      //  sourceId_Search: new FormControl(0),
      issuerMobile_Search: new FormControl(""),
      issureName_Search: new FormControl(""),
      dateFrom_Search: new FormControl(null),
      dateTo_Search: new FormControl(null)
    });
  }


  clickComplaintNoSearch() {
    this.searchCriteria.complaintNo = this.complaintNoSearch;
    this.searchData();
  }
  searchData() {
    this.complaintService.getKedanaComplaints(this.searchCriteria).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.total = result.total;
          this.listOfData = result.data;
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
        this.loading = false;
        this.isSpinningSearch = false;
      },
      complete: () => {
        this.loading = false;
        this.isSpinningSearch = false;
      }
    });
  }
  async submitAdvancedSearch(model: any) {
    if (!this.advancedSearchForm.valid) {
      return;
    }

    this.isSpinningSearch = true;

    this.searchCriteria.complaintNo = this.complaintNoSearch;

    this.searchCriteria.issuerName = model.issureName_Search;
    this.searchCriteria.issuerMobile = model.issuerMobile_Search;
      this.searchCriteria.statusId = model.Accept_Search ;
    this.searchCriteria.dateFrom = model.dateFrom_Search;
    this.searchCriteria.dateTo = model.dateTo_Search;
    this.searchData();
  }
  onSelectionChange($event: Event) {
    const selectedValue = ($event.target as HTMLInputElement).value;
    this.selectedCategoryId = selectedValue;

    this.loadSubCategories();
  }
  loadSubCategories() {
    this.categoryService.getCategoryItems(this.selectedCategoryId).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.subCategories = result.data;
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }
  disabledDateBefore = (current: Date): boolean => {
    const currentDate = new Date(current);
    return currentDate < this.disableBeforeDate || currentDate > this.disableAfterDate;
  }
  disabledDateAfter = (current: Date): boolean => {
    const currentDate = new Date(current);
    return currentDate < this.disableBeforeDate || currentDate > this.disableAfterDate;
  }
  exportComplaintsToExcel(): void {
    const _searchCriteria: KedanaComplaintSearchCriteria = this.searchCriteria;
    _searchCriteria.filterModel.pageFilter.pageSize = 10000;

    this.complaintService.getKedanaComplaints(_searchCriteria).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          let today = new Date().toLocaleDateString();

          const list: any[] = [];
          result.data.forEach((x: any) => {
            const formattedDate = format(x.date, 'yyyy-MM-dd HH:MM:SS');

            list.push({
              complaintNo: x.complaintNo,
              date: formattedDate,
              issuerName: x.issuerName,
              issuerMobile: x.issuerMobile,
              description: x.description,
              lat: x.lat,
              lng: x.lng,
              KedanaNumber: x.kedanaNumber,
              LastUpdateDate: x.lastUpdateDate
            });
          });

          this.excelService.exportToExcel(list, `KedanaComplaints_${today}`, 'Complaints');
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }
  openComplaintDetailsModal(id: number) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.unsafeUrl}${id}`);

    this.getComplaintDetails(id);

  }
  deatilsShow = false;
  closemodel() {
    this.deatilsShow = false;
  }
  getComplaintDetails(id: any) {
    this.complaintService.getKedanaComplaint(id).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          if (result.data != null) {
            ;
            this.complaintDetailVM = result.data;
            // this.bootstrapModalService.openModal('lol');
            this.deatilsShow = true;
          }
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  IsImge(data: string) {

    if (data.includes("image")) {
      return true;
    }
    return false;
  }
  ispdf(data: string) {
    return data.includes("application/pdf");
  }
  isvedio(data: string) {
    return data.includes("video");
  }
  rejectReason = false;
  rejectId: any;
  hideReason() {
    this.rejectReason = false;
    this.selectedReason = undefined;

  }
  rejectComplaint(id: any) {
    debugger
    this.rejectReason = true;
    this.rejectId = id;

  }
  selectedReason: any
  rejectConfirm() {
    this.rejectReason = false;

    this.complaintService.rejectKedanaComplaint(this.rejectId, this.selectedReason).subscribe({
      next: (result) => {
        if (result) {
          this.rejectReason = false;
          this.selectedReason = undefined;
          this.searchData();
          this.messageService.showMessage('info', "Record has been rejected");

        } else {
          this.messageService.showMessage('error', "Error while Record rejecting");

        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  openComplaintLocation(lat: number, lng: number, link = null) {
    if (link) {
      window.open(link, '_blank');
    } else {
      const url = `https://www.google.com/maps?q=${lat},${lng}`;

      window.open(url, '_blank');
    }

    // this.complaintLocationInputData = "";
    // this.bootstrapModalService.openModal('checkModal');
  }
  onPageSizeChange($event: number) {
    this.searchCriteria.filterModel.pageFilter.pageSize = $event;
    this.searchCriteria.filterModel.pageFilter.pageIndex = 0;
    this.searchData();
  }

  getImageUrl(imageUrl: string): string {
    return imageUrl ? imageUrl : '';
  }
  imgeshow = false;
  viewImge: any;
  openImageInPopup(imageUrl: string): void {
    // this.bootstrapModalService.openModal('KedanacomplaintImageModal');
    this.imgeshow = true;
    this.viewImge = this.getImageUrl(imageUrl);
  }
  closeimgmodal() {
    this.imgeshow = false;

  }
  acceptComplain(data: any) {
    //  console.log(data)
    this.AddComplain.emit(data);
  }
  ngOnChanges(changes: SimpleChanges): void {


  }
  loadPdf(base64: string) {


    const dataUrl = base64; //`data:application/pdf;base64,${base64PdfSample}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
  }
}
