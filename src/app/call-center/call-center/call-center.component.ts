import { Component, EventEmitter, OnInit, Output, ChangeDetectorRef, SimpleChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Router } from '@angular/router';
import { MassageService } from '../../services/massage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Lockup } from '../../models/lockup.model';
import { ToiletService } from '../../services/toilet.service';
import { Toilet } from '../../models/toilet.model';
import MarkerClusterer, { MarkerClustererOptions } from '@googlemaps/markerclustererplus';
import { AreaService } from '../../services/area.service';
import { AreaVM } from '../../models/areaVM.model';
import { Observable, Observer, of } from 'rxjs';
import { Calculator } from '@angular/google-maps';
import { ComplaintEditableVM } from '../../models/complaintEditableVM.model';
import { mod, stringify } from 'ag-grid-enterprise/dist/lib/ag-charts-community/module-support';
import { ComplaintVM } from '../../models/complaintVM.model';
import { PageFilter } from '../../models/pageFilter.model';
import { Filters } from '../../models/filters.model';
import { SortColumn } from '../../models/sortColumn.model';
import { ComplaintSearchCriteria } from '../../models/complaintSearchCriteria.model';
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { Store, select } from '@ngrx/store';
import { selectCachedList } from '../../caching/cache.selectors';
import { setCachedList } from '../../caching/cache.actions';
import { filter, map } from 'rxjs/operators';
import { CategoryVM } from '../../models/categoryVM.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { NzI18nService, ar_EG, en_US } from 'ng-zorro-antd/i18n';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalService } from '../../services/modalService';
import { MashaarVM } from '../../models/mashaar.model';
import { MashaarService } from '../../services/mashaar.service';
import { SeasonService } from '../../services/season.service';
import { MapComponent, NotificationData } from '../map/map.component';
import { IComplaintDetailVM } from '../../models/complaintDetailVM';
import { DashboardService } from '../../services/dashboard.service';
import { Dashboard } from '../../models/dashboard.model';
import { ExcelService } from '../../services/excel.service';
import { NzYearPickerComponent } from 'ng-zorro-antd/date-picker';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';

declare var $: any;

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.component.html',
  styleUrl: './call-center.component.css'
})
export class CallCenterComponent implements OnInit {
    @ViewChild('checkModal') checkModalRef!: ElementRef;

  showUploadListConfig = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    showDownloadIcon: true
  };
  opendKedana=0;
  LoggedInUsername: any;
  LoggedInUserRole: any;
  addForm: any;
  advancedSearchForm: any;
  mapRemovemarker: boolean = false;
  categories: Lockup[] = [];
  subCategories: Lockup[] = [];
  selectedCategoryId: any;

  sources: Lockup[] = [];
  selectedSourceId: any;

  mashaarList: MashaarVM[] = [];
latlngmarker:any
  dashboardStatistics: Dashboard = new Dashboard(0, 0, 0, 0, 0);
  KeddanacomplaintDetailVM: any;
  Refresh: boolean = true;
  kedanaId: number | undefined;
  listOfBlocks: any[] = [];
  listofComplaintsCounts: any[] = [];
  totalOpen: number = 0;
  totalclose: number = 0;
  KedanaintervalId: any;
  ;

  complaintLocationInputData: any;
  inputData: any;
  notificationData: NotificationData = new NotificationData();

  imageBase64String: string[] = [];
  imgName: string[] = [];
  Fullelement: string[] = [];
  imageFileName: string = '';
  complaintNoSearch: string = '';
  createdComplaintNo: string = '';

  isSpinningAddForm = false;
  isSpinningSearch = false;
  defaultDateFrom: Date = new Date('2024-04-01');
  disableBeforeDate: Date = new Date('2024-03-31');
  defaultDateTo: Date = new Date('2024-04-01');
  disableAfterDate: Date = new Date('2024-03-31');
  isPinSelected: boolean = false;
  chartLebels: any[] = [1, 2, 3, 4];
  chartData: dataset[] = [{
    backgroundColor: "red",
    label: "test",
    data: [1, 3, 5]
  }];

  /////////////////////////////
  unsafeUrl = 'https://aprewfmapp001.nwc.com.sa/WFMComplaintReport_O?ccb=MOB-';
  safeUrl: SafeResourceUrl;

  direction: string = "rtl";
  currentLang: string = "ar";

  ////////////////////////////

  listOfData: ComplaintVM[] = [];
  total = 0;
  pageSizeOptions = [15, 30, 45, 60, 75];
  loading = true;
  sortValue: string = '';
  sortKey: string = '';
  pageFilter: PageFilter = { pageIndex: 0, pageSize: 15 }
  filters: Filters = { pageFilter: this.pageFilter, searchKeyword: '' };
  sortModel: SortColumn = { columnName: this.sortKey, sortDirection: this.sortValue };
  searchCriteria: ComplaintSearchCriteria = {
    filterModel: this.filters, sortModel: this.sortModel, complaintNo: '', categoryId: 0, categoryItemId: 0,
    statusId: 0, sourceId: 0, mashaarId: 0, dateFrom: undefined, dateTo: undefined, blockId: ''
  };

  complaintDetailVM = {} as IComplaintDetailVM;

  isDataCached$: Observable<boolean> = of(false);

  constructor(private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private complaintService: ComplaintService,
    private categoryService: CategoryService,
    private mashaarService: MashaarService,
    private messageService: MassageService,
    private store: Store<any>,
    private translate: TranslateService,
    private dashboardService: DashboardService,
    private i18n: NzI18nService,
    private bootstrapModalService: ModalService,
    private seasonService: SeasonService,
    private excelService: ExcelService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);
  }
  refreshDiv() {
    this.Refresh = false;
    setTimeout(() => this.Refresh = true, 0); // Small delay to trigger re-render
  }
  ngAfterContentInit(): void {
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
isOn = false;
  private intervalId: any;
  ngOnInit(): void {
     this.intervalId = setInterval(() => {
      this.isOn = !this.isOn;
    }, 1000); // Toggle every 1 second
    this.setDefaultLanguage();
    this.loadBlocks();
    let loggedInUser = this.authService.getLoggedInUser();
    this.LoggedInUsername = loggedInUser.displayName.toUpperCase();
    this.LoggedInUserRole = loggedInUser.roles;

    this.store.pipe(select(selectCachedList, { key: 'categories' })).subscribe({
      next: ({ list, isDataCached }) => {
        const list$ = of(list);

        list$.pipe(
          map((list: Lockup[]) => {
            this.categories = list;
          })
        ).subscribe();
        if (!isDataCached) {
          this.loadCategories();
        }
      }
    });

    this.store.pipe(select(selectCachedList, { key: 'Mashaar' })).subscribe({
      next: ({ list, isDataCached }) => {
        const list$ = of(list);

        list$.pipe(
          map((list: MashaarVM[]) => {
            this.mashaarList = list;
          })
        ).subscribe();
        if (!isDataCached) {
          this.loadMashaar();
        }
      }
    });

    this.initializeAddForm();
    this.initializeAdvancedSearchForm();
    this.getDashboardStatistics();

    $(document).ready(function () {
      $('.search-more').hide();

      $('.btn-search-more').click(function () {
        $('.search-more').toggle();
      });

      $('.user-dropdown').hide();

      $('.user-details').click(function () {
        $('.user-dropdown').toggle();
      });
    });

    this.loadSources();
    this.loadOpenKedana();
        this.KedanaintervalId = setInterval(() => {
    this.loadOpenKedana();
    }, 30000);
  }
   ngAfterViewInit(): void {
   if (this.checkModalRef) {
      this.renderer.listen(this.checkModalRef.nativeElement, 'hidden.bs.modal', () => {
        this.onModalClosed();
      });
    }
  }
  onModalClosed(): void {
window.location.reload();
    // Add your logic here
  }
  loadOpenKedana()
  {
     this.complaintService.GetOpendKedanaComplaints().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          if(this.opendKedana  !=  result.data)
          {
            this.Refresh = false;
          }
          this.opendKedana = result.data;
          this.Refresh = true
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      
      },
      complete: () => {

      }
    });
  }
    ngOnDestroy(): void {
    clearInterval(this.intervalId); // Clean up to avoid memory leak
    clearInterval(this.KedanaintervalId); // Clean up to avoid memory leak
  }
  loadBlocks() {
    this.complaintService.GetComplaintBlocks().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.listOfBlocks = result.data;
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
  setDefaultLanguage() {
    const lang = this.authService.getCurrentLang();
    this.currentLang = lang == null ? "ar" : this.authService.getCurrentLang();
    this.translate.setDefaultLang(this.currentLang == "ar" ? "ar-SA" : "en-US");
    this.i18n.setLocale(this.currentLang == "ar" ? ar_EG : en_US);
    this.direction = this.currentLang == "ar" ? "rtl" : "ltr";

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
      this.direction = event.lang == "ar" ? "rtl" : "ltr";

      this.authService.setCurrentLang(this.currentLang);

      this.searchData();
      this.loadCategories();
      this.loadSources();
      this.loadMashaar();
    });
  }

  getDashboardStatistics() {
    this.dashboardService.getStatistics().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.dashboardStatistics = result.data;
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>

    new Observable((observer: Observer<boolean>) => {
      //   if (this.imageBase64String != '') {
      //     this.messageService.showMessage('error', 'You can only upload one file!');
      //     observer.complete();
      //     return;
      //   }
      const isJpgOrPng = true;//file.type === 'image/jpeg' || file.type === 'image/png';
      //   if (!isJpgOrPng) {
      //     this.messageService.showMessage('error', 'You can only upload JPG file!');
      //     observer.complete();
      //     return;
      //   }
      // Determine if file is video
      //   if (file.type && file.type.startsWith('video')) {
      //     file['preview'] = true; // prevent preview
      //     file['showPreviewIcon'] = tru; // custom property (not official)
      //   } else {
      //     file['showPreviewIcon'] = true;
      //   }
      file['showPreviewIcon'] = true;
      const isLt2M = file.size! / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.messageService.showMessage('error', 'Image must smaller than 10MB!');
        observer.complete();
        return;
      }
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'mp4','gif','svg','webm','ogg'];
        const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext || !allowedExtensions.includes(ext)) {
         this.messageService.showMessage('error', 'Not Correct Type');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  handleChange($event: any) {
    if ($event.type == "removed") {
      const file: File = $event.file.originFileObj;
      const reader1 = new FileReader();
      reader1.readAsDataURL(file);
      let base64: string | null = null;

      reader1.onload = () => {
        if (((reader1.result) as string).includes('data:image/png;base64,')) {
          base64 = ((reader1.result) as string).replace('data:image/png;base64,', '');
        } else if (((reader1.result) as string).includes('data:image/jpeg;base64,')) {
          base64 = ((reader1.result) as string).replace('data:image/jpeg;base64,', '');
        } else if (((reader1.result) as string).includes('data:image/gif;base64,')) {
          base64 = ((reader1.result) as string).replace('data:image/gif;base64,', '');
        } else if (((reader1.result) as string).includes('data:image/svg;base64,')) {
          base64 = ((reader1.result) as string).replace('data:image/svg;base64,', '');
        } else if (((reader1.result) as string).includes('data:video/mp4;base64,')) {
          base64 = ((reader1.result) as string).replace('data:video/mp4;base64,', '');
        } else if (((reader1.result) as string).includes('data:video/webm;base64,')) {
          base64 = ((reader1.result) as string).replace('data:video/webm;base64,', '');
        } else if (((reader1.result) as string).includes('data:video/ogg;base64,')) {
          base64 = ((reader1.result) as string).replace('data:video/ogg;base64,', '');
        } else if (((reader1.result) as string).includes('data:application/pdf;base64,')) {
          base64 = ((reader1.result) as string).replace('data:application/pdf;base64,', '');
        }
        if (base64 && this.imageBase64String.includes(base64)) {
          const index = this.imageBase64String.indexOf(base64);
          if (index !== -1) {
            this.imageBase64String.splice(index, 1);
            this.imgName.splice(index, 1);

          }
        }
      }
      //  this.imageBase64String = [];
      return;
    }

    if (this.imageBase64String.length == 0) {
      const file: File = $event.file.originFileObj;
      const isLt2M = file.size! / 1024 / 1024 < 10;
      if (isLt2M) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let base64: string | null = null;

          if (((reader.result) as string).includes('data:image/png;base64,')) {
            base64 = ((reader.result) as string).replace('data:image/png;base64,', '');
          } else if (((reader.result) as string).includes('data:image/jpeg;base64,')) {
            base64 = ((reader.result) as string).replace('data:image/jpeg;base64,', '');
          } else if (((reader.result) as string).includes('data:image/gif;base64,')) {
            base64 = ((reader.result) as string).replace('data:image/gif;base64,', '');
          } else if (((reader.result) as string).includes('data:image/svg;base64,')) {
            base64 = ((reader.result) as string).replace('data:image/svg;base64,', '');
          } else if (((reader.result) as string).includes('data:video/mp4;base64,')) {
            base64 = ((reader.result) as string).replace('data:video/mp4;base64,', '');
          } else if (((reader.result) as string).includes('data:video/webm;base64,')) {
            base64 = ((reader.result) as string).replace('data:video/webm;base64,', '');
          } else if (((reader.result) as string).includes('data:video/ogg;base64,')) {
            base64 = ((reader.result) as string).replace('data:video/ogg;base64,', '');
          } else if (((reader.result) as string).includes('data:application/pdf;base64,')) {
            base64 = ((reader.result) as string).replace('data:application/pdf;base64,', '');
          }


          if (base64 && !this.imageBase64String.includes(base64)) {
            this.imageBase64String.push(base64);
            this.imgName.push(file.name);
          }
          //   this.imageFileName = file.name;
          //  console.log(this.imageBase64String);
        };
      } else {
        console.log('Please select file less than 10MB');
      }
    }
  }
  fileList: NzUploadFile[] = [];
  previewImage: string = '';
  previewVisible = false;
  handleCancel(): void {
    this.previewVisible = false;
  }
  previewVideoUrl: string | null = null;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || (file['preview'] as string);
    this.bootstrapModalService.openModal('imgprev');
    // if (file.url) {
    //     this.previewVideoUrl = file.url;
    //     return;
    // }
  };
  private getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  openMapFullScreen() {
        this.latlngmarker = this.notificationData.markerAddedLatLng

    this.bootstrapModalService.openModal('mapModal');
  }

  clickComplaintNoSearch() {
    this.searchCriteria.complaintNo = this.complaintNoSearch;
    this.searchData();
  }

  loadCategories() {
    this.categoryService.getCategoryLookUps().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.store.dispatch(setCachedList({ key: 'categories', list: result.data }));
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
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

  loadSources() {
    this.categoryService.getSources().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {

          this.selectedSourceId = result.data[0].id;
          this.sources = result.data;
          this.cdr.detectChanges();

        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }

  loadMashaar() {
    this.mashaarService.getAllMashaar().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.store.dispatch(setCachedList({ key: 'Mashaar', list: result.data }));
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }

  initializeAddForm() {
    this.addForm = new FormGroup({
      fieldActivityId: new FormControl(''),
      selectedCategoryId: new FormControl('', Validators.required),
      categoryItemId: new FormControl('', Validators.required),
      issuarName: new FormControl(''),
      issuarMobile: new FormControl('', Validators.pattern(/05\d{8}$/)),
      description: new FormControl('', Validators.required),
      mentinanceArea: new FormControl(''),
      agentLocation: new FormControl(''),
      agentOs: new FormControl(''),
      agentLanguage: new FormControl(''),
      malekComplaintNo: new FormControl('', Validators.pattern(/\d$/))
    });
    this.fileList = [];
    this.mapRemovemarker = true;
    // this.handleChildNotification({ id: this.notificationData.id, defaultAssetId: this.notificationData.defaultAssetId, markerAddedLatLng: this.notificationData.markerAddedLatLng, action: 'removeMarker' });
  }

  initializeAdvancedSearchForm() {
    this.advancedSearchForm = new FormGroup({
      selectedCategoryId_Search: new FormControl(0),
      categoryItemId_Search: new FormControl(0),
      statusId_Search: new FormControl(0),
      mashaarId_Search: new FormControl(0),
      sourceId_Search: new FormControl(0),
      blockId_Search: new FormControl(""),
      dateFrom_Search: new FormControl(null),
      dateTo_Search: new FormControl(null)
    });
  }

  onSelectionChange($event: Event) {
    const selectedValue = ($event.target as HTMLInputElement).value;
    this.selectedCategoryId = selectedValue;

    this.loadSubCategories();
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  async submitAdvancedSearch(model: any) {
    if (!this.advancedSearchForm.valid) {
      return;
    }

    this.isSpinningSearch = true;

    this.searchCriteria.complaintNo = this.complaintNoSearch;
    this.searchCriteria.categoryId = model.selectedCategoryId_Search;
    this.searchCriteria.categoryItemId = model.selectedCategoryId_Search > 0 ? model.categoryItemId_Search : 0;
    this.searchCriteria.statusId = model.statusId_Search;
    this.searchCriteria.blockId = model.blockId_Search;
    this.searchCriteria.mashaarId = model.mashaarId_Search;
    this.searchCriteria.sourceId = model.sourceId_Search;
    this.searchCriteria.dateFrom = model.dateFrom_Search;
    this.searchCriteria.dateTo = model.dateTo_Search;
    this.searchData();
  }
handelbigmabnotify(latlng:any)
{

      this.notificationData.markerAddedLatLng = latlng;
      this.mapRemovemarker=false;
this.inputData = `${this.notificationData.markerAddedLatLng};`;
}
  handleChildNotification(_notification: NotificationData): void {
    ;
    this.notificationData.id = _notification.id;
    this.notificationData.defaultAssetId = _notification.defaultAssetId;
    this.notificationData.markerAddedLatLng = _notification.markerAddedLatLng;
    this.notificationData.action = _notification.action;
    this.notificationData.blockNumberDesc = _notification.blockNumberDesc;
    if(_notification.blockNumber && _notification.blockNumber!= this.notificationData.blockNumber)
    {
      this.loadBlockComplain( _notification.blockNumber)
    }
    this.notificationData.blockNumber = _notification.blockNumber;
    if (_notification.action != "removeMarker") {
      this.mapRemovemarker = false;
    }
    // if (_notification.markerAddedLatLng != "undefined" && _notification.defaultAssetId != "undefined") {
    //   this.inputData = `${_notification.markerAddedLatLng};${_notification.id};${this.notificationData.defaultAssetId};${_notification.action}`;
    // }
    // else {
    //   this.inputData = `undefined;${_notification.id};${undefined};${undefined}`;
    // }
  }
  showDetailes = false;
  sensorData: any;
  ListsensorData: any[] = [];
  popupimg = ""
  prevSensor() {
    this.sensorData = this.ListsensorData[--this.currentindex]
    this.drawmodelsensor(this.sensorData);

  }
  nextSensor() {
    this.sensorData = this.ListsensorData[++this.currentindex]
    this.drawmodelsensor(this.sensorData);

  }
  drawmodelsensor(data: any) {
    switch (this.sensorData.pressureStatus) {
      case 0:
        this.popupimg = '/assets/images/SenGray.png';
        break;
      case 1:
        this.popupimg = '/assets/images/SenGreen.png';

        break;
      case 2:
        this.popupimg = '/assets/images/SenYellow.png';

        break;
      case 3:
        this.popupimg = '/assets/images/SenRed.png';

        break;
      default:
        break;
    }
    this.complaintService.getSensorHistory(this.sensorData.tagName).subscribe({
      next: (result) => {
        console.log(result.data)
        this.chartLebels = result.data!.map((c: any) => c.hourlyTimestamp)
        var charthistorydata = result.data!.map((c: any) => c.avgValue)
        this.chartData = [{
          label: "historyData",
          data: charthistorydata,
          backgroundColor: 'rgb(4, 164, 147)',
        }]
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);

      },
      complete: () => {
        this.cdRef.detectChanges();

        $('#sensorpopup').modal('show');

      }
    });


  }
  currentindex = 0
  popupMap(listdata: any) {
    this.currentindex = 0
    this.ListsensorData = listdata.data;
      this.showDetailes = listdata.showDetailes;

    this.sensorData = this.ListsensorData[this.currentindex];
    if(this.showDetailes)
    {
    this.drawmodelsensor(this.ListsensorData[this.currentindex]);

    }else{
      this.DrawSensorBlock( this.ListsensorData);
    }
    // var imgurl = "";


    //this.bootstrapModalService.openModal('sensorpopup');


  }
  DrawSensorBlock(list : any)
  {

  }
  hidesensorDetailes() {
    this.showDetailes = false;

  }
  modeladded: any
  async submitForm(model: ComplaintEditableVM) {
      //  this.loadBlockComplain("98")
    //   debugger
    // model.blockId = this.notificationData.blockNumber;

    if (this.addForm.valid) {
      if (this.notificationData.defaultAssetId == '' || this.notificationData.defaultAssetId == undefined || this.notificationData.markerAddedLatLng == undefined) {
        this.messageService.showMessage('error', 'قم بإختيار الموقع اولا');
        return;
      }
      this.modeladded = model;
      this.confirmadded()
      //this.loadBlockComplain(this.notificationData.blockNumber)

    }
    else {
      Object.keys(this.addForm.controls).forEach(key => {
        this.addForm.controls[key].markAsDirty();
      });
    }
  }
 async confirmadded() {
            // this.bootstrapModalService.openModal('checkModal');

          //  this.bootstrapModalService.closeModal('confirmAdd');
    var model = this.modeladded;
    this.isSpinningAddForm = true;
    model.sourceId = this.selectedSourceId;
    model.malekComplaintNo = String(model.malekComplaintNo);
    const lat = JSON.parse(this.notificationData.markerAddedLatLng).lat;
    const lng = JSON.parse(this.notificationData.markerAddedLatLng).lng;

    const utmObj = await this.complaintService.getUTM(`${lng},${lat}`).toPromise();

    model.utm = `${utmObj.geometries[0].x} ${utmObj.geometries[0].y}`;

    model.agentLocation = `${lat},${lng}`;

    model.assetNumber = this.notificationData.defaultAssetId;
    model.wgs84 = `${lng},${lat}`;
    model.images = [];
    model.kedanaId = this.kedanaId!;
    model.blockId = this.notificationData.blockNumber;
    if (this.imageBase64String.length != 0) {
      for (let index = 0; index < this.imageBase64String.length; index++) {
        model.images.push({ fileBase64: this.imageBase64String[index], fileName: this.imgName[index] })
      }
    }
    this.complaintService.addComplaint(model).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.createdComplaintNo = result.data;
          this.bootstrapModalService.openModal('checkModal');
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
        this.isSpinningAddForm = false;
      },
      complete: () => {
        this.refreshDiv();
        this.initializeAddForm();
        this.searchData();
        this.isSpinningAddForm = false;
      }
    });
  }
  /////////////////////////////


  sort($event: { key: any; value: string; }) {
    this.searchCriteria.sortModel.columnName = $event.key;
    this.searchCriteria.sortModel.sortDirection = $event.value;

    this.searchData();
  }

  onPageSizeChange($event: number) {
    this.searchCriteria.filterModel.pageFilter.pageSize = $event;
    this.searchCriteria.filterModel.pageFilter.pageIndex = 0;
    this.searchData();
  }

  searchData() {
    this.complaintService.getComplaints(this.searchCriteria).subscribe({
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

  getComplaintDetails(id: any) {
    this.complaintService.getComplaint(id).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          if (result.data != null) {
            this.complaintDetailVM = result.data;
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

  switchLanguage(): void {
    this.translate.use(this.currentLang == "ar" ? "en" : "ar");
  }

  signout() {
    this.authService.signout();
  }

  openComplaintDetailsModal(id: number) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.unsafeUrl}${id}`);

    this.getComplaintDetails(id);

    this.bootstrapModalService.openModal('complaintDetailsModal');
  }

  openComplaintLocation(lat: number, lng: number) {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;

    window.open(url, '_blank');
    // this.complaintLocationInputData = "";
    // this.bootstrapModalService.openModal('checkModal');
  }

  openImageInPopup(imageUrl: string): void {
    this.bootstrapModalService.openModal('complaintImageModal');
  }

  getImageUrl(imageUrl: string): string {
    return imageUrl ? imageUrl : '';
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
    const _searchCriteria: ComplaintSearchCriteria = this.searchCriteria;
    _searchCriteria.filterModel.pageFilter.pageSize = 10000;

    this.complaintService.getComplaints(_searchCriteria).subscribe({
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
              // id: x.id, 
              complaintNo: x.complaintNo,
              date: formattedDate,
              //  assetNo: x.assetNo, 
              mantinanceArea: x.mantinanceArea,
              issuerName: x.issuerName,
              issuerMobile: x.issuerMobile,
              description: x.description,
              category: x.category,
              subCategory: x.subCategory,
              mashaarName: x.mashaarName,
              statusAr: x.statusAr,
              statusEn: x.statusEn,
              sourceAr: x.sourceAr,
              sourceEn: x.sourceEn,
              lat: x.lat,
              lng: x.lng,
              KedanaNumber: x.kedanaNumber,
              AgentFeedbackAr: x.agentFeedbackAr,
              AgentFeedbackEn: x.agentFeedbackEn,
              CompleteRemark: x.completeRemark,
              SupervisorNote: x.supervisorNote,
              LastUpdateDate: x.lastUpdateDate
            });
          });

          this.excelService.exportToExcel(list, `Complaints_${today}`, 'Complaints');
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }

  exportDashboardToExcel(): void {
    let today = new Date().toLocaleDateString();

    this.dashboardService.getCallCenterRowData().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.excelService.exportToExcel(result.data, `CallCenter${today}`, 'CallCenterRowData');
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }
  handelAddComplain(data: any) {
    this.isSpinningAddForm = true;

    this.imageBase64String = [];
    this.imgName = [];
    this.fileList = [];
    this.complaintService.getKedanaComplaint(data.id).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          if (result.data != null) {
            var base64 = "";
            var index = 0;
            this.KeddanacomplaintDetailVM = result.data;

            this.KeddanacomplaintDetailVM.images.forEach((Fullelement: any) => {
              //  this.handlePreview(file);
              ;
              var element = Fullelement.fileBase64;
              const newFile: NzUploadFile = {

                uid: index.toString(),
                name: Fullelement.fileName,
                status: 'done',
                url: element,
                thumbUrl: element // for preview thumbnail

              };

              // Trigger change detection
              this.fileList = [...this.fileList, newFile];


              index++;
              if (((element) as string).includes('data:image/png;base64,')) {
                base64 = ((element) as string).replace('data:image/png;base64,', '');
              } else if (((element) as string).includes('data:image/jpeg;base64,')) {
                base64 = ((element) as string).replace('data:image/jpeg;base64,', '');
              } else if (((element) as string).includes('data:image/gif;base64,')) {
                base64 = ((element) as string).replace('data:image/gif;base64,', '');
              } else if (((element) as string).includes('data:image/svg;base64,')) {
                base64 = ((element) as string).replace('data:image/svg;base64,', '');
              } else if (((element) as string).includes('data:video/mp4;base64,')) {
                base64 = ((element) as string).replace('data:video/mp4;base64,', '');
              } else if (((element) as string).includes('data:video/webm;base64,')) {
                base64 = ((element) as string).replace('data:video/webm;base64,', '');
              } else if (((element) as string).includes('data:video/ogg;base64,')) {
                base64 = ((element) as string).replace('data:video/ogg;base64,', '');
              } else if (((element) as string).includes('data:application/pdf;base64,')) {
                base64 = ((element) as string).replace('data:application/pdf;base64,', '');
              }
              this.imageBase64String.push(base64);
              this.imgName.push(Fullelement.fileName);
            });

          }
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
        this.isSpinningAddForm = false;
      }
    });
    var elements = document.getElementsByClassName("nav-link");
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      el.classList.remove("active")
    }
    var element3 = document.getElementById("navdash-1")
    element3?.classList.add("active");
    var element1 = document.getElementById("dash-22")
    element1?.classList.remove("active");
    element1?.classList.remove("show");
    var element2 = document.getElementById("dash-1")
    element2?.classList.add("active");
    element2?.classList.add("show");
    console.log(data);
    this.addForm.get('issuarName')?.setValue(data.issuerName);
    this.addForm.get('issuarMobile')?.setValue(data.issuerMobile);
    this.addForm.get('description')?.setValue(data.description);
    this.addForm.get('mentinanceArea')?.setValue(data.mantinanceArea);
    this.addForm.get('agentLocation')?.setValue(data.lat + ',' + data.lng);
    this.addForm.get('malekComplaintNo')?.setValue(data.kedanaNumber);
    this.selectedSourceId = data.sourceId;
    ;
    this.kedanaId = data.id;
    if (data.lat != "" && data.lng != "") {
      
      this.mapRemovemarker = false;
      this.inputData = `{"lat":${data.lat},"lng":${data.lng}};`;
      this.notificationData.markerAddedLatLng = `{"lat":${data.lat},"lng":${data.lng}}`
    } else {
      this.notificationData.defaultAssetId = undefined;
      this.notificationData.markerAddedLatLng = undefined;
      this.mapRemovemarker = true;

    }
    // this.notificationData.defaultAssetId=
    //    this.addForm = new FormGroup({
    //     fieldActivityId: new FormControl(''),
    //     selectedCategoryId: new FormControl('', Validators.required),
    //     categoryItemId: new FormControl('', Validators.required),
    //     issuarName: new FormControl(''),
    //     issuarMobile: new FormControl('', Validators.pattern(/05\d{8}$/)),
    //     description: new FormControl('', Validators.required),
    //     mentinanceArea: new FormControl(''),
    //     agentLocation: new FormControl(''),
    //     agentOs: new FormControl(''),
    //     agentLanguage: new FormControl(''),
    //     MalekComplaintNo: new FormControl('', Validators.pattern(/\d$/))
  }
  IsImge(data: string) {

    if (data.includes("image")) {
      return true;
    }
    return false;
  }
  ispdf(data: string) {
    return data.includes("pdf");
  }
  isvedio(data: string) {
    return data.includes("video");
  }
  loadPdf(base64: string) {


    const dataUrl = base64; //`data:application/pdf;base64,${base64PdfSample}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
  }
  openListTab() {
    this.bootstrapModalService.closeModal('confirmAdd');

    this.searchCriteria.filterModel.pageFilter.pageIndex = 0;
    this.searchCriteria.blockId =     this.notificationData.blockNumber ;
    this.searchData()
    var elements = document.getElementsByClassName("nav-link");
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i] as HTMLElement;
      el.classList.remove("active")
    }
    var element3 = document.getElementById("navdash-2")
    element3?.classList.add("active");
    var element1 = document.getElementById("dash-1")
    element1?.classList.remove("active");
    element1?.classList.remove("show");
    var element2 = document.getElementById("dash-2")
    element2?.classList.add("active");
    element2?.classList.add("show");
  }
  loadBlockComplain(blockid: any) {

    this.complaintService.GetComplaintsCounts(blockid).subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          this.listofComplaintsCounts = result.data.result
          this.totalOpen = this.listofComplaintsCounts.reduce((sum, item) => sum + item.opendComplaintsCount, 0);
          this.totalclose = this.listofComplaintsCounts.reduce((sum, item) => sum + item.closedComplaintsCount, 0);

        //  this.bootstrapModalService.openModal('confirmAdd');

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
export class dataset {
  label?: string;
  data?: number[];
  backgroundColor?: string
}