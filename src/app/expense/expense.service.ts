import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/auth/expense';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getExpenseById(id: any){
    return this.http.get(`${baseUrl}/${id}`);
  }
  addExpense(data: any){
    return this.http.post(`${baseUrl}/`, data);
  }
  updateExpense(id : any, data : any){
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  deleteExpense(id :any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  totalSumOfExpensePerMonth(expenseStartDate : any,expenseEndDate : any):Observable<any> {
    return this.http.get(`${baseUrl}/${expenseStartDate}/${expenseEndDate}`);
  }
  remainingCash(idExpense : any):Observable<any> {
    return this.http.get(`${baseUrl}/${idExpense}`);
  }
}
