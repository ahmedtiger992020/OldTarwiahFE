export interface ComplaintExcelVM {
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
    statusAr: string;
    statusEn: string;
    sourceAr: string;
    sourceEn: string;
    image: string;
    mashaarName: string;
    lat: number;
    lng: number;
}