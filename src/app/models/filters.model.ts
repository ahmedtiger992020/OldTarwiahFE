import { PageFilter } from "./pageFilter.model";

export interface Filters{
    pageFilter: PageFilter;
    searchKeyword: string;

    // constructor(_pageFilter: PageFilter, _searchKeyword: string){
    //     this.pageFilter = _pageFilter;
    //     this.searchKeyword = _searchKeyword;
    // }
}