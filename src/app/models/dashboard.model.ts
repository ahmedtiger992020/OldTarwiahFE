export class Dashboard{
    totalCalls: number;
    totalAnsweredCalls: number;
    totalMissedCalls: number;
    avrageAnsweredCalls: number;
    avrageMissedCalls: number;

    constructor(_totalCalls: number, _totalAnsweredCalls: number, _totalMissedCalls: number, _avrageAnsweredCalls: number, _avrageMissedCalls: number){
        this.totalCalls = _totalCalls;
        this.totalAnsweredCalls = _totalAnsweredCalls;
        this.totalMissedCalls = _totalMissedCalls;
        this.avrageAnsweredCalls = _avrageAnsweredCalls;
        this.avrageMissedCalls = _avrageMissedCalls;
    }
}