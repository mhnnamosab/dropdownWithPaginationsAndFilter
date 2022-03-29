import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  get(url: string,params?:any) {
    return this.http.get<any>(url,{params :params});
  }
}
