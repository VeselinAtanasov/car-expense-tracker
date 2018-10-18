
//Components
import { carComponents } from '.';

//Modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';  //Always add CommonModule in custom modules, otherwise we need to import BrowserModule
import {  ReactiveFormsModule } from '@angular/forms';
import { CarsRoutingModule } from './cars-routing.module';
import { CarsService } from '../../core/services/cars-service/cars.service';
import { GarageModule } from '../garage/garage.module';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ExpenseService } from '../../core/services/expense-service/expense.service';
import { ChartsModule } from 'ng2-charts';
import { CreateCarComponent } from './create-car/create-car.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

//Services

@NgModule({
    declarations: [
        ...carComponents    
    ],
    imports: [
    CommonModule,
        ReactiveFormsModule,
        CarsRoutingModule,
        GarageModule,
        ChartsModule
    ],
    providers: [  
    CarsService,
    AuthGuard,
    ExpenseService
    ],
    bootstrap: [
    ],
    exports: [
        CreateCarComponent,
        AddExpenseComponent
    ]
})

export class CarsModule { }