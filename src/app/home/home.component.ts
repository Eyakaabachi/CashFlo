import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseUpdateService } from '../expense-update/expense-update.service';
import { Expense } from '../expense/expense';
import { IncomeUpdateService } from '../income-update/income-update.service';
import { Income } from '../income/income';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChild('pieCanvas') private pieCanvas: ElementRef;
  @ViewChild('pieBar') private pieBar: ElementRef;
  @ViewChild('doughnut') private doughnut: ElementRef;

  chart: any = [];
  max
  currentmax
  incomeSource
  listIncomesAmount = []
  ListIncomsTypes = []
  ListExpenseTypes = []
  ListExpenseTypeAmounts=[]
  IncomeAmount
  ExpenseAmount
  start : Date;
  end : Date;
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

    this.expenseupdateservice.getAll().subscribe((data: Expense[]) => {
      data.map(name => {
        if (!this.ListExpenseTypes.find(dataName => dataName == name.type) && name.type !== '') {
          this.ListExpenseTypeAmounts.push((data.map(money => {
            if (name.type !== '') {
              if (money.type == name.type)
                return money.expensePrice
            }
            return 0
          })).reduce((x1, x2) => {
            if (x2 !== '') return parseFloat(x1 + x2)
            else return x1 + 0

          }, 0))
          this.ListExpenseTypes.push(name.type)
        }})
      this.doughnutBrowser();});
    
    this.incomeupdateservice.findHighestIncome('1998-5-5', '2028-5-5').subscribe(data => {
      this.max = data;
      console.log(data);
    })
  }
  fetchDate(value1,value2){
    this.start=value1;
    this.end=value2;
    this.incomeupdateservice.totalSumOfIncomePerMonth(this.start, this.end).subscribe(data => {
      this.IncomeAmount = data;
      this.barBrowser();})
      this.expenseupdateservice.totalSumOfExpensePerMonth(this.start, this.end).subscribe(data => {
        this.ExpenseAmount = data;
        this.barBrowser();})  
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
      },options: {
        responsive: true,
        
      }
    }
    );
  }

  doughnutBrowser():void{

    new Chart(this.doughnut.nativeElement, {
      type :'doughnut',
      data:{
        labels:[...this.ListExpenseTypes],
        datasets:[{
          label: 'Dataset 1',
          data: [...this.ListExpenseTypeAmounts],
          backgroundColor: [
            '#2ecc71',
            '#3498db',
            '#95a5a6',
            '#9b59b6',
            '#f1c40f',
            '#e74c3c'
          ],
        }]
      }
    });
  }
}
