import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeUpdateService } from './income-update.service';

@Component({
  selector: 'app-income-update',
  templateUrl: './income-update.component.html',
  styleUrls: ['./income-update.component.css']
})
export class IncomeUpdateComponent implements OnInit {

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
  constructor(private incomeupdateservice: IncomeUpdateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void{
    this.message = '';
    this.getIncome(this.route.snapshot.paramMap.get('id'));
  }
  getIncome(id : any): void{
    this.incomeupdateservice.getIncomeById(id)
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
    this.incomeupdateservice.addIncome(data)
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
    this.incomeupdateservice.updateIncome(this.currentIncome.id, this.currentIncome)
    .subscribe(
      response => {
        console.log(response);
        this.message = 'The income was updated successfully!';
      },
      error => {
        console.log(error);
      });
    }
  deleteIncome():void{
    this.incomeupdateservice.deleteIncome(this.currentIncome.id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      });
  
}
}
