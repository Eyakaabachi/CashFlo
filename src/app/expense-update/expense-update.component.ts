import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseUpdateService } from './expense-update.service';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.css']
})
export class ExpenseUpdateComponent implements OnInit {

  disableSelect = new FormControl(false);


  checked = false;
  indeterminate = false;
  disabled = false;
  currentExpense: any;
  expense = {
      type : '',
      expenseCash : null,
      expenseExpireDate : null,
      expensePayment : null,
      expensePrice : null,
      expenseRegistrationDate : null,
      expenseEndDate : null,
    published: false
  };
  submitted = false;
  message = '';
  constructor(private expenseupdateservice: ExpenseUpdateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void{
    this.message = '';
    this.getExpense(this.route.snapshot.paramMap.get('id'));
  }
  getExpense(id : any): void{
    this.expenseupdateservice.getExpenseById(id)
      .subscribe(
        data => {
          this.currentExpense = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
      }
  saveChanges(): void {
    const data = {
      type: this.expense.type,
      expenseCash : this.expense.expenseCash,
      expenseExpireDate: this.expense.expenseExpireDate,
      expensePayment : this.expense.expensePayment,
      expensePrice : this.expense.expensePrice,
      expenseRegistrationDate : this.expense.expenseRegistrationDate,
      expenseEndDate : this.expense.expenseEndDate
    };
    this.expenseupdateservice.addExpense(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  updateExpense(): void{
    this.expenseupdateservice.updateExpense(this.currentExpense.id, this.currentExpense)
    .subscribe(
      response => {
        console.log(response);
        this.message = 'The expense was updated successfully!';
      },
      error => {
        console.log(error);
      });
    }

  deleteExpense():void{
    this.expenseupdateservice.deleteExpense(this.currentExpense.id)
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