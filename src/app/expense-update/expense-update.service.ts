import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Expense} from '../expense/expense';
const baseUrl = 'http://localhost:8080/expense';
@Injectable({
  providedIn: 'root'
})
export class ExpenseUpdateService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl+"/getall");
  }
  getExpenseById(id: any){
    return this.http.get<Expense>(`${baseUrl}/${id}`);
  }
  addExpense(data: any){
    return this.http.post(`${baseUrl}/`, data);
  }
  updateExpense(id : any, data : any){
    return this.http.put(`${baseUrl}/`, data);
  }
  deleteExpense(id :any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  totalSumOfExpensePerMonth(expenseStartDate : any,expenseEndDate : any):Observable<any> {
    return this.http.get(`${baseUrl}/getsumofexpenses/${expenseStartDate}/${expenseEndDate}`);
  }
  remainingCash(idExpense : any):Observable<any> {
    return this.http.get(`${baseUrl}/getremainingcash/${idExpense}`);
  }
  getExpenseByType(type:any):Observable<any>{
    return this.http.get(`${baseUrl}/get/${type}`);}
}
