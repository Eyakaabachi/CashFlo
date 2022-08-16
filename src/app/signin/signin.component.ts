import { Component, OnInit } from '@angular/core';
import { signinservice } from './signinservice';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form : boolean = false;
   closeResult! : string;
  request!: any;
  constructor(private signinservice : signinservice) { }

  ngOnInit(): void {
  }

  authenticateUser(request : any){
    this.signinservice.authenticateUser(request).subscribe(() => {
      this.authenticateUser(request);
      this.form = false;
    });
  }
}
