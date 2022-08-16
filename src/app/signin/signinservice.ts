import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class signinservice{
    readonly API_URL ='http://localhost:8080';
    constructor(private httpClient :HttpClient){}
    authenticateUser(request: any){
        return this.httpClient.post('${this.API_URL}/signin',request)
    }
}