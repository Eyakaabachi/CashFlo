import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/auth/income';
@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getIncomeById(id: any){
    return this.http.get(`${baseUrl}/${id}`);
  }
  addIncome(data: any){
    return this.http.post(`${baseUrl}/`, data);
  }
  updateIncome(id : any, data : any){
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteIncome(id :any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  totalSumOfIncomePerMonth(IncomeStartDate : any,IncomeEndDate : any):Observable<any> {
    return this.http.get(`${baseUrl}/${IncomeStartDate}/${IncomeEndDate}`);
  }
  findHighestIncome(IncomeStartDate : any,IncomeEndDate : any):Observable<any> {
    return this.http.get(`${baseUrl}/${IncomeStartDate}/${IncomeEndDate}`);
  }
}
