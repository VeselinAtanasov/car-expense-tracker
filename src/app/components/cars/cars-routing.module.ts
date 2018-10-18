import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCarComponent } from './create-car/create-car.component';
import { RemoveCarComponent } from './remove-car/remove-car.component';
import { DetailsCarComponent } from './details-car/details-car.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ReportCarComponent } from './report-car/report-car.component';


const furnitureRoutes: Routes = [
    { path: 'create', component: CreateCarComponent },
    { path: 'details/:id', component: DetailsCarComponent },
    { path: 'remove', component: RemoveCarComponent },
    { path: 'addExpense/:id', component: AddExpenseComponent },
    { path: 'report/:id', component: ReportCarComponent },
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(furnitureRoutes)],
    exports: [RouterModule]
  })
  export class CarsRoutingModule { }