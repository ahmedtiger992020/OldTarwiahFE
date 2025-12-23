export class ComplaintVM {
    id: number;
    complaintNo: string;
    date: Date;
    assetNo: string;
    issuerName: string;
    issuerMobile: string;
    description: string;
    category: string;
    subCategory: string;
    isSynced: boolean;
    source: string;
    statusId: number;
    sourceId: number;
    image: string;
    mashaarName: string;
    lat: number;
    lng: number;
    createdByUserName: string;
    kedanaNumber: string;
    constructor(_id: number, _complaintNo: string, _date: Date, _assetNo: string, _issuerName: string, _issuerMobile: string, _description: string, _category: string,
        _subCategory: string, _isSynced: boolean, _source: string, _statusId: number, _sourceId: number, _image: string, _mashaarName: string, _lat: number,
        _lng: number, _createdByUserName: string,_kedanaNumber: string) {
        this.id = _id;
        this.complaintNo = _complaintNo;
        this.date = _date;
        this.assetNo = _assetNo;
        this.issuerName = _issuerName;
        this.issuerMobile = _issuerMobile;
        this.description = _description;
        this.category = _category;
        this.subCategory = _subCategory;
        this.isSynced = _isSynced;
        this.source = _source;
        this.statusId = _statusId;
        this.sourceId = _sourceId;
        this.image = _image;
        this.mashaarName = _mashaarName;
        this.lat = _lat;
        this.lng = _lng;
        this.createdByUserName = _createdByUserName;
        this.kedanaNumber=_kedanaNumber
    }
}