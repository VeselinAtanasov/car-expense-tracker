
//Components
import { garageComponents } from '.';

//Modules
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';  //Always add CommonModule in custom modules, otherwise we need to import BrowserModule
import { ReactiveFormsModule } from '@angular/forms';
import { GarageRoutingModule } from './garage-routing.module';
import { GarageService } from '../../core/services/garage-services/garage.service';
import { CreateGarageGuard } from '../../core/guards/create-garage.guard';
import { ChartsModule } from 'ng2-charts';
import { CreateGarageComponent } from './create-garage/create-garage.component';


//Services



@NgModule({
    declarations: [
        ...garageComponents
    ],
    imports: [

    CommonModule,
        ReactiveFormsModule,
        GarageRoutingModule,
        ChartsModule
    ],
    providers: [
        GarageService,
        CreateGarageGuard
    ],
    bootstrap: [
    ],
    exports: [
        CreateGarageComponent
    ]
})

export class GarageModule { }