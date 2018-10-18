import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { CarModel } from '../../../core/models/cars/car.model';
import { ExpensesModel } from '../../../core/models/expenses/expenses';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';
import { label } from '../../../core/utils/chart-config/chart-configuration';
import {ReportCalculator} from '../../../core/utils/report-calculation/report-calculator'

@Component({
  selector: 'app-report-car',
  templateUrl: './report-car.component.html',
  styleUrls: ['./report-car.component.css']
})


export class ReportCarComponent implements OnInit {

  public pieChartLabels: Array<string>;
  public pieChartData: Array<number>;
  public pieChartDataPercentage: Array<number>;
  public pieChartType: string = 'pie';

  public reportId: string;
  public car: CarModel;
  public expense: ExpensesModel

  constructor(
    private route: ActivatedRoute,
    private carService: CarsService,
    private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.reportId = this.route.snapshot.paramMap.get('id');
    this.carService.getCarById(this.reportId).subscribe(car => this.car = car)
    this.expenseService.getExpensesByCarId(this.reportId).subscribe(expenses => {
      this.expense = expenses[0];
      this.loadChartData(this.expense);

    })

  }

 private  loadChartData(expense): void {
    this.pieChartLabels = Object.values(Object.keys(label).sort((a, b) => a.localeCompare(b)));
    this.pieChartData = ReportCalculator.fillChartData(expense, this.pieChartLabels);
    this.pieChartDataPercentage = ReportCalculator.fillPercentageChartData(expense, this.pieChartLabels)
  }

  public chartClicked(e: any): void {
   
  }

  public chartHovered(e: any): void {
  }


}
