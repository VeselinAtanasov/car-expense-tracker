import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { GarageModel } from '../../../core/models/garage/garage.model';
import { GarageService } from '../../../core/services/garage-services/garage.service';
import { CarsService } from '../../../core/services/cars-service/cars.service';
import { ExpenseService } from '../../../core/services/expense-service/expense.service';
import { CarModel } from '../../../core/models/cars/car.model';
import { ExpensesModel } from '../../../core/models/expenses/expenses';
import { ReportCalculator } from '../../../core/utils/report-calculation/report-calculator';
import { label } from '../../../core/utils/chart-config/chart-configuration';

@Component({
  selector: 'app-garage-report',
  templateUrl: './garage-report.component.html',
  styleUrls: ['./garage-report.component.css']
})
export class GarageReportComponent implements OnInit {


  public userID: string;
  public garageID: string;
  public garage: GarageModel;
  public cars: Array<CarModel>;
  public expenses: Array<ExpensesModel>;

  public isDataCollected: boolean = false;
  public isGarageEmpty: boolean =false;

  public pieChartType: string = 'pie';
  public pieChartLabelsByCar: Array<string>;
  public pieChartDataByCar: Array<number>;
  public pieChartDataByCarPercentage: Array<number>;
  public pieChartLabelsByCategory: Array<string>;
  public pieChartDataByCategory: Array<number>;
  public pieChartDataByCategoryPercentage: Array<number>;


  constructor(
    private route: ActivatedRoute,
    private garageService: GarageService,
    private carService: CarsService,
    private expenseService: ExpenseService
  ) { }

  ngOnInit() {
    this.garageID = this.route.snapshot.paramMap.get('id');
    this.garageService
      .getGarageById(this.garageID)
      .subscribe(garage => {
        this.garage = garage;
        this.userID = garage['_acl']['creator'];
        this.collectData()
      })
    this.carService
      .getAllCarsByGarageId(this.garageID)
      .subscribe(cars => {
        this.cars = cars.sort((a, b) => a['_id'].localeCompare(b['_id']));
        if(this.cars.length===0){
          this.isGarageEmpty = true;
        }
        this.collectData()
      });
    this.expenseService
      .getExpensesByGarageId(this.garageID)
      .subscribe(expenses => {
        this.expenses = expenses;
        if(this.expenses.length===0){
          this.isGarageEmpty = true;
        }
        this.collectData()
      })
    this.collectData()
  }
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  private collectData() {
    if (this.garage && this.cars && this.expenses) {
      if(this.isGarageEmpty){
        return;
      }
      this.prepareReportByCar();
      this.prepareReportByCarPercentage();
      this.loadChartDataByCategory()
      this.isDataCollected = true;

    }
  }

  private prepareReportByCarPercentage() {
    let sum = this.pieChartDataByCar.reduce((a, b) => a + b);
    this.pieChartDataByCarPercentage = this.pieChartDataByCar.map(e => Number(((e / sum) * 100).toFixed(2)))
  }

  private prepareReportByCar() {
    let allCarLabels = this.cars.map(car => {
      let id = car['_id'];
      let carName = `${car['carName']} - ${car['carBrand']} / ${car['carModel']}`
      return { id, carName }
    }).sort((a, b) => a['id'].localeCompare(b['id'])).map(e => e['carName'])
    let allCarValues = ReportCalculator.getCarValues(this.expenses).sort((a, b) => a['id'].localeCompare(b['id'])).map(e => e['value'])
    this.pieChartLabelsByCar = allCarLabels;
    this.pieChartDataByCar = allCarValues;
  }


  private loadChartDataByCategory(): void {
    this.pieChartLabelsByCategory = Object.values(Object.keys(label).sort((a, b) => a.localeCompare(b)));
    let concatData = ReportCalculator.reportByCategory(this.expenses)
    this.pieChartDataByCategory = ReportCalculator.fillChartData(concatData, this.pieChartLabelsByCategory);
    this.pieChartDataByCategoryPercentage = ReportCalculator.fillPercentageChartData(concatData, this.pieChartLabelsByCategory);
  }
}
