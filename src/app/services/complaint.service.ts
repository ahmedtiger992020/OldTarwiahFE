import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ComplaintVM } from '../models/complaintVM.model';
import { environment } from '../../environments/environment.staging';
import { ComplaintSearchCriteria, KedanaComplaintSearchCriteria } from '../models/complaintSearchCriteria.model';
import { ComplaintEditableVM } from '../models/complaintEditableVM.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient) { }

  getOpenedComplaints(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/GetOpenedComplaints`);
  }
  
  getComplaints(data: ComplaintSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/Complaint/GetComplaints`, data);
  }
   
  getKedanaComplaints(data: KedanaComplaintSearchCriteria): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/Complaint/GetKedanaComplaints`, data);
  }
  getComplaint(id: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/GetComplaint?id=${id}`);
  }
  getKedanaComplaint(id: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/getKedanaComplaint?id=${id}`);
  }
  GetOpendKedanaComplaints(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/GetOpendKedanaComplaints`);
  }
  getUTM(lnglat: any): Observable<any>{
    return this.http.get<ComplaintVM>(`https://sampleserver5.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?geometries=${lnglat}&inSR=4326&outSR=32637&f=json`);
  }
  
  addComplaint(data: ComplaintEditableVM): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/Complaint/CreateComplaint?IssuerMobileNumber=${data.issuerMobile}`, data);
  }
  rejectKedanaComplaint(id: any,rejectedReason:string): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/RejectKedanaComplaints?id=${id}&rejectedReason=${rejectedReason}`);
  }
  getSensors(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Sensor/GetSensorLastReads`);
  }
  getSensorHistory(tagName: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Sensor/GetSensorHistory?tagname=${tagName}`);
  }
  getImges(id: any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/KedanaComplaint/GetComplaintImg?id=${id}`);
  }
  GetComplaintBlocks(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/GetComplaintBlocks`);
  }
  GetComplaintsCounts(blockId:any): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/Complaint/GetComplaintsCounts?blockId=${blockId}`);
  }
}

