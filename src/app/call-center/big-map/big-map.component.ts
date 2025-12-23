import { Component, EventEmitter, Output, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MassageService } from '../../services/massage.service';
import { Store, select } from '@ngrx/store';
import { selectCachedList } from '../../caching/cache.selectors';
import { map, of } from 'rxjs';
import { AreaVM } from '../../models/areaVM.model';
import { ToiletService } from '../../services/toilet.service';
import { AreaService } from '../../services/area.service';
import { setCachedList } from '../../caching/cache.actions';
import { MarkerClustererOptions } from '@googlemaps/markerclustererplus';
import { ModalService } from '../../services/modalService';
import { NotificationData } from '../map/map.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NzI18nService, ar_EG } from 'ng-zorro-antd/i18n';
import { GisService } from '../../services/gis.service';
import { ComplaintService } from '../../services/complaint.service';
import { de, el } from 'date-fns/locale';
import { style } from '@angular/animations';
import { MapSericeService } from '../../services/map-serice.service';
import { Color } from 'ag-grid-enterprise/dist/lib/ag-charts-community/sparklines-util';

@Component({
  selector: 'app-big-map',
  templateUrl: './big-map.component.html',
  styleUrl: './big-map.component.css'
})

export class BigMapComponent implements OnInit, OnChanges {
  @Input() inputData: any;
  @Input() remove: boolean = false;
  @Output() notify: EventEmitter<NotificationData> = new EventEmitter<NotificationData>();
  @Output() popup: EventEmitter<any> = new EventEmitter<any>();

  myMap: google.maps.Map | undefined;
  markers: google.maps.Marker[] = [];
  // polygons: google.maps.Polygon[] = [];
  tempSelectedMarker: any;
  tempMarkers: any[] = [];

  searchPinResults: any[] = [];
  complaintList: any[] = [];

  isSpinning = false;
  isPinSelected: boolean = false;
  markerAddedLatLng: any;
  defaultAssetId: any;
  selectedToiletId: any;
  Selectedmarker: google.maps.Marker | undefined;

  toiletSearchValue: string = '';

  direction: string = "rtl";
  currentLang: string = "ar";
  dataLayer: google.maps.Data | undefined;
  ToilitsdataLayer: google.maps.Data | undefined;
  SensorLyer: google.maps.Data = new google.maps.Data();
  Tagname: any;
  showDetailes: boolean = false;
  blockNumber: any;
  SensorDataDetails: any[] = [];
  sensorPoint: any;
  MarkersdataLayer = new google.maps.Data();

  constructor(private messageService: MassageService,
    private store: Store<any>,
    private toiletService: ToiletService,
    private areaService: AreaService,
    private bootstrapModalService: ModalService,
    private translate: TranslateService,
    private i18n: NzI18nService,
    private complaintService: ComplaintService,
    private gisService: GisService,
    private mapSericeService: MapSericeService) {
    this.searchPinResults = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.remove) {
      this.removeMarker();
    } else {
      if (this.inputData != null) {
        this.handleInputMessageChange();
      }
    }
  }

  handleInputMessageChange() {

    let inputArgs = this.inputData.split(';');

    // if(inputArgs[2] != "undefined"){
    //     this.defaultAssetId = inputArgs[2];
    // }

    // if(inputArgs[0] != "undefined"){
    this.markerAddedLatLng = inputArgs[0];
    //  document.getElementById('checkPlockNumber')?.click();
    this.addOrRemoveMapMarker(JSON.parse(inputArgs[0]), this.myMap, false);
    //   }

    //   if(inputArgs[3] == 'removeMarker'){
    //     this.removeMarker();
    // }

    // if(inputArgs[3] != "undefined"){
    //     this.tempToiletMarkers = inputArgs[3];
    // }

    //this.handleMapMarker(inputArgs[1]);
  }

  ngOnInit(): void {
    this.setDefaultLanguage();

    this.initializeMap();

    this.mapSericeService.loadAreas(this.myMap);



    //this.loadToilets();
    // this.loadOpenedComplaints();
    this.loadSensores();

    setInterval(() => {
      this.loadSensores();
    }, 60 * 60 * 1000);
  }

  setDefaultLanguage() {
    this.translate.setDefaultLang('ar-SA');
    this.i18n.setLocale(ar_EG);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
      this.direction = event.lang == "ar" ? "rtl" : "ltr";
    });
  }

  async initializeMap() {
    const mapElement = document.getElementById('bigMap')!;
    this.myMap = await this.mapSericeService.initializeMap(this.myMap, mapElement);
    this.myMap!.addListener('click', ($event: google.maps.MouseEvent) => {
      this.dataLayer!.revertStyle()
      this.popup.emit({ showDetailes: false, data: [] })
      this.handleMapClick($event, this.myMap)
    });

    this.isSpinning = true;

    this.myMap!.addListener('zoom_changed', () => {
      this.updateMarkerVisibility()

      const currentZoom = this.myMap?.getZoom();
      if (currentZoom! >= 16) {
        this.SensorLyer!.setMap(this.myMap!);

        this.dataLayer!.setMap(this.myMap!);
        this.MarkersdataLayer!.setMap(this.myMap!);

      } else {
        this.dataLayer!.setMap(null);
        this.SensorLyer!.setMap(null);
        this.MarkersdataLayer!.setMap(null);

      }
    });
    this.addGeoJsonLayer();
    await this.mapSericeService.loadOpenedComplaints(this.MarkersdataLayer)
    this.isSpinning = false;
    this.complaintList = this.mapSericeService.complaintList;

  }

  handleMapClick($event: google.maps.MouseEvent, map: any) {
    this.addOrRemoveMapMarker($event.latLng, map, true);
  }

  addOrRemoveMapMarker(latLng: any, map: any, isMap: boolean = false) {
    ;
    const polygon = this.getPolygonIfMarkerInside(latLng, this.mapSericeService.polygons);

    if (polygon != null) {
      this.defaultAssetId = polygon.id;
      this.isPinSelected = true;

      if (this.Selectedmarker != undefined) {
        this.Selectedmarker!.setPosition(latLng);
      } else {
        const marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        this.Selectedmarker = marker
      }


      //this.markers.push(marker);
      this.markerAddedLatLng = JSON.stringify(latLng);
      this.tempMarkers.push(JSON.stringify(latLng));

      if (isMap) {
        this.sendSelectedMarkerDetailsToParent();
      }
    } else {
      this.messageService.showMessage('error', "لايمكن اختيار موقع خارج منطقة المشاعر");
    }
  }

  removeMarker() {
    this.Selectedmarker?.setMap(null);
    this.Selectedmarker = undefined;
    this.tempMarkers = [];
    this.markerAddedLatLng = undefined;
    this.isPinSelected = false;
  }

  getPolygonIfMarkerInside(markerPosition: any, polygons: any) {
    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];
      if (google.maps.geometry.poly.containsLocation(markerPosition, polygon)) {
        return polygon;
      }
    }
    return null;
  }

  updateMarkerVisibility() {
    const currentZoom = this.myMap?.getZoom();
    this.markers!.forEach(marker => {
      if (currentZoom != undefined && currentZoom >= 15) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
  }

  onKeyPressToiletSearch($event: KeyboardEvent) {
    this.searchPinResults = [];
    if ($event.key === 'Enter') {
      if (this.toiletSearchValue == "" || this.toiletSearchValue.length < 2) {
        this.messageService.showMessage('error', 'يجب إدخال قيمة للبحث عن دورة المياة لا تقل عن خمسة ارقام');
        return;
      }

      let textSearch = this.toiletSearchValue.replaceAll(' ', '');
      let isValidLatLng = this.isValidLatLng(textSearch);
      if (isValidLatLng) {
        let searchArgs = textSearch.split(',');
        var latLng = { lat: Number(searchArgs[0]), lng: Number(searchArgs[1]) }

        const polygon = this.getPolygonIfMarkerInside(latLng, this.mapSericeService.polygons);
        if (polygon != null) {
          this.handleMapMarker(textSearch, false);
        }
        else {
          this.messageService.showMessage('error', 'يجب إختبار موقع داخل منطقة المشاعر');
          return;
        }
      }
      else {
        this.selectedToiletId = this.toiletSearchValue;
        this.handleMapMarker(this.toiletSearchValue, true);
      }
    }
  }

  handleMapMarker(textSearch: any, callGis: boolean) {
    this.isSpinning = true;

    // Remove other markers from the map
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i].get("isTemp") === true) {
        const marker = this.markers[i];
        marker.setMap(null);
        this.markers.splice(i, 1);
      }
    }

    // Reset Toilets map icons
    this.markers.forEach(marker => {
      if (marker.get("isSelected") === true) {
        let po: any = marker.getPosition();
        let title = marker.get("title");
        let _id = marker.get("id");
        let layerName = marker.get("layerName");

        const markerOptions: CustomMarkerOptions = {
          position: po,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          },
          title: title,
          id: _id,
          isTemp: false,
          isSelected: false,
          layerName: layerName
        };
        marker.setOptions(markerOptions);
      }
    });

    const _tempOtherMarkers: any[] = [];

    if (callGis) {
      this.gisService.callGis(textSearch).subscribe({
        next: (result) => {
          if (result.status != "error") {
            result.results.forEach((x: any) => {
              const isExist = this.isMarkerInArray(this.markers, x.value);
              if (!isExist) {
                if (x.geometry.x != undefined) {
                  const markerOptions: CustomMarkerOptions = {
                    position: { lat: Number(x.geometry.y), lng: Number(x.geometry.x) },
                    icon: {
                      url: '/assets/images/pin_search.png'
                    },
                    title: `${x.layerName} - ${x.value}`,
                    id: x.value,
                    isTemp: true,
                    isSelected: true,
                    layerName: x.layerName
                  };
                  const marker = new google.maps.Marker(markerOptions);
                  _tempOtherMarkers.push(marker);
                  this.searchPinResults.push(marker);

                  this.setMapCenterAndZoom({ lat: Number(x.geometry.y), lng: Number(x.geometry.x) }, 17.5, x.value);
                }
                else {
                  const points: Point[] = [];
                  x.geometry.rings[0].forEach((r: any) => {
                    points.push({ x: r[0], y: r[1] });
                  });

                  let centerPoint: any = { x: 0, y: 0 };
                  centerPoint = this.getCenterPoint(points);

                  const markerOptions: CustomMarkerOptions = {
                    position: { lat: centerPoint.y, lng: centerPoint.x },
                    icon: {
                      url: '/assets/images/pin_search.png'
                    },
                    title: `${x.layerName} - ${x.value}`,
                    id: x.value,
                    isTemp: true,
                    isSelected: true,
                    layerName: x.layerName
                  };
                  const marker = new google.maps.Marker(markerOptions);
                  _tempOtherMarkers.push(marker);
                  this.searchPinResults.push(marker);

                  this.setMapCenterAndZoom({ lat: Number(x.geometry.y), lng: Number(x.geometry.x) }, 17.5, x.value);
                }
              }
              else {
                const marker = this.getMarkerIfNotSelected(this.markers, x.value);
                if (marker != null) {
                  let po: any = marker.getPosition();
                  const markerOptions: CustomMarkerOptions = {
                    position: po,
                    icon: {
                      url: '/assets/images/pin_search.png'
                    },
                    title: `${x.layerName} - ${x.attributes.ToiletNumber}`,
                    id: x.attributes.ToiletNumber,
                    isTemp: false,
                    isSelected: true,
                    layerName: x.layerName
                  };
                  marker.setOptions(markerOptions);
                  this.setMapCenterAndZoom(po, 17.5, x.attributes.ToiletNumber);
                  this.searchPinResults.push(marker);
                }
              }
            });

            if (_tempOtherMarkers.length > 0) {
              this.drawMarkers(_tempOtherMarkers);
            }
          }
          else {
            this.selectFromLocalMarkers(textSearch);
          }
          this.isSpinning = false;
        },
        error: (e) => {
          this.selectFromLocalMarkers(textSearch);

          this.isSpinning = false;
        },
        complete: () => {
          this.isSpinning = false;
        }
      });
    }
    else {
      let searchArgs = textSearch.split(',');
      let layerName = 'Marker Coordinates';
      let id = new Date().getTime().toString();
      const markerOptions: CustomMarkerOptions = {
        position: { lat: Number(searchArgs[0]), lng: Number(searchArgs[1]) },
        icon: {
          url: '/assets/images/pin_search.png'
        },
        title: `${layerName}`,
        id: id,
        isTemp: true,
        isSelected: true,
        layerName: layerName
      };
      const marker = new google.maps.Marker(markerOptions);
      _tempOtherMarkers.push(marker);
      this.searchPinResults.push(marker);

      this.setMapCenterAndZoom({ lat: Number(searchArgs[0]), lng: Number(searchArgs[1]) }, 17.5, id);

      this.drawMarkers(_tempOtherMarkers);
    }
  }

  selectFromLocalMarkers(id: string) {
    const markerList = this.getMarkerListIfNotSelected(this.markers, id);

    markerList?.forEach((marker: any) => {
      if (marker != null) {
        let po: any = marker.getPosition();
        let title = marker.get("title");
        let _id = marker.get("id");
        let layerName = marker.get("layerName");

        const markerOptions: CustomMarkerOptions = {
          position: po,
          icon: {
            url: '/assets/images/pin_search.png'
          },
          title: title,
          id: _id,
          isTemp: false,
          isSelected: true,
          layerName: layerName
        };
        marker.setOptions(markerOptions);
        this.setMapCenterAndZoom(po, 17.5, _id);
        this.searchPinResults.push(marker);
      }
    });
  }

  isMarkerInArray(markerArray: google.maps.Marker[], markerId: string): boolean {
    for (let marker of markerArray) {
      if (marker.get("id") === markerId) {
        return true;
      }
    }

    return false;
  }

  getMarkerIfNotSelected(markerArray: google.maps.Marker[], markerId: string): google.maps.Marker | null {
    for (let marker of markerArray) {
      if (marker.get("id") === markerId && marker.get("isSelected") === false) {
        return marker;
      }
    }

    return null;
  }

  getMarkerListIfNotSelected(markerArray: google.maps.Marker[], markerId: string): google.maps.Marker[] | null {
    const markerList: google.maps.Marker[] = [];

    for (let marker of markerArray) {
      if (marker.get("id").includes(markerId) && marker.get("isSelected") === false) {
        markerList.push(marker);
      }
    }

    return markerList;
  }

  getCenterPoint(points: Point[]): Point | null {
    if (points.length === 0) return null;

    // Calculate the sum of x and y coordinates
    const sumX = points.reduce((acc, point) => acc + point.x, 0);
    const sumY = points.reduce((acc, point) => acc + point.y, 0);

    // Calculate the average
    const avgX = sumX / points.length;
    const avgY = sumY / points.length;

    return { x: avgX, y: avgY };
  }

  setMapCenterAndZoom(po: any, zoomLevel: number, id: any): void {
    if (this.myMap) {
      this.myMap.setCenter(po);
      this.myMap.setZoom(zoomLevel);

      this.selectedToiletId = id;
      if (this.defaultAssetId == "" || this.defaultAssetId == "undefined" || this.defaultAssetId == undefined) {
        this.defaultAssetId = "undefined";
      }

      if (this.markerAddedLatLng == "" || this.markerAddedLatLng == "undefined" || this.markerAddedLatLng == undefined) {
        this.markerAddedLatLng = "undefined";
      }
      this.sendSelectedMarkerDetailsToParent();
    } else {
      console.log('Map is not initialized.');
    }
  }





  loadToilets() {
    this.toiletService.getAllToilets().subscribe({
      next: (result) => {
        if (!result.isSucess) {
          this.messageService.showMessage('error', result.error);
        }
        else {
          const _markers: any[] = [];
          this.ToilitsdataLayer = new google.maps.Data();

          result.data.forEach((x: any) => {
            const markerOptions: CustomMarkerOptions = {
              position: { lat: Number(x.latitude), lng: Number(x.longitude) },
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              },
              title: `TOILETS - ${x.code}`,
              id: x.code,
              isTemp: false,
              isSelected: false,
              layerName: x.layerName
            };

            const marker = new google.maps.Marker(markerOptions);
            const feature = new google.maps.Data.Feature({
              geometry: new google.maps.Data.Point(new google.maps.LatLng(Number(x.latitude), Number(x.longitude))),
              properties: { name: x.layerName }
            });

            this.ToilitsdataLayer!.add(feature);
            this.ToilitsdataLayer!.setStyle((feature: any) => {
              return {
                icon: {
                  url: '/assets/images/Toilet.png',
                  scaledSize: new google.maps.Size(35, 35) // width, height

                },
              };
            }); _markers.push(marker);
          });


          this.isSpinning = false;
        }
      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });
  }

  // loadOpenedComplaints() {
  //   this.complaintService.getOpenedComplaints().subscribe({
  //         next: (result) => {
  //             if (!result.isSucess) {
  //                 this.messageService.showMessage('error', result.error);
  //             }
  //             else {
  //               this.complaintList = [];
  //               const _markers: any[] = [];
  //               result.data.forEach((x: any) => {
  //                   const title = `COMPLAINTS - ${x.complaintNo}`;

  //                   if(x.issuerName != '' && x.issuerMobile != ''){
  //                       const title = `COMPLAINTS - ${x.complaintNo} - ${x.issuerName} - ${x.issuerMobile}`;
  //                   }

  //                   const markerOptions: CustomMarkerOptions = {
  //                       position: { lat: Number(x.lat), lng: Number(x.lng) },
  //                       icon: {
  //                           url: '/assets/images/plumbing.png',
  //                           scaledSize: new google.maps.Size(32, 32) // width, height

  //                       },
  //                       title: title, 
  //                       id: x.id, 
  //                       isTemp: false, 
  //                       isSelected: false,
  //                       layerName: 'COMPLAINTS'
  //                     };

  //                     const marker = new google.maps.Marker(markerOptions);
  //                     _markers.push(marker);
  //                     this.complaintList.push(marker);
  //               });

  //               if(_markers.length > 0){
  //                   this.drawMarkers(_markers);
  //               }

  //             this.isSpinning = false;
  //             }
  //         },
  //         error: (e) => {
  //             this.messageService.showMessage('error', e.message);
  //         },
  //         complete: () => {
  //         }
  //     });
  // }

  drawMarkers(positions: google.maps.Marker[]) {
    let bounds = new google.maps.LatLngBounds();

    positions.forEach(marker => {
      this.markers.push(marker);
      var position = marker.getPosition();
      if (position) {
        bounds.extend(new google.maps.LatLng(position.lat(), position.lng()));
      }
    });

    //this.fitMapToBounds(this.myMap!, bounds);

    // Add markers to the map
    this.markers!.forEach(marker => {
      //marker.setVisible(false);
      marker.setMap(this.myMap!);
      //console.log(JSON.stringify((marker.getPosition() as CustomMarkerOptions)));

      const clusterOptions: MarkerClustererOptions = {
        gridSize: 50, // Adjust the size of the grid for clustering. Smaller values improve performance but may result in more clusters.
        maxZoom: 17.5, // Set the maximum zoom level at which clustering occurs. Beyond this zoom level, markers are not clustered.
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // Customize the image path for cluster icons.
        imageExtension: 'png', // Set the file extension for cluster icons.
        zoomOnClick: false, // Disable zooming in when clicking on a cluster. This can improve performance for large datasets.
        averageCenter: true, // Use the average position of markers in a cluster as the cluster center. This can improve cluster placement accuracy.
        minimumClusterSize: 2, // Set the minimum number of markers required to form a cluster. Smaller values may result in more clusters.
        ignoreHidden: true, // Ignore hidden markers when clustering. This can improve performance if you have markers that are hidden initially.
        calculator: (markers: google.maps.Marker[], numStyles: number) => {
          const totalMarkers = markers.length;
          const text = totalMarkers.toString();
          const index = Math.min(numStyles, totalMarkers) - 1;
          return { text, index, title: "Cluster Title" }; // Add title property
        }, // Customize the cluster icon based on the number of markers in the cluster.
        styles: [ // Customize the appearance of cluster icons based on the number of markers in the cluster.
          {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
            width: 53,
            height: 52,
            textColor: '#FFFFFF',
            textSize: 18
          },
          {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2.png',
            width: 56,
            height: 55,
            textColor: '#FFFFFF',
            textSize: 18
          },
          {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m3.png',
            width: 66,
            height: 65,
            textColor: '#FFFFFF',
            textSize: 18
          }
          // Add more styles as needed
        ]
      };

      // const markerCluster = new MarkerClusterer(this.myMap!, this.markers, {
      //     imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
      // });            
    });

    this.isSpinning = false;
    this.updateMarkerVisibility();

  }

  fitMapToBounds(map: google.maps.Map, bounds: any) {
    map.fitBounds(bounds);
  }

  focusOnPin(marker: any) {
    let po: any = marker.getPosition();
    let id: any = marker.get("id");
    this.setMapCenterAndZoom(po, 21, id);
  }

  isValidLatitude(lat: number): boolean {
    return lat >= -90 && lat <= 90;
  }

  isValidLongitude(lng: number): boolean {
    return lng >= -180 && lng <= 180;
  }
  addGeoJsonLayer(): void {
    this.dataLayer = new google.maps.Data();


    this.mapSericeService.addGeoJsonLayer(this.dataLayer);
    // Optional: add event listener for clicks
    this.dataLayer.addListener('click', (event: any) => {
      this.blockNumber = event.feature!.Fg.NUMBER_;
       if(this.blockNumber )
      {
           this.handelSensorBlock(event,false);

      }else
      {
              this.popup.emit({ showDetailes: false, data: [] })

      }
      this.dataLayer!.revertStyle()
      this.dataLayer!.overrideStyle(event.feature, {
        fillColor: 'red',
        strokeColor: 'red',
      });
      this.handleMapClick(event, this.myMap)
      //       const infoWindow = new google.maps.InfoWindow({
      //   content: `<div>Block Number: ${this.blockNumber}</div>`,
      //   position: event.latLng,
      // });

      // infoWindow.open(this.myMap);
    });

    this.dataLayer.addListener('rightclick', (event: any) => {
      //  console.log(event.feature.getGeometry());
        this.handelSensorBlock(event,true);

    });
  }
  handelSensorBlock(event: any,showDetailes=false)
{
     //  console.log(event.feature.getGeometry());
      const coordinates: any[] = [];
      const point = event.latLng; // Example point
      var geometry = event.feature.getGeometry();
      geometry.getArray().forEach((linearRing: any) => {
        const ringCoords: [number, number][] = [];
        linearRing.getArray().forEach((latLng: any) => {
          ringCoords.push([latLng.lng(), latLng.lat()]); // GeoJSON format: [lng, lat]
        });
        coordinates.push(ringCoords);
      });
      const polygonCoords = coordinates[0].map((latLng: any) => ({
        lat: latLng[0],
        lng: latLng[1]
      }));

      //  console.log(event);
      const polygon = new google.maps.Polygon({
        paths: polygonCoords
      });
      this.SensorDataDetails = []
      this.sensorPoint.forEach((element: any) => {
        const testPoint = new google.maps.LatLng(element.lng, element.lat);

        const isInside = google.maps.geometry.poly.containsLocation(testPoint, polygon);
        if (isInside)
          this.SensorDataDetails.push(element.data)
        console.log(element.lng, element.lat)

      });
      this.popup.emit({ showDetailes: showDetailes, data: this.SensorDataDetails })
}
  isValidLatLng(latLng: string): boolean {
    // Regular expression to check if input is in the format "lat,lng"
    const latLngRegex = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
    if (!latLngRegex.test(latLng)) {
      return false;
    }

    // Split the string to get latitude and longitude as numbers
    const [latStr, lngStr] = latLng.split(',');
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    // Check if both latitude and longitude are valid
    return this.isValidLatitude(lat) && this.isValidLongitude(lng);
  }

  sendSelectedMarkerDetailsToParent(): void {
    // const notification: NotificationData = {
    //     id: this.selectedToiletId, 
    //     defaultAssetId: this.defaultAssetId,
    //     markerAddedLatLng: this.markerAddedLatLng, 
    //     blockNumber:this.blockNumber,
    //     action: ''
    // };

    this.notify.emit(this.markerAddedLatLng);
  }
  loadSensores() {
    this.sensorPoint = [];
    this.SensorLyer.setMap(null);
    this.SensorLyer = new google.maps.Data();

    this.complaintService.getSensors().subscribe({
      next: (result) => {

        result.data.forEach((x: any) => {
          var imgurl = "";
          switch (x.pressureStatus) {
            case 0:
              imgurl = 'gray';
              break;
            case 1:
              imgurl = 'green';

              break;
            case 2:
              imgurl = 'yellow';

              break;
            case 3:
              imgurl = 'red';

              break;
            default:
              break;
          }
          //                 const circle = new google.maps.Circle({
          //   center: { lat: Number(x.lat), lng: Number(x.lng) },
          //   radius: 1000, // radius in meters
          //   strokeColor: "#FF0000",
          //   strokeOpacity: 0.8,
          //   strokeWeight: 2,
          //   fillColor: "#FF0000",
          //   fillOpacity: 0.35
          // });
          //                 const feature = new google.maps.Data.Feature({

          //                     geometry: new google.maps.Data.Polygon(circle)),
          //                     properties: {myData:x , iconUrl: imgurl},
          //                    // unique icon for this feature

          //                   });
          const polygonCoords = this.mapSericeService.generateCirclePolygon(Number(x.lat), Number(x.lng), 5); // 1000 meters radius

          // Create a new Data.Feature with Polygon
          const feature = new google.maps.Data.Feature({
            geometry: new google.maps.Data.Polygon([polygonCoords.map(coord => new google.maps.LatLng(coord))]),
            properties: {

              myData: x,
              color: imgurl
            }
          });
          this.sensorPoint.push({ lat: Number(x.lat), lng: Number(x.lng), data: x })
          this.SensorLyer!.add(feature);
          this.SensorLyer!.setStyle((feature: any) => {
            const iconUrl = feature.getProperty('color');

            // return {
            //   icon: {
            //     url: iconUrl,
            //     scaledSize: new google.maps.Size(30, 30),
            //   }
            // };
            return {
              fillColor: iconUrl,
              fillOpacity: 1,
              strokeColor: iconUrl,
              strokeWeight: 2
            };
          });
          //   marker.setMap(this.myMap!)

        });
        this.SensorLyer.addListener('rightclick', (event: any) => {
          const clickedFeature = event.feature;
          //  this.Tagname = clickedFeature.getProperty('name');
          // const id = clickedFeature.getProperty('id');
          const value = clickedFeature.getProperty('myData');
          // console.log("Double-clicked feature:",  this.Tagname, id,value);
          this.showDetailes = true;
          this.popup.emit({ showDetailes: true, data: [value] })
        });
        // this.SensorLyer.setMap(this.myMap!)

      },
      error: (e) => {
        this.messageService.showMessage('error', e.message);
      },
      complete: () => {
      }
    });

  }

  polygonsofgeojson: any[] = []

  async checkPlockNumber() {
    return new Promise((resolve, reject) => {
      const simulatedLatLng = new google.maps.LatLng(JSON.parse(this.markerAddedLatLng).lng, JSON.parse(this.markerAddedLatLng).lat);
      this.dataLayer!.forEach((feature: any) => {
        this.polygonsofgeojson = []

        // var coordinates;
        feature.getGeometry()!.getArray().forEach((linearRing: any) => {
          const ringCoords: [number, number][] = [];
          linearRing.getArray().forEach((latLng: any) => {
            ringCoords.push([latLng.lng(), latLng.lat()]); // GeoJSON format: [lng, lat]
          });
          this.polygonsofgeojson.push(ringCoords);
        });
        const polygonCoords = this.polygonsofgeojson[0].map((latLng: any) => ({
          lat: latLng[0],
          lng: latLng[1]
        }));

        //  console.log(event);
        const polygon = new google.maps.Polygon({
          paths: polygonCoords
        });
        const isInside = google.maps.geometry.poly.containsLocation(simulatedLatLng, polygon);
        if (isInside) {

          this.blockNumber = feature.Fg.NUMBER_
          this.sendSelectedMarkerDetailsToParent();
          resolve(this.blockNumber);
          return;
        }

      });

    });
  }

}

interface CustomPolygonOptions extends google.maps.PolygonOptions {
  id?: string;
}

interface CustomMarkerOptions extends google.maps.MarkerOptions {
  id?: string;
  isTemp?: boolean;
  isSelected?: boolean;
  layerName?: string;
}

interface Point {
  x: number;
  y: number;
}