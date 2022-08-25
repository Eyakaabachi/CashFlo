import { Component, OnInit } from '@angular/core';
import { ExpenseUpdateService } from '../expense-update/expense-update.service';
import { Expense } from '../expense/expense';

@Component({
  selector: 'app-expenselist',
  templateUrl: './expenselist.component.html',
  styleUrls: ['./expenselist.component.css']
})
export class ExpenselistComponent implements OnInit {
  listExpenseType = []
  constructor(private expenseupdateservice: ExpenseUpdateService) { }

  ngOnInit(): void {
    this.expenseupdateservice.getAllSortedByDate().subscribe((data: Expense[]) => {
      this.listExpenseType = data
    })
  }

  selectExpenseToEdit(i){
    this.expenseupdateservice.selectedExpenseToEdit.next(i)
  }

}
