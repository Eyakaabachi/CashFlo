import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';
import { ExpenseUpdateService } from '../expense-update/expense-update.service';
import { IncomeUpdateService } from '../income-update/income-update.service';
import { Income } from '../income/income';
import { IncomeService } from '../income/income.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChild('pieCanvas') private pieCanvas: ElementRef;
  @ViewChild('pieBar') private pieBar: ElementRef;
  
  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = [];
  listIncomesAmount = []
  ListIncomsTypes = []
  IncomeAmount
  ExpenseAmount
  constructor(private incomeupdateservice: IncomeUpdateService, private expenseupdateservice : ExpenseUpdateService) {

  }
  ngOnInit(): void {
    this.incomeupdateservice.totalSumOfIncomePerMonth('1998-5-5', '2028-5-5').subscribe(data => {
      this.IncomeAmount = data;
      this.barBrowser();})
      this.expenseupdateservice.totalSumOfExpensePerMonth('1998-5-5', '2028-5-5').subscribe(data => {
        this.ExpenseAmount = data;
        this.barBrowser();})  

    this.incomeupdateservice.getAll().subscribe((data: Income[]) => {
      data.map(name => {
        if (!this.ListIncomsTypes.find(dataName => dataName == name.incomeSource) && name.incomeSource !== '') {
          this.listIncomesAmount.push((data.map(money => {
            if (name.incomeSource !== '') {
              if (money.incomeSource == name.incomeSource)
                return money.incomeMoney
            }
            return 0
          })).reduce((x1, x2) => {
            if (x2 !== '') return parseFloat(x1 + x2)
            else return x1 + 0

          }, 0))
          this.ListIncomsTypes.push(name.incomeSource)
        }})
      this.pieChartBrowser();
    });
  }
  pieChart: any;

  ngAfterViewInit(): void {
  }

  pieChartBrowser(): void {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: [...this.ListIncomsTypes],
        datasets: [{
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
          data: [...this.listIncomesAmount]
        }]
      }
    });
  }

  barBrowser(): void {

    new Chart(this.pieBar.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          label: 'Comparaison Of The Month',
          data: [this.IncomeAmount, this.ExpenseAmount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',

          ],
          borderWidth: 1
        }]
      },
    }
    );
  }

}
