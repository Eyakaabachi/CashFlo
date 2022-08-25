import { Component, OnInit } from '@angular/core';
import { ExpenseUpdateService } from '../expense-update/expense-update.service';
import { Expense } from '../expense/expense';
import { IncomeUpdateService } from '../income-update/income-update.service';
import { Income } from '../income/income';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  listIncomeType = []

  constructor(private incomeupdateservice: IncomeUpdateService) { }

  ngOnInit(): void {
    this.incomeupdateservice.getAllSortedByDate().subscribe((data: Income[]) => {
      this.listIncomeType = data

    })

  }
  selectIncomeToEdit(i){
    this.incomeupdateservice.selectedIncomeToEdit.next(i)
  }

}
