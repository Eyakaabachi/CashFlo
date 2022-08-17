import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Income } from './income';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  currentIncome: any;
  income = {
    incomeSource: '',
    incomeMoney: null,
    description: '',
    incomeStartDate: null,
    incomeEndDate: null,
    incomeExpireDate: null,
    published: false
  };
  submitted = false;
  message = '';
  constructor(private incomeservice: IncomeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void{
    this.message = '';
    this.getIncome(this.route.snapshot.paramMap.get('id'));
  }
  getIncome(id : any): void{
    this.incomeservice.getIncomeById(id)
      .subscribe(
        data => {
          this.currentIncome = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
      }
  saveChanges(): void {
    const data = {
      incomeSource: this.income.incomeSource,
      incomeMoney : this.income.incomeMoney,
      description: this.income.description,
      incomeStartDate : this.income.incomeStartDate,
      incomeEndDate : this.income.incomeEndDate,
      incomeExpireDate : this.income.incomeExpireDate
    };
    this.incomeservice.addIncome(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  updateIncome(): void{
    this.incomeservice.updateIncome(this.currentIncome.id, this.currentIncome)
    .subscribe(
      response => {
        console.log(response);
        this.message = 'The income was updated successfully!';
      },
      error => {
        console.log(error);
      });
    }
  

  addIncome(): void {
    this.submitted = false;
    var data = {
      incomeSource: this.income.incomeSource,
      incomeMoney : this.income.incomeMoney,
      description: this.income.description,
      incomeStartDate : this.income.incomeStartDate,
      incomeEndDate : this.income.incomeEndDate,
      incomeExpireDate : this.income.incomeExpireDate
    };
    this.incomeservice.addIncome(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  deleteIncome():void{
    this.incomeservice.deleteIncome(this.currentIncome.id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/income']);
      },
      error => {
        console.log(error);
      });
  
}
}
