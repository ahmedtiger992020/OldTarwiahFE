import { Injectable } from '@angular/core';
import { MassageService } from './massage.service';
import { NotificationData } from '../call-center/map/map.component';
import { AreaService } from './area.service';
import { setCachedList } from '../caching/cache.actions';
import { selectCachedList } from '../caching/cache.selectors';
import { AreaVM } from '../models/areaVM.model';
import { ComplaintService } from './complaint.service';
import { select, Store } from '@ngrx/store';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapSericeService {
   polygons: google.maps.Polygon[] = [];
   complaintList: any[]=[];
  markers: any;


  constructor(private messageService: MassageService,
                    private areaService: AreaService,
                      private complaintService: ComplaintService,
                       private store: Store<any>,
    
  ) { }

 async initializeMap(myMap:any,mapElement:any)
  {
   return myMap = new google.maps.Map(mapElement, {
      center: { lat: 21.407, lng: 39.894 },
      zoom: 12, 
      mapTypeControl: false,
      streetViewControl: false,
      disableDoubleClickZoom: true // 👈 This disables double-click zoom
  });

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
drawPolygons(list: AreaVM[] = [],myMap:any) {
      list.forEach(x => {
          let polygonCoords: any[] = [];

          x.coordinates.forEach(y => {
              polygonCoords.push({ lat: Number(y.lat), lng: Number(y.lng) });
          });

          const map = myMap!;
          const polygonOptions: CustomPolygonOptions = {
              paths: polygonCoords,
              strokeColor: "#4D3878a9",
              strokeOpacity: 0.3,
              strokeWeight: 2,
              fillColor: "#263878a9",
              fillOpacity: 0.10,
              clickable: false,
              map: map,
              id: x.defaultAssetId
          };

          const polygon = new google.maps.Polygon(polygonOptions);
          polygon.setVisible(false);
          this.polygons.push(polygon);
      });
  }
  loadAreas(mymap:any) {
      this.areaService.getAllActiveAreas().subscribe({
          next: (result) => {
              if (!result.isSucess) {
                  this.messageService.showMessage('error', result.error);
              }
              else {
                 this.store.dispatch(setCachedList({ key: 'areas', list: result.data }));

                     this.store.pipe(select(selectCachedList, { key: 'areas' })).subscribe({
                           next: ({ list, isDataCached }:any) => {
                               const list$ = of(list);
                               list$.pipe(
                                   map((list: AreaVM[]) => {
                                       this.drawPolygons(list,mymap);
                                   })
                               ).subscribe();
                               if (!isDataCached) {
                                   //this.loadAreas();
                               }
                           }
                       });
              }
          },
          error: (e) => {
              this.messageService.showMessage('error', e.message);
          },
          complete: () => {
          }
      });
  }
  addGeoJsonLayer(dataLayer:any): void {
   // Load the GeoJSON from the `assets` folder

   dataLayer.loadGeoJson('assets/Json/MashearBlocks_WGS84_Coordinates.geojson');

   // Optional: styling the layer
   dataLayer.setStyle({
     fillColor: '#19875424',
     strokeColor: 'black',
     strokeWeight: 2
   });

   // Optional: add event listener for clicks
  
 }
  loadOpenedComplaints(layer:any){
    return new Promise((resolve, reject) => {
  this.complaintService.getOpenedComplaints().subscribe({
        next: (result) => {
            if (!result.isSucess) {
                this.messageService.showMessage('error', result.error);
            }
            else {
              this.complaintList = [];
              const _markers: any[] = [];
              result.data.forEach((x: any,index:number) => {
                  const title = `${x.complaintNo}`;

                  if(x.issuerName != '' && x.issuerMobile != ''){
                      const title = `${x.complaintNo} - ${x.issuerName} - ${x.issuerMobile}`;
                  }

                  const markerOptions: CustomMarkerOptions = {
                      position: { lat: Number(x.lat), lng: Number(x.lng) },
                      icon: {
                          url: '/assets/images/plumbing.png',
                          scaledSize: new google.maps.Size(32, 32) // width, height

                      },
                      title: title, 
                      id: x.id, 
                      isTemp: false, 
                      isSelected: false,
                      layerName: 'COMPLAINTS'
                    };
                    var marker = new google.maps.Marker(markerOptions);
                    const feature = new google.maps.Data.Feature({
                      geometry: new google.maps.Data.Point(new google.maps.LatLng( Number(x.lat),Number(x.lng))),
                      properties: { name: x.layerName }
                    });
                    layer!.add(feature);
                    layer!.setStyle((feature:any) => {
                      return {
                          icon: {
                              url: '/assets/images/plumbing.png',
                              scaledSize: new google.maps.Size(32, 32) // width, height

                          },
                      };
                    }); 
                  //  marker.setMap(mymap);
                    _markers.push(marker);
                    this.complaintList.push(marker);
                    if (index === result.data.length - 1) {
                      resolve(this.complaintList);
                    }
              });
         

            }
        },
        error: (e) => {
            this.messageService.showMessage('error', e.message);
        },
        complete: () => {
          resolve(null);

        }
    });
  });
}
generateCirclePolygon(lat:any, lng:any, radiusMeters:any, points = 32) {
  const circleCoords = [];
  const earthRadius = 6378137; // in meters
  const latRadians = lat * Math.PI / 180;

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const dx = radiusMeters * Math.cos(angle);
    const dy = radiusMeters * Math.sin(angle);

    const latOffset = dy / earthRadius;
    const lngOffset = dx / (earthRadius * Math.cos(latRadians));

    circleCoords.push({
      lat: lat + latOffset * (180 / Math.PI),
      lng: lng + lngOffset * (180 / Math.PI)
    });
  }

  // Close the circle
  circleCoords.push(circleCoords[0]);
  return circleCoords;
}
}
interface CustomPolygonOptions extends google.maps.PolygonOptions {
  id?: string;
}
interface CustomMarkerOptions extends google.maps.MarkerOptions{
  id?: string;
  isTemp?: boolean;
  isSelected?: boolean;
  layerName?: string;
}
