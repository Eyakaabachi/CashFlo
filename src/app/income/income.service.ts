import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/income';
@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getIncomeById(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  addIncome(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  updateIncome(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteIncome(id): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  findByTitle(title): Observable<any> {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
  totalSumOfIncomePerMonth(IncomeStartDate,IncomeEndDate):Observable<any> {
    return this.http.get(`${baseUrl}/${IncomeStartDate}/${IncomeEndDate}`);
  }
  findHighestIncome(IncomeStartDate,IncomeEndDate):Observable<any> {
    return this.http.get(`${baseUrl}/${IncomeStartDate}/${IncomeEndDate}`);
  }
}
