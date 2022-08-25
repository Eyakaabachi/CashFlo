import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseUpdateService } from './expense-update.service';
import {FormControl} from '@angular/forms';
import {Expense} from '../expense/expense';
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

  expenses: any;
  test : any ;
  listExpenses : Expense[]; 
  currentExpense : Expense = new Expense();
  type = '';
  submitted = false;
  message = '';
  optionVisible = true
  constructor(private expenseupdateservice: ExpenseUpdateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void{
    this.expenseupdateservice.getAll().subscribe((data: Expense[])=>{ this.listExpenses= data;
      console.log(data);})

      this.expenseupdateservice.selectedExpenseToEdit.subscribe(res=>{
        if (res){
          this.selectExpense(res?.idExpense)
          this.optionVisible= false
        }
        else this.optionVisible= true
      })
  }
  getType(e:any){
    this.expenseupdateservice.getExpenseByType(e);
  }

      selectExpense(id : any){
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
      expenseList(): void{
        this.expenseupdateservice.getExpenseByType(this.type)
        .subscribe(
          data => {
            this.expenses = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
      }
  updateExpense(): void{
    this.expenseupdateservice.updateExpense(this.currentExpense.idExpense, this.currentExpense)
    .subscribe(
      response => {
        console.log(response);
        this.message = 'The expense was updated successfully!';
        this.router.navigate(['/expenselist']);
      },
      error => {
        console.log(error);
      });
    }

  deleteExpense():void{
    this.expenseupdateservice.deleteExpense(this.currentExpense.idExpense)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/expenselist']);
      },
      error => {
        console.log(error);
      });
 
}
updatePaid(value){
  this.currentExpense.expensePayment=value
}
changeExpense(value){
  this.currentExpense.type=value
}
}