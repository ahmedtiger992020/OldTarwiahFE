import { Filters } from "./filters.model";
import { SortColumn } from "./sortColumn.model";

export class SeasonSearchCriteria{
    filterModel: Filters;
    sortModel: SortColumn;
    name: string;

    constructor(_filterModel: Filters, _sortModel: SortColumn, _name: string){
        this.filterModel = _filterModel;
        this.sortModel = _sortModel;
        this.name = _name;
    }
}