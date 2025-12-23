import { CampaignLockup } from "./campaignVM.model";

export class Response{
    isSucess: boolean;
    errorCode: string; 
    error: string;
    data: any[];

    constructor (isSucess: boolean, errorCode: string, error: string, data: any[]){
        this.isSucess = isSucess;
        this.errorCode = errorCode;
        this.error = error, 
        this.data = data;
    }
}