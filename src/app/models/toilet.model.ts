export class Toilet{
    id: number;
    code: string;
    kedanaCode: string;
    longitude: number;
    latitude: number;
    isActive: boolean;

    constructor(_id: number, _code: string, _kedanaCode: string, _longitude: number, _latitude: number, _isActive: boolean){
        this.id = _id;
        this.code = _code;
        this.kedanaCode = _kedanaCode;
        this.longitude = _longitude;
        this.latitude = _latitude;
        this.isActive = _isActive;
    }
}