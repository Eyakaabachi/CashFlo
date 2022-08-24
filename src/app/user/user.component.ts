import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userservice : UserService,
    private route: ActivatedRoute,
    private router: Router) { }
    currentUser: User = new User();
    message='';
    listUsers : User[]; 

  ngOnInit(): void {
    this.message = '';
    this.userservice.getAll().subscribe((data: User[])=>{ this.listUsers= data;
      this.currentUser=this.listUsers[0]
      });
    

  }
}
