import { Filters } from "./filters.model";
import { SortColumn } from "./sortColumn.model";

export interface ComplaintSearchCriteria{
    filterModel: Filters;
    sortModel: SortColumn;
    complaintNo: string;
    categoryId: number;
    categoryItemId: number;
    statusId: number;
    sourceId: number;
    mashaarId: number;
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
    blockId:string;
    // constructor(_filterModel: Filters, _sortModel: SortColumn, _complaintNo: string, _categoryId: number, _categoryItemId: number, 
    //             _statusId: number, _sourceId: number, _mashaarId: number, _dateFrom: Date | undefined, _dateTo: Date | undefined){
    //     this.filterModel = _filterModel;
    //     this.sortModel = _sortModel;
    //     this.complaintNo = _complaintNo;
    //     this.categoryId = _categoryId;
    //     this.categoryItemId = _categoryItemId;
    //     this.statusId = _statusId;
    //     this.sourceId = _sourceId;
    //     this.mashaarId = _mashaarId;
    //     this.dateFrom = _dateFrom;
    //     this.dateTo = _dateTo;
    // }
}
export interface KedanaComplaintSearchCriteria{
    filterModel: Filters;
    sortModel: SortColumn;
    complaintNo: string;
    assetNo: string;
    issuerName: string;
    issuerMobile: string;
    sourceId: number;
    statusId: Number;
    dateFrom: Date | undefined;
    dateTo: Date | undefined;
    // constructor(_filterModel: Filters, _sortModel: SortColumn, _complaintNo: string, _categoryId: number, _categoryItemId: number, 
    //             _statusId: number, _sourceId: number, _mashaarId: number, _dateFrom: Date | undefined, _dateTo: Date | undefined){
    //     this.filterModel = _filterModel;
    //     this.sortModel = _sortModel;
    //     this.complaintNo = _complaintNo;
    //     this.categoryId = _categoryId;
    //     this.categoryItemId = _categoryItemId;
    //     this.statusId = _statusId;
    //     this.sourceId = _sourceId;
    //     this.mashaarId = _mashaarId;
    //     this.dateFrom = _dateFrom;
    //     this.dateTo = _dateTo;
    // }
}