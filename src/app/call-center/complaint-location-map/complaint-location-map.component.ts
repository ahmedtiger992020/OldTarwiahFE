import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MassageService } from '../../services/massage.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NzI18nService, ar_EG } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-complaint-location-map',
  templateUrl: './complaint-location-map.component.html',
  styleUrl: './complaint-location-map.component.css'
})
export class ComplaintLocationMapComponent implements OnInit, OnChanges {
  @Input() inputData: any;  
  
  myMap: google.maps.Map | undefined;
  isSpinningAddForm = false;

  direction: string = "rtl";
  currentLang: string = "ar";

  ngOnInit(): void {
    //this.setDefaultLanguage();
      
    //this.initializeMap();
  }
  
  constructor(private messageService: MassageService,
              private translate: TranslateService, 
              private i18n: NzI18nService){
  }
  
    ngOnChanges(changes: SimpleChanges): void {
        if (this.inputData != null) {
            //this.handleInputMessageChange();
        }
    }

//   setDefaultLanguage(){
//       this.translate.setDefaultLang('ar-SA');
//       this.i18n.setLocale(ar_EG);

//       this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
//           this.currentLang = event.lang;
//           this.direction = event.lang == "ar" ? "rtl" : "ltr" ;
//       });
//   }

// initializeMap() {
//     const mapElement = document.getElementById('bigMap')!;

//     this.myMap = new google.maps.Map(mapElement, {
//         center: { lat: 21.407, lng: 39.894 },
//         zoom: 10, 
//         mapTypeControl: false,
//         streetViewControl: false
//     });
//   }
}
