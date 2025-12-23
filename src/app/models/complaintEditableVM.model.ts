export class ComplaintEditableVM{
    fieldActivityId: string;
    issuerName: string; 
    issuerMobile: string;
    description: string;
    mentinanceArea: string;
    assetNumber: string;
    categoryItemId: number;
    utm: string;
    wgs84: string;
    agentLocation: string;
    agentOs: string;
    agentLanguage: string;
    sourceId: number;
    malekComplaintNo: string;
    imageFileName: string;
    images: any[];
    kedanaId:number;
    blockId:string;
    constructor(_fieldActivityId: string, _issuerName: string, _issuerMobile: string, _description: string, _mentinanceArea: string, _assetNumber: string, 
        _categoryItemId: number, _utm: string, _wgs84: string, _agentLocation: string, _agentOs: string, _agentLanguage: string, _sourceId: number, _malekComplaintNo: string, 
        _imageFileName: string, _images: any[],_kedanaId: number,_blockId:string){
        this.fieldActivityId = _fieldActivityId;
        this.issuerName = _issuerName;
        this.issuerMobile = _issuerMobile;
        this.description = _description;
        this.mentinanceArea = _mentinanceArea;
        this.assetNumber = _assetNumber;
        this.categoryItemId = _categoryItemId;
        this.utm = _utm;
        this.wgs84 = _wgs84;
        this.agentLocation = _agentLocation;
        this.agentOs = _agentOs;
        this.agentLanguage = _agentLanguage;
        this.sourceId = _sourceId;
        this.malekComplaintNo = _malekComplaintNo;
        this.imageFileName = _imageFileName;
        this.images = _images;
        this.kedanaId=_kedanaId;
        this.blockId=_blockId;
    }
}