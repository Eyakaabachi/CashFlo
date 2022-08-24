import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { IncomeUpdateService } from './income-update.service';
import { Income } from '../income/income'

@Component({
  selector: 'app-income-update',
  templateUrl: './income-update.component.html',
  styleUrls: ['./income-update.component.css']
})
export class IncomeUpdateComponent implements OnInit {
  myControl = new FormControl('');

  currentIncome : Income = new Income();
  currentIndex = -1;
  incomeSource = '';
  incomes: any;
  test : any ;
  listIncomes : Income[];  

  submitted = false;
  message = '';
  constructor(private incomeupdateservice: IncomeUpdateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(){
    this.message = '';
    this.incomeupdateservice.getAll().subscribe((data: Income[])=>{ this.listIncomes= data;
      console.log(data);
      
    });
  }

  selectIncome(id : any){
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

      incomeList(): void{
        this.incomeupdateservice.getIncomeByIncomeSource(this.incomeSource)
        .subscribe(
          data => {
            this.incomes = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });

      }
  updateIncome(): void{
    this.incomeupdateservice.updateIncome(this.currentIncome.idIncome, this.currentIncome)
    .subscribe(
      response => {
        console.log(response);
        this.message = 'The income was updated successfully!';
        this.router.navigate(['/income']);
      },
      error => {
        console.log(error);
      });
    }
  deleteIncome():void{
    this.incomeupdateservice.deleteIncome(this.currentIncome.idIncome)
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
