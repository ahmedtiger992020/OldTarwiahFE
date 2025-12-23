export class AreaVM{
    id: number;
    defaultAssetId: string;
    coordinates: Coordinate[];

    constructor(_id: number, _defaultAssetId: string, _coordinates: Coordinate[]) {
        this.id = _id;
        this.defaultAssetId = _defaultAssetId;
        this.coordinates = _coordinates;
      }
}

export class Coordinate{
    lat: string;
    lng: string;

    constructor(_lat: string, _lng: string) {
        this.lat = _lat;
        this.lng = _lng;
      }
}