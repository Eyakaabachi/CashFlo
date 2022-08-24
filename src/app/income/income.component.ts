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
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        });
  }

}
