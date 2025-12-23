export class ZamzamLocationVM{
    id: number;
    type: string;
    nameEn: string;
    nameAr: string;
    nameFr: string;
    nameFa: string;
    nameId: string;
    nameUr: string;
    nameTr: string;
    longitude: string;
    latitude: string;
    isDeleted: boolean;

    constructor(_id: number, _type: string, _nameEn: string, _nameAr: string, _nameFr: string, _nameFa: string, _nameId: string, 
      _nameUr: string, _nameTr: string, _longitude: string, _latitude: string, _isDeleted: boolean) {
        this.id = _id;
        this.type = _type;
        this.nameEn = _nameEn;
        this.nameAr = _nameAr;
        this.nameFr = _nameFr;
        this.nameFa = _nameFa;
        this.nameId = _nameId;
        this.nameUr = _nameUr;
        this.nameTr = _nameTr;
        this.longitude = _longitude;
        this.latitude = _latitude;
        this.isDeleted = _isDeleted;
      }
}