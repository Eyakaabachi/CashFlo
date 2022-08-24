import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Income } from '../income/income'
const baseUrl = 'http://localhost:8080/income';
@Injectable({
  providedIn: 'root'
})
export class IncomeUpdateService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl+"/getall");
  }
  getIncomeById(id: any){
    return this.http.get<Income>(`${baseUrl}/${id}`);
  }
  addIncome(data: any){
    return this.http.post(`${baseUrl}/`, data);
  }
  updateIncome(id : any, data : any){
    return this.http.put(`${baseUrl}/`, data);
  }
  deleteIncome(id :any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  totalSumOfIncomePerMonth(IncomeStartDate : any,IncomeEndDate : any):Observable<any> {
    return this.http.get(`${baseUrl}/getsumofincomes/${IncomeStartDate}/${IncomeEndDate}`);
  }
  findHighestIncome(IncomeStartDate : any,IncomeEndDate : any):Observable<any> {
    return this.http.get(`${baseUrl}/gethighestincome/${IncomeStartDate}/${IncomeEndDate}`);
  }
  getIncomeByIncomeSource(incomeSource:any):Observable<any>{
    return this.http.get(`${baseUrl}/get/${incomeSource}`);

  }
}
