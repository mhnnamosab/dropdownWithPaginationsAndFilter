import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from './data.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  total = 1;
  limit = 10;
  offset = 0;
  options: any = [];
  searchFilter = new FormControl('');
  filter : Filter = new Filter()
  @Input() isMultiple = false;
  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    this.filter.ParentDropdownId='1d5e9d64-815b-43cf-8004-08d9fb080c24'
    this.getAreas();
    this.searchFilter.valueChanges.pipe(
      debounceTime(700)
    ).subscribe((res) => {
      this.searchAreas(res);
    });
  }
  searchAreas(filter?: string) {
    this.limit = 10
    this.offset = 0;
    this.filter.Filter = filter;
    this.options = [];
    console.log("filter" + filter)
    this.getAreas()
  }
  getAreas() {
    if (this.options.length < this.total || this.total==0) {   
      this.filter.SkipCount = this.offset;
      this.filter.MaxResultCount = this.limit;
      !this.filter.Filter ?  delete this.filter.Filter: null;
      this.dataService.get(
        `http://crps.teacharabia.com/api/services/app/DropdownItems/GetAll`, this.filter
      ).subscribe(
        res => {
          this.options = [...this.options, ...res.result.items]
          this.total = res.result.totalCount
          this.offset += this.limit;
        }
      )
    }

  }
}


class Filter {
  ParentDropdownId: string | undefined;
  SkipCount : number;
  MaxResultCount : number;
  Filter : string | undefined;
  constructor() {
    this.ParentDropdownId = undefined;
    this.SkipCount =0;
    this.MaxResultCount = 10;
    this.Filter = undefined;
   }
}