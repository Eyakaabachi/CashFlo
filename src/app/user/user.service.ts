import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
const baseUrl = 'http://localhost:8080/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(baseUrl+"/getall");
  }
  getUserById(id: any){
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
  addUser(data: any){
    return this.http.post(`${baseUrl}/`, data);
  }
  updateUser(id : any, data : any){
    return this.http.put(`${baseUrl}/`, data);
  }
  deleteUser(id :any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
