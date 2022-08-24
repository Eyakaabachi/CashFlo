import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private userservice : UserService,
    private route: ActivatedRoute,
    private router: Router) { }
    currentUser: User = new User();
    message='';
    listUsers : User[]; 
    users:any;
    user={
      idUser:null,
      username:'',
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      gender:'',
      birthDate:'',
      phoneNum:'',
      address:'',
      role:'',
      profession:''
    }
  ngOnInit(): void {
    this.message = '';
    this.userservice.getAll().subscribe((data: User[])=>{ this.listUsers= data;
      this.currentUser=data[0]
      });
    

  }
   selectUser(){
    this.userservice.getAll()
    .subscribe(
      data => {
        this.currentUser = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

updateUser(): void{
this.userservice.updateUser(this.currentUser.idUser, this.currentUser)
.subscribe(
  response => {
    console.log(response);
    this.message = 'The income was updated successfully!';
    this.router.navigated;
  },
  error => {
    console.log(error);
  });
}
getGender(u:any){
  this.user.gender =u.value
}
}
