import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from './data.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  total = 100;
  limit = 10;
  offset = 0;
  options : any = [];
  searchFilter = new FormControl('');
  constructor(private dataService: DataService) {
  
  }

  ngOnInit() {
    this.getAreas();
    this.searchFilter.valueChanges.pipe(
      debounceTime(700)
    ).subscribe((res) => {
      this.searchAreas(res);
    });
  }
  searchAreas(filter ? : string){
    this.limit = 10
    this.offset = 0;
    this.options = [];
    this.getAreas(filter)
  }
  getAreas(filter ? : string) {
    let params ={
      ParentDropdownId : '1d5e9d64-815b-43cf-8004-08d9fb080c24',
      SkipCount :this.offset,
      MaxResultCount: this.limit,
      Filter : filter 
    }
    !params.Filter ? delete params.Filter : null 
    this.dataService.get(
      `http://crps.teacharabia.com/api/services/app/DropdownItems/GetAll`,params
    ).subscribe(
      res=>{
      this.options = [...this.options,...res.result.items]
       this.offset += this.limit;

      console.log(this.options);

      console.log(this.offset)
      }
    )
  }
}
