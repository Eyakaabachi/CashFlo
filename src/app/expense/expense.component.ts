import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from './expense.service';
import {Expense} from '../expense/expense';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  disableSelect = new FormControl(false);

    currentExpense: any;
    expense = {
      idExpense : null,
        type : '',
        expenseCash : null,
        expenseExpireDate : null,
        expensePayment : true,
        expensePrice : null,
        expenseRegistrationDate : null,
        expenseEndDate : null,
      published: false
    };
    submitted = false;
    message = '';
    constructor(private expenseservice: ExpenseService,
      private route: ActivatedRoute,
      private router: Router) { }
  
    ngOnInit(): void{
      this.message = '';
      this.getIncome(this.route.snapshot.paramMap.get('id'));
    }
    getIncome(id : any): void{
      this.expenseservice.getExpenseById(id)
        .subscribe(
          data => {
            this.currentExpense = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
        }

    addExpense(): void {
      this.submitted = false;
      var data = {
        type: this.expense.type,
        expenseCash : this.expense.expenseCash,
        expenseExpireDate: this.expense.expenseExpireDate,
        expensePayment : this.expense.expensePayment,
        expensePrice : this.expense.expensePrice,
        expenseRegistrationDate : this.expense.expenseRegistrationDate,
        expenseEndDate : this.expense.expenseEndDate
      };
      this.expenseservice.addExpense(data)
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
   
    getPaid(e:any){
      this.expense.expensePayment =e.value
    }
    getType(e:any){
      this.expense.type = e.value
    }

}
